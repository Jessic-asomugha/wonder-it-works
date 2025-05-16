
-- Add max_calories column to profiles table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'max_calories'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN max_calories NUMERIC DEFAULT 1500;
  END IF;
END $$;
