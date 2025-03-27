export async function load({ params }) {
  const userId = params.slug;
  return { userId };
}