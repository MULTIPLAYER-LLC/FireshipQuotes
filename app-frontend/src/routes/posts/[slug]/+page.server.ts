import { pb } from "$lib/util/pocketbase"; // for helper methods reasons
import { error } from "@sveltejs/kit";

export async function load({ params, locals, request }: { params: any, locals: any, request: any }) {
  try {
    const postId = params.slug;
    const post = await locals.pb.collection('posts').getOne(postId, { expand: 'owner' });
    const image = pb.files.getURL(post, post?.image);
    const useragent = request.headers.get('user-agent') || 'Unknown';

    let owner = `non-discord @${post.expand.owner.name}`;
    if(useragent.includes("Discordbot")) {
      owner = `discord <@!${post.expand.owner.discord_id}>`;
    }

    return { post, image, owner };
  }catch(e) {
    console.log(e);
    error(404);
  }
}