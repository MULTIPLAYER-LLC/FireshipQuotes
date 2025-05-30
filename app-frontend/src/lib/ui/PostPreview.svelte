<script lang="ts">
  import { currentAuth, pb } from '$lib/util/pocketbase';
  import { listen as listenPostVotes } from '$lib/realtime/postVotes';
  import { listen as listenPosts } from '$lib/realtime/posts';
  import { ThumbsUpSolid, ThumbsUpOutline, ThumbsDownSolid, ThumbsDownOutline, ShareNodesSolid } from 'flowbite-svelte-icons';
  import { Button } from 'flowbite-svelte';
	import UserPreview from '$lib/ui/UserPreview.svelte';
  import { clipboard } from '$lib/util/clipboard';
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';

  let { postId = "3b1s550qnr1z513" } = $props();
  let post: any = $state(null);
  let postVoteData: any = $state({num_votes: 0, prior_vote: null});

  async function vote(type: string|null) {

    if(!$currentAuth) {
      await pb.collection('users').authWithOAuth2({ provider: "discord" });
    }

    const priorVote = postVoteData?.prior_vote;
    console.log(`voting! state='${JSON.stringify(postVoteData)}'`);

    if(priorVote?.vote_type === type) { // no change needed
      return;
    }
    const batch = pb.createBatch();

    if(priorVote) {
      await batch.collection('votes').delete(priorVote?.id);
    }
    if(type !== null) { // if we are making a vote, not just removing one
      await batch.collection('votes').create({
        vote_type: type,
        owner: $currentAuth.id,
        post: postId
      });
    }
    await batch.send();
  }

  onMount(async () => {
    listenPosts(postId, e => { post = e });
    listenPostVotes(postId, e => postVoteData = (e || {num_votes: 0, prior_vote: null}) );
  });
</script>

{#if post}
<div class="h-auto text-center w-full grid grid-cols-2 grid-cols-[30px_auto] grid-rows-5 grid-rows-[55px_25px_25px_25px_25px_auto_50px] gap-0">
  <a href="/posts/{postId}" class="row-span-5 col-start-2 row-start-2 w-full h-full block">
    <img src={pb.files.getURL(post, post?.image)} alt="funny quote" class="h-auto w-full" />
  </a>
  <div class="col-start-1 row-start-1 col-span-2 text-left">
    <UserPreview userId={post?.owner} />
  </div>
  <div class="col-start-1 row-start-2 mx-auto">
    {#if postVoteData?.prior_vote?.vote_type === "upvote"}
      <Button on:click={() => vote(null)} color="none" class="p-0 m-0 w-6 h-8=6 cursor-pointer">
        <ThumbsUpSolid color="green" class="w-6 h-8=6" />
      </Button>
    {:else}
      <Button on:click={() => vote("upvote")} color="none" class="p-0 m-0 w-6 h-8=6 cursor-pointer">
        <ThumbsUpOutline color="green" class="w-6 h-8=6" />
      </Button>
    {/if}
  </div>
  <div class="col-start-1 row-start-4">
    {#if postVoteData?.prior_vote?.vote_type === "downvote"}
      <Button on:click={() => vote(null)} color="none" class="p-0 m-0 w-6 h-8=6 cursor-pointer">
        <ThumbsDownSolid color="red" class="w-6 h-8=6" />
      </Button>
    {:else}
      <Button on:click={() => vote("downvote")} color="none" class="p-0 m-0 w-6 h-8=6 cursor-pointer">
        <ThumbsDownOutline color="red" class="w-6 h-8=6" />
      </Button>
    {/if}
  </div>
  <div class="col-start-1 row-start-5">
    <Button on:click={() => clipboard(`${env.PUBLIC_SITE_URL}/posts/${postId}`)} color="none" class="p-0 m-0 w-6 h-8=6 cursor-pointer">
      <ShareNodesSolid color="gray" class="w-6 h-8=6" />
    </Button>
  </div>

  <div class="col-start-1 row-start-3 text-left px-2">
    {postVoteData.num_votes}<!-- num. upvotes -->
  </div>
  <div class="col-span-2 col-start-1 row-start-7">
    {new Date(post.created).toDateString()}
    <!-- comment preview -->
  </div>
</div>
{/if}
