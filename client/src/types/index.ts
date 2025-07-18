export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  source: string;
  imageUrl?: string;
  publishedAt: string;
  category: 'NBA' | 'WNBA' | 'NCAA' | 'International' | 'General';
  tags: string[];
  url: string;
  isBreaking?: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  joinedAt: string;
  isVerified: boolean;
  socialAccounts?: {
    google?: string;
    facebook?: string;
  };
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  articleId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  replies?: Comment[];
  parentId?: string;
}

export interface BlogPost {
  id: string;
  userId: string;
  user: User;
  title: string;
  content: string;
  summary: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  tags: string[];
  likes: number;
  views: number;
  comments: Comment[];
}

export interface Newsletter {
  email: string;
  subscribedAt: string;
  preferences: {
    nba: boolean;
    wnba: boolean;
    ncaa: boolean;
    international: boolean;
    breaking: boolean;
  };
}

export interface League {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  logoUrl?: string;
  isActive: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
} 