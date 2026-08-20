export type Category = 'Todos' | 'Casamento' | 'Retrato' | 'Eventos' | 'Cyber/Neon' | 'Editorial' | 'Comercial' | 'Lifestyle' | 'Esportes' | 'Natureza';

export interface Photo {
  id: string;
  title: string;
  category: Category;
  imageUrl: string;
  year?: string;
  client?: string;
  span?: 'col-span-1' | 'col-span-2' | 'row-span-2';
}

export interface Package {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface QuoteRequest {
  services: string[];
  eventType: string;
  duration: string;
  name: string;
  whatsapp: string;
  email: string;
}
