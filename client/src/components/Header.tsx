import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface HeaderProps {
  onCtaClick: () => void;
}

export default function Header({ onCtaClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-grey/20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="ED Rent & Sale Logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Navigation / Actions */}
        <div className="flex items-center gap-6">
          <a
            href="tel:+4921758845535"
            className="hidden sm:flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-cyan transition-colors"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-light text-brand-navy">
              <Phone className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-brand-grey font-normal">Kostenfreie Beratung</span>
              <span>+49 217 58845535</span>
            </div>
          </a>

          <Button
            onClick={onCtaClick}
            className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-extrabold px-6 py-5 rounded-xl shadow-sm transition-all duration-150 active:scale-95 flex items-center gap-2"
          >
            <span>Fahrzeug anfragen</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
