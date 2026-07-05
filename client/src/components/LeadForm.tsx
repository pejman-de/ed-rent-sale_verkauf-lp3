import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2, Send, CheckCircle2, ShieldCheck, Truck, ClipboardList, UserRound, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLeadFormModal } from "@/contexts/LeadFormModalContext";
import {
  trackModalStepView,
  trackModalStepCompleted,
  trackFormError,
  trackFormStart,
  trackFormSubmit,
} from "@/lib/analytics";

const WORKER_URL = "https://ed-lead-proxy-lp3.pjslm-ed-lead-proxy.workers.dev";

// 1. Zod-Validierungsschema
const baseFormSchema = z.object({
  lead_path: z.enum(["einzel", "paket"]),
  fahrzeugtyp: z.string().min(1, "Bitte wählen Sie einen Fahrzeugtyp."),
  condition: z.enum(["Neu", "Gebraucht"]),
  abholung_lieferung: z.enum(["Abholung", "Lieferung"]),
  wunschtermin: z.string().min(1, "Bitte wählen Sie einen Wunschtermin."),
  einsatzregion: z.string().min(5, "Bitte geben Sie eine gültige PLZ oder Region ein."),
  stueckzahl: z.number().int().min(1, "Mindestens 1 Fahrzeug."),
  unternehmen: z.string().min(2, "Bitte geben Sie Ihren Firmennamen ein."),
  vorname: z.string().min(2, "Bitte geben Sie Ihren Vornamen ein."),
  nachname: z.string().min(2, "Bitte geben Sie Ihren Nachnamen ein."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  telefon: z.string().optional(),
  finanzierung: z.enum(["Ja", "Nein"]),
  aufbau: z.enum(["Ja", "Nein"]),
  datenschutz_akzeptiert: z.literal(true, {
    message: "Bitte stimmen Sie der Datenschutzerklärung zu.",
  }),
  // Honeypot: fuer Menschen unsichtbares Feld, Bots fuellen es haeufig aus
  website: z.string().optional(),
});

const formSchema = baseFormSchema.superRefine((data, ctx) => {
  if (data.lead_path === "paket" && data.stueckzahl < 10) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Als Händler / Paketabnehmer müssen Sie mindestens 10 Fahrzeuge anfragen.",
      path: ["stueckzahl"],
    });
  }
});

type FormValues = z.infer<typeof formSchema>;

interface LeadFormProps {
  prefilledVehicle?: string;
}

const STEPS = [
  { id: 1, label: "Fahrzeug", icon: Truck, fields: ["lead_path", "fahrzeugtyp", "condition", "abholung_lieferung"] as const },
  { id: 2, label: "Details", icon: ClipboardList, fields: ["wunschtermin", "einsatzregion", "stueckzahl", "finanzierung", "aufbau"] as const },
  { id: 3, label: "Kontaktdaten", icon: UserRound, fields: ["vorname", "nachname", "unternehmen", "telefon", "email", "datenschutz_akzeptiert"] as const },
];

// Pro-Step-Teilschemata (aus dem Basis-Schema ausgeschnitten), damit die
// Validierung eines Schritts nicht versehentlich Fehler fuer noch gar nicht
// sichtbare Felder aus spaeteren Schritten erzeugt.
const stepSchemas = [
  baseFormSchema.pick({ lead_path: true, fahrzeugtyp: true, condition: true, abholung_lieferung: true }),
  baseFormSchema.pick({ wunschtermin: true, einsatzregion: true, stueckzahl: true, finanzierung: true, aufbau: true }),
  baseFormSchema.pick({ vorname: true, nachname: true, unternehmen: true, telefon: true, email: true, datenschutz_akzeptiert: true }),
];

// Sentinel-Wert: signalisiert "Haendler-CTA wurde geklickt" statt einen
// konkreten Fahrzeugtyp vorzubelegen. Wird in Home.tsx an openLeadForm() uebergeben.
export const DEALER_INQUIRY_SENTINEL = "__dealer_paket_anfrage__";

const isDealerInquiry = (value?: string) => value === DEALER_INQUIRY_SENTINEL;

export default function LeadForm({ prefilledVehicle }: LeadFormProps) {
  const { closeLeadForm, reportStep, reportCompleted } = useLeadFormModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const {
    register,
    setValue,
    watch,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      lead_path: isDealerInquiry(prefilledVehicle) ? "paket" : "einzel",
      fahrzeugtyp: !isDealerInquiry(prefilledVehicle) && prefilledVehicle ? prefilledVehicle : "",
      condition: "Neu",
      abholung_lieferung: "Abholung",
      wunschtermin: "",
      einsatzregion: "",
      stueckzahl: isDealerInquiry(prefilledVehicle) ? 10 : 1,
      unternehmen: "",
      vorname: "",
      nachname: "",
      email: "",
      telefon: "",
      finanzierung: "Nein",
      aufbau: "Nein",
      datenschutz_akzeptiert: undefined,
      website: "",
    },
  });

  const watchLeadPath = watch("lead_path");
  const watchStueckzahl = watch("stueckzahl");
  const watchFahrzeugtyp = watch("fahrzeugtyp");
  const watchDatenschutz = watch("datenschutz_akzeptiert");

  useEffect(() => {
    if (watchLeadPath === "paket" && watchStueckzahl < 10) {
      setValue("stueckzahl", 10);
    } else if (watchLeadPath === "einzel" && watchStueckzahl >= 10) {
      setValue("stueckzahl", 1);
    }
  }, [watchLeadPath, setValue]);

  // Bei jedem Mount (= jedes Öffnen des Modals) Schritt 1 + form_start tracken
  useEffect(() => {
    trackModalStepView(1, STEPS[0].label, STEPS.length);
    trackFormStart();
    reportStep(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Lead-Scoring: 4-Faktor-Punktesystem (Hot >=70 / Warm 40-69 / Cold <40)
  const calculateLeadScore = (data: FormValues): { points: number; grade: "Hot" | "Warm" | "Cold" } => {
    let points = 0;

    // Faktor 1: Anfrage-Typ & Stueckzahl (max 40)
    points += data.lead_path === "paket" ? 40 : 15;

    // Faktor 2: Dringlichkeit ueber Wunschtermin (max 30)
    try {
      const today = new Date();
      const targetDate = new Date(data.wunschtermin);
      const diffDays = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays < 14) {
        points += 30;
      } else if (diffDays <= 30) {
        points += 15;
      } else {
        points += 5;
      }
    } catch {
      points += 5;
    }

    // Faktor 3: Finanzierung gewuenscht (max 20)
    points += data.finanzierung === "Ja" ? 20 : 5;

    // Faktor 4: Sonderaufbau gewuenscht (max 10)
    points += data.aufbau === "Ja" ? 10 : 0;

    const grade: "Hot" | "Warm" | "Cold" = points >= 70 ? "Hot" : points >= 40 ? "Warm" : "Cold";
    return { points, grade };
  };

  // UTM-Parameter aus der URL einmalig einlesen
  const getUtmParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      utm_term: params.get("utm_term") || undefined,
      utm_content: params.get("utm_content") || undefined,
    };
  };

  // Validiert die Felder eines einzelnen Schritts. Setzt/loescht Fehler nur
  // fuer die Felder dieses Schritts. Kein globaler Resolver -> keine ungewollte
  // Re-Validierung noch nicht ausgefuellter Felder aus spaeteren Schritten.
  const validateStep = (stepIndex: number): boolean => {
    const schema = stepSchemas[stepIndex - 1];
    const fieldNames = Object.keys(schema.shape) as (keyof FormValues)[];
    const values = getValues();
    const subset: Record<string, unknown> = {};
    fieldNames.forEach((name) => {
      subset[name] = values[name];
    });

    fieldNames.forEach((name) => clearErrors(name));
    const result = schema.safeParse(subset);

    let valid = result.success;

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof FormValues;
        setError(fieldName, { type: "manual", message: issue.message });
      });
    }

    // Sonderregel Paket/Haendler: mindestens 10 Fahrzeuge (nur auf Schritt 2 relevant)
    if (stepIndex === 2) {
      const v = getValues();
      if (v.lead_path === "paket" && v.stueckzahl < 10) {
        setError("stueckzahl", {
          type: "manual",
          message: "Als Händler / Paketabnehmer müssen Sie mindestens 10 Fahrzeuge anfragen.",
        });
        valid = false;
      }
    }

    return valid;
  };

  // Setzt beim Verlassen eines Schritts dessen Fehleranzeige zurueck, damit
  // kein Fehlerzustand stehen bleibt, wenn der Schritt spaeter erneut betreten wird.
  const clearStepErrors = (stepIndex: number) => {
    const fieldNames = Object.keys(stepSchemas[stepIndex - 1].shape) as (keyof FormValues)[];
    clearErrors(fieldNames);
  };

  const handleNext = () => {
    if (validateStep(step)) {
      trackModalStepCompleted(step, STEPS[step - 1]?.label ?? `step_${step}`);
      const nextStep = Math.min(step + 1, STEPS.length);
      trackModalStepView(nextStep, STEPS[nextStep - 1]?.label ?? `step_${nextStep}`, STEPS.length);
      reportStep(nextStep);
      // Alte Fehler des Zielschritts entfernen, damit dieser sauber startet,
      // falls er zuvor schon einmal (z.B. per Absenden) validiert wurde.
      clearStepErrors(nextStep);
      setStep(nextStep);
    } else {
      const fieldNames = Object.keys(stepSchemas[step - 1].shape);
      trackFormError(step, fieldNames.filter((name) => !!errors[name as keyof FormValues]));
    }
  };

  const handleBack = () => {
    const prevStep = Math.max(step - 1, 1);
    reportStep(prevStep);
    // Fehler sowohl des aktuellen als auch des Zielschritts loeschen.
    clearStepErrors(step);
    clearStepErrors(prevStep);
    setStep(prevStep);
  };

  const handleFinalSubmit = async () => {
    // Nur den letzten Schritt validieren (Schritte 1+2 wurden beim Weiterklicken
    // bereits geprueft). Verhindert Fehleranzeige fuer bereits gefuellte Felder.
    if (!validateStep(STEPS.length)) {
      const fieldNames = Object.keys(stepSchemas[STEPS.length - 1].shape);
      trackFormError(STEPS.length, fieldNames.filter((name) => !!errors[name as keyof FormValues]));
      return;
    }

    const data = getValues();

    if (data.website) {
      // Honeypot ausgefuellt -> vermutlich Bot, so tun als waere alles ok.
      // Bewusst KEIN form_submit/reportCompleted hier, damit Bot-Treffer die
      // Conversion-Zahlen nicht verfälschen.
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitting(false);
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);
    const { points, grade } = calculateLeadScore(data);

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          vorname: data.vorname,
          nachname: data.nachname,
          telefon: data.telefon,
          unternehmen: data.unternehmen,
          einsatzregion: data.einsatzregion,
          datenschutz_akzeptiert: data.datenschutz_akzeptiert,
          offer_type: "verkauf",
          lead_path: data.lead_path,
          leadScore: points,
          leadGrade: grade,
          fahrzeugtyp: data.fahrzeugtyp,
          condition: data.condition,
          abholung_lieferung: data.abholung_lieferung,
          wunschtermin: data.wunschtermin,
          stueckzahl: data.stueckzahl,
          finanzierung: data.finanzierung,
          aufbau: data.aufbau,
          ...getUtmParams(),
        }),
      });

      if (!res.ok) {
        throw new Error(`Worker antwortete mit Status ${res.status}`);
      }

      // Wichtig: reportCompleted() VOR setIsSuccess, damit ein direkt
      // folgendes Schließen des Modals NICHT zusätzlich als form_abandon zählt.
      reportCompleted();
      trackFormSubmit("lp3_verkaufsanfrage", STEPS.length, {
        lead_grade: grade,
        lead_path: data.lead_path,
        fahrzeugtyp: data.fahrzeugtyp,
        condition: data.condition,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      setIsSubmitting(false);
      trackFormError(STEPS.length, ["submit_failed"]);
      toast.error("Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut.");
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-xl md:rounded-2xl border border-brand-grey/15 p-8 md:p-12 shadow-xl text-center relative overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Tech Grid Background */}
        <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-[linear-gradient(to_right,#6e7c950a_1px,transparent_1px),linear-gradient(to_bottom,#6e7c950a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-brand-cyan/15 text-brand-cyan flex items-center justify-center">
            <CheckCircle2 className="h-11 w-11" />
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight leading-snug">
            Ihre Verkaufsanfrage ist eingegangen!
          </h3>

          <p className="text-brand-grey leading-relaxed">
            Wir prüfen Ihre Angaben und melden uns innerhalb von 24 Stunden mit Ihrem individuellen Angebot.
          </p>

          <Button
            onClick={() => {
              setIsSuccess(false);
              reset();
              closeLeadForm();
            }}
            className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold text-base px-8 py-3 shadow-lg shadow-brand-cyan/10 hover:shadow-brand-cyan/20 transition-all active:scale-97 uppercase tracking-wider rounded-xl"
          >
            Schließen
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-brand-grey/15 p-4 sm:p-6 md:p-10 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6 md:mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <ShieldCheck className="h-4 w-4 text-brand-cyan" />
          <span className="text-xs font-bold tracking-wider text-brand-cyan uppercase">
            Direktanfrage für Geschäftskunden. 100% DSGVO-konform.
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-navy md:text-4xl">
          Unverbindliches Angebot anfordern.
        </h2>
        <p className="mt-2 text-sm sm:text-base md:text-lg text-brand-grey max-w-xl mx-auto">
          Teilen Sie uns Ihre Anforderungen mit. Unser Vertriebsteam meldet sich innerhalb von 24 Stunden mit einem konkreten Angebot.
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center mb-8 md:mb-10 px-2">
        {STEPS.map((s, idx) => {
          const StepIcon = s.icon;
          const isCompleted = step > s.id;
          const isCurrent = step === s.id;
          return (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    isCompleted
                      ? "bg-brand-cyan border-brand-cyan text-brand-navy"
                      : isCurrent
                      ? "border-brand-cyan text-brand-cyan bg-white"
                      : "border-brand-grey/25 text-brand-grey/60 bg-white"
                  }`}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : <StepIcon className="h-4.5 w-4.5" />}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider text-center whitespace-nowrap ${
                    isCurrent || isCompleted ? "text-brand-navy" : "text-brand-grey/60"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`h-0.5 flex-1 mx-2 mb-5 ${step > s.id ? "bg-brand-cyan" : "bg-brand-grey/20"}`} />
              )}
            </div>
          );
        })}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-8">
        {/* Honeypot - fuer Menschen unsichtbar */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden opacity-0"
          {...register("website")}
        />

        {step === 1 && (
        <>
        {/* 1. Anfrage-Typ */}
        <div className="space-y-3">
          <Label className="font-bold text-sm text-brand-navy">Anfrage-Typ *</Label>
          <RadioGroup
            value={watchLeadPath}
            onValueChange={(val) => setValue("lead_path", val as "einzel" | "paket")}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-colors ${
              watchLeadPath === "einzel" ? "border-brand-navy bg-brand-light/50" : "border-brand-grey/20 hover:border-brand-grey/40"
            }`}>
              <RadioGroupItem value="einzel" id="r-einzel" className="text-brand-navy border-brand-navy" />
              <Label htmlFor="r-einzel" className="font-bold text-sm text-brand-navy cursor-pointer flex flex-col">
                <span>Einzelkauf</span>
                <span className="text-xs font-normal text-brand-grey mt-0.5">Bedarf unter 10 Fahrzeugen</span>
              </Label>
            </div>

            <div className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-colors ${
              watchLeadPath === "paket" ? "border-brand-navy bg-brand-light/50" : "border-brand-grey/20 hover:border-brand-grey/40"
            }`}>
              <RadioGroupItem value="paket" id="r-paket" className="text-brand-navy border-brand-navy" />
              <Label htmlFor="r-paket" className="font-bold text-sm text-brand-navy cursor-pointer flex flex-col">
                <span>Händler / Paketabnahme</span>
                <span className="text-xs font-normal text-brand-grey mt-0.5">Sonderkonditionen ab 10 Fahrzeugen</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* 2. Fahrzeug-Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fahrzeugtyp" className="font-bold text-xs text-brand-navy uppercase tracking-wider">
              Fahrzeugtyp / Wunschmodell *
            </Label>
            <Select value={watchFahrzeugtyp} onValueChange={(val) => setValue("fahrzeugtyp", val)}>
              <SelectTrigger className="w-full bg-white border-brand-grey/30 rounded-xl h-11 text-xs font-semibold text-brand-navy">
                <SelectValue placeholder="Bitte wählen..." />
              </SelectTrigger>
              <SelectContent className="bg-white border-brand-grey/20 rounded-xl">
                <SelectItem value="Mercedes-Benz Sprinter 317 CDI" className="text-xs font-medium text-brand-navy">Mercedes-Benz Sprinter 317 CDI</SelectItem>
                <SelectItem value="Iveco Daily 35S18 Box" className="text-xs font-medium text-brand-navy">Iveco Daily 35S18 Box</SelectItem>
                <SelectItem value="MAN TGE 3.180 Kasten" className="text-xs font-medium text-brand-navy">MAN TGE 3.180 Kasten</SelectItem>
                <SelectItem value="Fiat Ducato L3H2" className="text-xs font-medium text-brand-navy">Fiat Ducato L3H2</SelectItem>
                <SelectItem value="Opel Movano Cargo L2H2" className="text-xs font-medium text-brand-navy">Opel Movano Cargo L2H2</SelectItem>
                <SelectItem value="Mercedes-Benz Atego 1223" className="text-xs font-medium text-brand-navy">Mercedes-Benz Atego 1223</SelectItem>
                <SelectItem value="Individuelle Spezifikation" className="text-xs font-medium text-brand-navy">Individuelle Spezifikation / Anderes Modell</SelectItem>
              </SelectContent>
            </Select>
            {errors.fahrzeugtyp && <p className="text-xs font-semibold text-destructive">{errors.fahrzeugtyp.message}</p>}
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-xs text-brand-navy uppercase tracking-wider">Zustand *</Label>
            <Select defaultValue="Neu" onValueChange={(val) => setValue("condition", val as "Neu" | "Gebraucht")}>
              <SelectTrigger className="w-full bg-white border-brand-grey/30 rounded-xl h-11 text-xs font-semibold text-brand-navy">
                <SelectValue placeholder="Zustand wählen" />
              </SelectTrigger>
              <SelectContent className="bg-white border-brand-grey/20 rounded-xl">
                <SelectItem value="Neu" className="text-xs font-medium text-brand-navy">Neufahrzeug</SelectItem>
                <SelectItem value="Gebraucht" className="text-xs font-medium text-brand-navy">Gebrauchtfahrzeug</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-xs text-brand-navy uppercase tracking-wider">Logistikoption *</Label>
            <Select defaultValue="Abholung" onValueChange={(val) => setValue("abholung_lieferung", val as "Abholung" | "Lieferung")}>
              <SelectTrigger className="w-full bg-white border-brand-grey/30 rounded-xl h-11 text-xs font-semibold text-brand-navy">
                <SelectValue placeholder="Logistik wählen" />
              </SelectTrigger>
              <SelectContent className="bg-white border-brand-grey/20 rounded-xl">
                <SelectItem value="Abholung" className="text-xs font-medium text-brand-navy">Selbstabholung (Zentrallager)</SelectItem>
                <SelectItem value="Lieferung" className="text-xs font-medium text-brand-navy">Bundesweite Lieferung</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        </>
        )}

        {step === 2 && (
        <>
        {/* 3. Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="wunschtermin" className="font-bold text-xs text-brand-navy uppercase tracking-wider">
              Wunschtermin / Liefertermin *
            </Label>
            <Input
              type="date"
              id="wunschtermin"
              className="w-full bg-white border-brand-grey/30 rounded-xl h-11 text-xs font-semibold text-brand-navy"
              {...register("wunschtermin")}
            />
            {errors.wunschtermin && <p className="text-xs font-semibold text-destructive">{errors.wunschtermin.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="einsatzregion" className="font-bold text-xs text-brand-navy uppercase tracking-wider">
              Einsatzregion / PLZ *
            </Label>
            <Input
              type="text"
              id="einsatzregion"
              placeholder="z.B. 40210 Düsseldorf"
              className="w-full bg-white border-brand-grey/30 rounded-xl h-11 text-xs font-semibold text-brand-navy"
              {...register("einsatzregion")}
            />
            {errors.einsatzregion && <p className="text-xs font-semibold text-destructive">{errors.einsatzregion.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stueckzahl" className="font-bold text-xs text-brand-navy uppercase tracking-wider">
              Stückzahl *
            </Label>
            <Input
              type="number"
              id="stueckzahl"
              min="1"
              className="w-full bg-white border-brand-grey/30 rounded-xl h-11 text-xs font-semibold text-brand-navy"
              {...register("stueckzahl", { valueAsNumber: true })}
            />
            {errors.stueckzahl && <p className="text-xs font-semibold text-destructive">{errors.stueckzahl.message}</p>}
          </div>
        </div>

        {/* 3. Radio-Fragen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-brand-grey/10">
          <div className="space-y-3">
            <Label className="font-bold text-sm text-brand-navy">Finanzierung / Leasing gewünscht? *</Label>
            <RadioGroup defaultValue="Nein" onValueChange={(val) => setValue("finanzierung", val as "Ja" | "Nein")} className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Ja" id="fin-ja" className="text-brand-navy border-brand-navy" />
                <Label htmlFor="fin-ja" className="font-semibold text-sm text-brand-navy cursor-pointer">Ja (z.B. GEFA Bank)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Nein" id="fin-nein" className="text-brand-navy border-brand-navy" />
                <Label htmlFor="fin-nein" className="font-semibold text-sm text-brand-navy cursor-pointer">Nein (Kauf)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="font-bold text-sm text-brand-navy">Sonderaufbau benötigt? *</Label>
            <RadioGroup defaultValue="Nein" onValueChange={(val) => setValue("aufbau", val as "Ja" | "Nein")} className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Ja" id="auf-ja" className="text-brand-navy border-brand-navy" />
                <Label htmlFor="auf-ja" className="font-semibold text-sm text-brand-navy cursor-pointer">Ja (Koffer, Pritsche etc.)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Nein" id="auf-nein" className="text-brand-navy border-brand-navy" />
                <Label htmlFor="auf-nein" className="font-semibold text-sm text-brand-navy cursor-pointer">Nein (Kasten/Standard)</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        </>
        )}

        {step === 3 && (
        <>
        {/* 4. Kontaktdaten */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="vorname" className="font-bold text-xs text-brand-navy uppercase tracking-wider">Vorname *</Label>
            <Input type="text" id="vorname" placeholder="Max" className="w-full bg-white border-brand-grey/30 rounded-xl h-11 text-xs font-semibold text-brand-navy" {...register("vorname")} />
            {errors.vorname && <p className="text-xs font-semibold text-destructive">{errors.vorname.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nachname" className="font-bold text-xs text-brand-navy uppercase tracking-wider">Nachname *</Label>
            <Input type="text" id="nachname" placeholder="Mustermann" className="w-full bg-white border-brand-grey/30 rounded-xl h-11 text-xs font-semibold text-brand-navy" {...register("nachname")} />
            {errors.nachname && <p className="text-xs font-semibold text-destructive">{errors.nachname.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="unternehmen" className="font-bold text-xs text-brand-navy uppercase tracking-wider">Firma *</Label>
            <Input type="text" id="unternehmen" placeholder="Firmenname GmbH" className="w-full bg-white border-brand-grey/30 rounded-xl h-11 text-xs font-semibold text-brand-navy" {...register("unternehmen")} />
            {errors.unternehmen && <p className="text-xs font-semibold text-destructive">{errors.unternehmen.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefon" className="font-bold text-xs text-brand-navy uppercase tracking-wider">Telefonnummer (optional)</Label>
            <Input type="tel" id="telefon" placeholder="+49 (0) 123 456789" className="w-full bg-white border-brand-grey/30 rounded-xl h-11 text-xs font-semibold text-brand-navy" {...register("telefon")} />
            {errors.telefon && <p className="text-xs font-semibold text-destructive">{errors.telefon.message}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email" className="font-bold text-xs text-brand-navy uppercase tracking-wider">E-Mail-Adresse *</Label>
            <Input type="email" id="email" placeholder="max@firma.de" className="w-full bg-white border-brand-grey/30 rounded-xl h-11 text-xs font-semibold text-brand-navy" {...register("email")} />
            {errors.email && <p className="text-xs font-semibold text-destructive">{errors.email.message}</p>}
          </div>
        </div>

        {/* DSGVO-Checkbox */}
        <div className="flex items-start gap-3 pt-2">
          <Checkbox
            id="datenschutz"
            checked={watchDatenschutz === true}
            onCheckedChange={(checked) => setValue("datenschutz_akzeptiert", checked === true ? true : (undefined as any))}
            className="mt-0.5 shrink-0"
          />
          <label htmlFor="datenschutz" className="block text-sm font-normal text-brand-grey leading-relaxed cursor-pointer">
            Ich habe die <Link href="/datenschutz" className="text-brand-cyan underline hover:text-brand-cyan/80">Datenschutzerklärung</Link> gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu. *
          </label>
        </div>
        {errors.datenschutz_akzeptiert && <p className="text-xs font-semibold text-destructive -mt-4">{errors.datenschutz_akzeptiert.message}</p>}
        </>
        )}

        {/* Navigation */}
        <div className="pt-4 flex items-center gap-3">
          {step > 1 && (
            <Button
              type="button"
              onClick={handleBack}
              variant="outline"
              className="border-brand-grey/30 text-brand-navy font-bold px-6 py-6 rounded-xl flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Zurück</span>
            </Button>
          )}

          {step < STEPS.length ? (
            <Button
              type="button"
              onClick={handleNext}
              className="flex-1 bg-brand-navy text-white hover:bg-brand-navy/90 font-extrabold text-base py-6 rounded-xl shadow-md transition-all duration-150 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Weiter</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-extrabold text-base py-6 rounded-xl shadow-md transition-all duration-150 active:scale-95 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Anfrage wird gesendet...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Unverbindliche Firmenanfrage absenden</span>
                </>
              )}
            </Button>
          )}
        </div>
        {step === STEPS.length && (
          <p className="text-[10px] text-brand-grey text-center leading-normal">
            Mit Absenden des Formulars stimmen Sie der Verarbeitung Ihrer Daten zur Angebotserstellung gemäß unserer Datenschutzerklärung zu. Keine Werbe-Spam-Garantie.
          </p>
        )}
      </form>
    </div>
  );
}
