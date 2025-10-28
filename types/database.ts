export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          tripType: string;
          travelers: string | null;
          budgetRange: string | null;
          message: string | null;
          createdAt: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          tripType: string;
          travelers?: string | null;
          budgetRange?: string | null;
          message?: string | null;
          createdAt?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          tripType?: string;
          travelers?: string | null;
          budgetRange?: string | null;
          message?: string | null;
          createdAt?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          name: string;
          rating: number;
          text: string;
          photoUrl: string | null;
          approved: boolean;
          createdAt: string;
        };
        Insert: {
          id?: string;
          name: string;
          rating: number;
          text: string;
          photoUrl?: string | null;
          approved?: boolean;
          createdAt?: string;
        };
        Update: {
          id?: string;
          name?: string;
          rating?: number;
          text?: string;
          photoUrl?: string | null;
          approved?: boolean;
          createdAt?: string;
        };
      };
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: "admin" | "editor";
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role?: "admin" | "editor";
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: "admin" | "editor";
        };
      };
    };
  };
}
