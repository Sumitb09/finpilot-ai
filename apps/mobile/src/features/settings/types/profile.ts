export interface Profile {
    id: string;
  
    full_name: string;
  
    avatar_url: string | null;
  
    monthly_income: number;
  
    monthly_budget: number;
  
    currency: string;

    email?: string;
  
    created_at: string;
  
    updated_at: string;
  }
  
  export interface UpdateProfileInput {
    full_name: string;
  
    monthly_income: number;
  
    monthly_budget: number;
  
    currency: string;
  
    avatar_url?: string | null;
  }