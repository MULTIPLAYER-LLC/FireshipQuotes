export async function load({ params }) {
  const postId = params.slug;
  return { postId };
}