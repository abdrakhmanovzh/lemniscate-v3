export const getSupabaseCoverImage = (imageFilename: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_COVER_IMAGES_URL;
  return `${baseUrl}/${imageFilename}`;
};
