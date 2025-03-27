import { error } from "@sveltejs/kit";

export async function load({ params, locals }: { params: any, locals: any }) {
  try {
    const postId = params.slug;
    const post = await locals.pb.collection('posts').getOne(postId);
    return { post };
  }catch(e) {
    console.log(e);
    error(404);
  }
}