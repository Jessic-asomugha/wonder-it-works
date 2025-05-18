
-- Create a storage bucket for user avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'User Profile Pictures', true);

-- Set up a policy to allow users to insert/update their own avatar
CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT 
  WITH CHECK (bucket_id = 'avatars' AND auth.uid() = owner);

CREATE POLICY "Users can update their own avatar" ON storage.objects
  FOR UPDATE 
  USING (bucket_id = 'avatars' AND auth.uid() = owner);

CREATE POLICY "Users can delete their own avatar" ON storage.objects
  FOR DELETE 
  USING (bucket_id = 'avatars' AND auth.uid() = owner);

-- Allow public access to avatars
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
  FOR SELECT 
  USING (bucket_id = 'avatars');
