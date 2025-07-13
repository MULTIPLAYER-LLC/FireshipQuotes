<script lang="ts">
  import PostPreview from '$lib/ui/PostPreview.svelte';
  import FileUpload from '$lib/ui/FileUpload.svelte';
  import WebRing from '$lib/ui/WebRing.svelte';
  import { onMount } from 'svelte';
  import { pb } from '$lib/util/pocketbase';

  const formatDate = (date: Date) => date.toISOString().replace("T", " ");
  let priorDate = $state(new Date("July 4, 2999"));

  let posts: string[] = $state([]);
  let hasMore = $state(true);
  let debouncing = $state(false);

  function debounce(callback: () => void) {
    if(debouncing) {
      return;
    }
    debouncing = true;
    setTimeout(() => debouncing = false, 250);
    callback();
  }

  async function advanceFeed() {
    console.log("advanceFeed firing");
    const res = (await pb.collection('posts').getList(1, 100, {
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

    window.addEventListener('scroll', () => {
      if(hasMore && window.innerHeight + window.scrollY >= Math.max(document.body.offsetHeight * 0.85, document.body.offsetHeight - 500)) {
        debounce(advanceFeed);
      }
    });
    advanceFeed();
  });
</script>

<WebRing />
<div class="flex w-full">
  <div class="w-200 mx-auto px-5">
    {#each posts as postId (postId) }
      <PostPreview postId={postId}/>
    {/each}
  </div>
</div>

<FileUpload />
