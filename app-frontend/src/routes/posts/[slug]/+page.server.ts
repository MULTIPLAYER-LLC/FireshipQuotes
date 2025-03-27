import { pb } from "$lib/util/pocketbase"; // for helper methods reasons
import { error } from "@sveltejs/kit";

export async function load({ params, locals }: { params: any, locals: any }) {
  try {
    const postId = params.slug;
    const post = await locals.pb.collection('posts').getOne(postId);
    const image = pb.files.getURL(post, post?.image)
    return { post, image };
  }catch(e) {
    console.log(e);
    error(404);
  }
}