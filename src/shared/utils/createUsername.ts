export const createUsername = (fullname: string | null | undefined) => {
  if (!fullname) return '';

  const username = fullname.toLowerCase().replace(/\s/g, '');

  return username;
};
