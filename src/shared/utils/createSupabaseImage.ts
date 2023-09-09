export const createSupabaseImage = (imageFilename: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;
  return `${baseUrl}/${imageFilename}`;
};
