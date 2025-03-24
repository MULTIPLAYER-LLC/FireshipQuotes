<script lang="ts">
  import { onMount } from 'svelte';
  import { pb } from '$lib/util/pocketbase.js';
	import PostPreview from '$lib/ui/PostPreview.svelte';

  let { data = { postId: "3b1s550qnr1z513" } } = $props();
  let postId = data?.postId;
  let post: any = $state(null);

  onMount(async () => {
    post = await pb.collection('posts').getOne(postId);
  });
</script>

{#if post}
  <PostPreview postId={postId}/>
{/if}