export const getSupabaseAvatar = (imageFilename: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_AVATARS_URL;
  return `${baseUrl}/${imageFilename}?t=${Date.now()}`;
};
