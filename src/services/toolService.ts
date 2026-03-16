import { Tool, Collection, AppData } from '../types';
import Papa from 'papaparse';

const COLLECTIONS_KEY = 'ai_tools_collections';
const FAVORITES_KEY = 'favorites';
const PREFERENCES_KEY = 'ai_tools_preferences'; // For user ratings and notes

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Replace this URL with your published Google Sheets CSV URL
// e.g., 'https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv'
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSO81aecfGEEWXgLZUBl451ibeshDIGh906srD2tIX3qS7xGEqAPWiHAvw41Z-yUF7aJHVp4gYwikWn/pub?gid=0&single=true&output=csv';

interface UserPreferences {
  [toolId: number]: {
    userRating?: number;
    userNotes?: string;
  };
}

const getStoredPreferences = (): UserPreferences => {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem(PREFERENCES_KEY);
  return stored ? JSON.parse(stored) : {};
};

const setStoredPreferences = (prefs: UserPreferences) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
};

const getStoredCollections = (): Collection[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(COLLECTIONS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const setStoredCollections = (collections: Collection[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
};

export const toolService = {
  async getTools(): Promise<Tool[]> {
    try {
      const response = await fetch(CSV_URL);
      if (!response.ok) throw new Error('Failed to fetch tools CSV');
      
      const csvText = await response.text();
      
      return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const prefs = getStoredPreferences();
            
            const tools: Tool[] = results.data.map((row: any) => {
              const id = parseInt(row.id, 10);
              const toolPrefs = prefs[id] || {};
              
              return {
                id,
                name: row.name,
                description: row.description,
                url: row.url,
                category: row.category,
                pricing: row.pricing,
                image_url: row.image_url || undefined,
                tags: row.tags || undefined,
                created_at: row.created_at || new Date().toISOString(),
                userRating: toolPrefs.userRating,
                userNotes: toolPrefs.userNotes,
              };
            });
            
            resolve(tools);
          },
          error: (error: any) => {
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error('Error fetching tools:', error);
      return [];
    }
  },

  // Update tool preferences (ratings and notes) locally
  async updateTool(id: number, updates: Partial<Tool>): Promise<Tool> {
    const prefs = getStoredPreferences();
    
    if (!prefs[id]) {
      prefs[id] = {};
    }
    
    if (updates.userRating !== undefined) prefs[id].userRating = updates.userRating;
    if (updates.userNotes !== undefined) prefs[id].userNotes = updates.userNotes;
    
    setStoredPreferences(prefs);
    
    // We return a dummy tool here since the full tool needs to be re-fetched from CSV,
    // but the UI usually just refetches everything anyway.
    return { id, ...updates } as Tool;
  },

  // Add a new tool (local state only for now)
  async addTool(toolData: Omit<Tool, 'id' | 'created_at'>): Promise<Tool> {
    await delay(500);
    const newTool: Tool = {
      ...toolData,
      id: Date.now(),
      created_at: new Date().toISOString(),
    };
    
    console.warn("Note: The tool was added to the local session. To save it permanently to the Google Sheet, a Google Apps Script Web App is required.");
    return newTool;
  },

  // Collections
  async getCollections(): Promise<Collection[]> {
    await delay(300);
    return getStoredCollections();
  },

  async addCollection(name: string, description?: string): Promise<Collection> {
    await delay(300);
    const collections = getStoredCollections();
    const newCollection: Collection = {
      id: crypto.randomUUID(),
      name,
      description,
      toolIds: [],
      createdAt: new Date().toISOString()
    };
    collections.push(newCollection);
    setStoredCollections(collections);
    return newCollection;
  },

  async updateCollection(id: string, updates: Partial<Collection>): Promise<Collection> {
    await delay(300);
    const collections = getStoredCollections();
    const index = collections.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Collection not found');
    
    const updated = { ...collections[index], ...updates };
    collections[index] = updated;
    setStoredCollections(collections);
    return updated;
  },

  async deleteCollection(id: string): Promise<void> {
    await delay(300);
    const collections = getStoredCollections();
    const filtered = collections.filter(c => c.id !== id);
    setStoredCollections(filtered);
  },

  async addToolToCollection(collectionId: string, toolId: number): Promise<void> {
    const collections = getStoredCollections();
    const collection = collections.find(c => c.id === collectionId);
    if (collection && !collection.toolIds.includes(toolId)) {
      collection.toolIds.push(toolId);
      setStoredCollections(collections);
    }
  },

  async removeToolFromCollection(collectionId: string, toolId: number): Promise<void> {
    const collections = getStoredCollections();
    const collection = collections.find(c => c.id === collectionId);
    if (collection) {
      collection.toolIds = collection.toolIds.filter(id => id !== toolId);
      setStoredCollections(collections);
    }
  },

  // Import/Export
  async exportData(): Promise<string> {
    const collections = getStoredCollections();
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    const preferences = getStoredPreferences();
    
    const data = { collections, favorites, preferences };
    return JSON.stringify(data, null, 2);
  },

  async importData(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);
      if (data.collections) setStoredCollections(data.collections);
      if (data.favorites) localStorage.setItem(FAVORITES_KEY, JSON.stringify(data.favorites));
      if (data.preferences) setStoredPreferences(data.preferences);
    } catch (e) {
      throw new Error('Invalid data format');
    }
  }
};
