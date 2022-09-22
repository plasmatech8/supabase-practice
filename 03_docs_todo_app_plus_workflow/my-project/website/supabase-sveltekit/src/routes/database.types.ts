export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      company: {
        Row: {
          id: number;
          name: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
          created_at?: string | null;
        };
      };
      employees: {
        Row: {
          name: string | null;
          company_id: number | null;
          id: number;
        };
        Insert: {
          name?: string | null;
          company_id?: number | null;
          id?: number;
        };
        Update: {
          name?: string | null;
          company_id?: number | null;
          id?: number;
        };
      };
      profile: {
        Row: {
          id: number;
          nickname: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          nickname?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          nickname?: string | null;
          created_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

