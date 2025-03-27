import { pb } from "$lib/util/pocketbase"; // for helper methods reasons
import { error } from "@sveltejs/kit";
import { redirect } from '@sveltejs/kit';

export async function load({ params, locals }: { params: any, locals: any }) {
  try {
    const postId = params.slug;
    const post = await locals.pb.collection('posts').getOne(postId, { expand: 'owner' });
    const image = pb.files.getURL(post, post?.image);
    const owner = `${post.expand.owner.name}`;
    return { post, image, owner };
  }catch(e) {
    console.log(e);
    error(404);
  }
}