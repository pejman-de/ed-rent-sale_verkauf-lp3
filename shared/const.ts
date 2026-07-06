export interface Vehicle {
  id: string;
  name: string;
  brand: 'Mercedes-Benz' | 'Iveco' | 'MAN' | 'Fiat' | 'Opel';
  type: 'Sprinter' | 'Box' | 'LKW' | 'Van';
  condition: 'Neu' | 'Gebraucht';
  price: string;
  availability: string;
  image: string;
  specs: {
    power: string;
    payload: string;
    volume: string;
    gearbox: string;
  };
}

export const VEHICLES: Vehicle[] = [
  {
    id: '1',
    name: 'Mercedes-Benz Sprinter 317 CDI',
    brand: 'Mercedes-Benz',
    type: 'Sprinter',
    condition: 'Neu',
    price: 'Auf Anfrage',
    availability: 'Sofort verfügbar',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663281979359/iiQHyte9m2j8pb53mDZgmE/sprinter-van-5DR4HEUukecV5zR6f4dVco.webp',
    specs: {
      power: '170 PS',
      payload: '1.250 kg',
      volume: '11 m³',
      gearbox: '9G-TRONIC'
    }
  },
  {
    id: '2',
    name: 'Iveco Daily 35S18 Box',
    brand: 'Iveco',
    type: 'Box',
    condition: 'Neu',
    price: 'Auf Anfrage',
    availability: 'Sofort verfügbar',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663281979359/iiQHyte9m2j8pb53mDZgmE/box-truck-SvfmbwNPJojKePdkhjE3B2.webp',
    specs: {
      power: '180 PS',
      payload: '1.100 kg',
      volume: '18 m³',
      gearbox: 'Automatik'
    }
  },
  {
    id: '3',
    name: 'MAN TGE 3.180 Kasten',
    brand: 'MAN',
    type: 'Sprinter',
    condition: 'Neu',
    price: 'Auf Anfrage',
    availability: 'In 2 Wochen',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663281979359/iiQHyte9m2j8pb53mDZgmE/man-tge-VaUD9y5D3jDDEwqTY9Ef4X.webp',
    specs: {
      power: '177 PS',
      payload: '1.300 kg',
      volume: '11,5 m³',
      gearbox: '8-Gang Automatik'
    }
  },
  {
    id: '4',
    name: 'Fiat Ducato L3H2',
    brand: 'Fiat',
    type: 'Van',
    condition: 'Gebraucht',
    price: 'Auf Anfrage',
    availability: 'Sofort verfügbar',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663281979359/iiQHyte9m2j8pb53mDZgmE/fiat-ducato-RFSmMTSgHWNPi5rJwk52iK.webp',
    specs: {
      power: '140 PS',
      payload: '1.400 kg',
      volume: '13 m³',
      gearbox: 'Schaltgetriebe'
    }
  },
  {
    id: '5',
    name: 'Opel Movano Cargo L2H2',
    brand: 'Opel',
    type: 'Van',
    condition: 'Gebraucht',
    price: 'Auf Anfrage',
    availability: 'In 5 Tagen',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663281979359/iiQHyte9m2j8pb53mDZgmE/opel-movano-dEwqdN9TneRNuUpxbYVHBB.webp',
    specs: {
      power: '165 PS',
      payload: '1.200 kg',
      volume: '10,8 m³',
      gearbox: 'Schaltgetriebe'
    }
  },
  {
    id: '6',
    name: 'Mercedes-Benz Atego 1223',
    brand: 'Mercedes-Benz',
    type: 'LKW',
    condition: 'Neu',
    price: 'Auf Anfrage',
    availability: 'Auf Anfrage',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663281979359/iiQHyte9m2j8pb53mDZgmE/heavy-truck-4r8Em5i6pjKBFsTWUDTvpp.webp',
    specs: {
      power: '231 PS',
      payload: '6.200 kg',
      volume: '35 m³',
      gearbox: 'PowerShift 3'
    }
  }
];
