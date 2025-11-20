import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  seoScore: number;
  category: string;
  lastUpdated: string;
  image: string;
  descriptions: {
    tr: string;
    en: string;
    fr?: string;
  };
  aiSuggestions?: {
    tr?: string;
    en?: string;
    fr?: string;
  };
}

export interface AILog {
  id: string;
  productId: string;
  productName: string;
  date: string;
  model: string;
  prompt: string;
  tokens: number;
  language: string;
  seoScore: number;
}

interface DataContextType {
  products: Product[];
  aiLogs: AILog[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addAILog: (log: AILog) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    stock: 45,
    seoScore: 85,
    category: 'Electronics',
    lastUpdated: '2025-11-19',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    descriptions: {
      tr: 'Yüksek kaliteli kablosuz kulaklıklar, gürültü önleme özelliği ile.',
      en: 'High-quality wireless headphones with noise cancellation.',
    },
  },
  {
    id: '2',
    name: 'Ergonomic Office Chair',
    price: 449.99,
    stock: 12,
    seoScore: 72,
    category: 'Furniture',
    lastUpdated: '2025-11-18',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',
    descriptions: {
      tr: 'Ergonomik tasarımlı ofis koltuğu, uzun süreli çalışma konforu için.',
      en: 'Ergonomically designed office chair for long-term comfort.',
    },
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    price: 199.99,
    stock: 0,
    seoScore: 91,
    category: 'Electronics',
    lastUpdated: '2025-11-17',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    descriptions: {
      tr: 'Akıllı fitness saati, kalp ritmi izleme ve GPS özellikleri ile.',
      en: 'Smart fitness watch with heart rate monitoring and GPS.',
    },
  },
  {
    id: '4',
    name: 'Organic Green Tea Set',
    price: 24.99,
    stock: 150,
    seoScore: 68,
    category: 'Food & Beverage',
    lastUpdated: '2025-11-16',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
    descriptions: {
      tr: 'Organik yeşil çay seti, doğal antioksidanlar içerir.',
      en: 'Organic green tea set with natural antioxidants.',
    },
  },
  {
    id: '5',
    name: 'Leather Backpack',
    price: 159.99,
    stock: 28,
    seoScore: 79,
    category: 'Accessories',
    lastUpdated: '2025-11-15',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    descriptions: {
      tr: 'Şık deri sırt çantası, laptop bölmesi ile.',
      en: 'Stylish leather backpack with laptop compartment.',
    },
  },
];

const mockAILogs: AILog[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Premium Wireless Headphones',
    date: '2025-11-20 10:30',
    model: 'GPT-4',
    prompt: 'Generate SEO-optimized product description for wireless headphones',
    tokens: 450,
    language: 'tr',
    seoScore: 85,
  },
  {
    id: '2',
    productId: '2',
    productName: 'Ergonomic Office Chair',
    date: '2025-11-19 14:22',
    model: 'GPT-3.5',
    prompt: 'Create engaging product description for office chair',
    tokens: 320,
    language: 'en',
    seoScore: 72,
  },
  {
    id: '3',
    productId: '3',
    productName: 'Smart Fitness Watch',
    date: '2025-11-19 09:15',
    model: 'GPT-4',
    prompt: 'Write compelling description for fitness watch highlighting features',
    tokens: 520,
    language: 'tr',
    seoScore: 91,
  },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem('products');
    return stored ? JSON.parse(stored) : mockProducts;
  });

  const [aiLogs, setAILogs] = useState<AILog[]>(() => {
    const stored = localStorage.getItem('aiLogs');
    return stored ? JSON.parse(stored) : mockAILogs;
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('aiLogs', JSON.stringify(aiLogs));
  }, [aiLogs]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addAILog = (log: AILog) => {
    setAILogs((prev) => [log, ...prev]);
  };

  return (
    <DataContext.Provider
      value={{ products, aiLogs, addProduct, updateProduct, deleteProduct, addAILog }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
