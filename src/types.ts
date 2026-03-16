export interface Tool {
  id: number;
  name: string;
  description: string;
  url: string;
  category: string;
  pricing: string;
  image_url?: string;
  tags?: string;
  featured?: number; // SQLite uses 0/1 for booleans
  created_at: string;
  userRating?: number;
  userNotes?: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  toolIds: number[];
  createdAt: string;
}

export interface AppData {
  tools: Tool[];
  collections: Collection[];
  favorites: number[];
}

export type Category = 'All' | 'Chat' | 'Image' | 'Video' | 'Coding' | 'Audio' | 'Writing' | 'Other';
export type Pricing = 'All' | 'Free' | 'Freemium' | 'Paid';
export type SortOption = 'newest' | 'oldest' | 'alphabetical' | 'reverse-alphabetical';
