<script lang="ts">
  import PostPreview from '$lib/ui/PostPreview.svelte';
  import FileUpload from '$lib/ui/FileUpload.svelte';
  import { onMount } from 'svelte';
  import { pb } from '$lib/util/pocketbase';
	import AdPreview from '$lib/ui/AdPreview.svelte';

  const formatDate = (date: Date) => date.toISOString().replace("T", " ");
  let priorDate = $state(new Date("July 4, 2999"));
  
  let posts: string[] = $state([]);
  let hasMore = $state(true);

  async function advanceFeed() {
    const res = (await pb.collection('posts').getList(1, 10, {
      filter: `created < "${formatDate(priorDate)}"`,
      sort: '-created',
      skipTotal: true
    }));
    const nextPosts = res.items || [];
    if(nextPosts.length === 0) {
      hasMore = false;
      return;
    }
    const lastPost = nextPosts.slice(-1)[0];
    priorDate = new Date(lastPost.created);
    posts = [...posts, ...nextPosts.map(f => f.id)];
  }

  function observeLastElement(node: HTMLElement) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        advanceFeed();
      }
    }, { threshold: 0.0, rootMargin: "600px"  });

    observer.observe(node);
    return { destroy() { observer.disconnect(); } };
  }

  onMount(async () => {
    pb.collection('posts').subscribe('*', async e => {
      const post = e.record;
      if(e.action === 'create') {
        posts = [post.id, ...posts];
      }
      else if(e.action === 'delete') {
        posts = posts.filter(e => post.id !== e);
      }
    });
  });
</script>

<div class="flex w-full">
  <div class="w-200 mx-auto px-5">
    {#each posts as postId (postId) }
      <PostPreview postId={postId}/>
      {#if new Date().getDate() === 1 && new Date().getMonth() === 4}
        <AdPreview/>
      {/if}
    {/each}
    {#if hasMore}
      <div use:observeLastElement class="loading"></div><br><br><br>
    {/if}
  </div>
</div>

<FileUpload />