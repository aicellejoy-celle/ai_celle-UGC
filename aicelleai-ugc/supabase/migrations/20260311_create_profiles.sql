-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  bio text,
  avatar_url text,
  instagram_url text,
  twitter_url text,
  portfolio_url text
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage Policies for the 'user-uploads' bucket
-- Note: The bucket 'user-uploads' must be created manually in the dashboard first.

-- Give everyone read access to avatars
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'user-uploads');

-- Allow authenticated users to upload files to their own folder within 'user-uploads' bucket
create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (
    bucket_id = 'user-uploads' and
    auth.role() = 'authenticated' and
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow authenticated users to update their own files
create policy "Anyone can update their own avatar." on storage.objects
  for update using (
    bucket_id = 'user-uploads' and
    auth.role() = 'authenticated' and
    (storage.foldername(name))[1] = auth.uid()::text
  );
