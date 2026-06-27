export type SavingsGoal = {
    id: string;
  
    user_id: string;
  
    title: string;
  
    emoji: string;
  
    target_amount: number;
  
    saved_amount: number;
  
    target_date: string | null;
  
    color: string;
  
    notes: string | null;
  
    created_at: string;
  
    updated_at: string;
  };
  
  export type CreateGoalInput = {
    title: string;
  
    emoji: string;
  
    target_amount: number;
  
    target_date?: string;
  
    color: string;
  
    notes?: string;
  };
  
  export type UpdateGoalInput =
    Partial<CreateGoalInput> & {
      saved_amount?: number;
    };