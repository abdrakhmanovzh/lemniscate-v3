export const getSupabaseImage = (imageFilename: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_IMAGES_URL;
  return `${baseUrl}/${imageFilename}`;
};
