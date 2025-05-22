<script lang="ts">
  import PostPreview from '$lib/ui/PostPreview.svelte';
  import FileUpload from '$lib/ui/FileUpload.svelte';
  import { onMount } from 'svelte';
  import { pb } from '$lib/util/pocketbase';

  let priorPostRowId: string = $state("0");

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
    console.log('a');
    const res = (await pb.collection('topPosts').getList(1, 10, {
      filter: `id > ${priorPostRowId}`,
      skipTotal: true
    }));
    console.log('b');
    const nextPosts = res.items || [];
    if(nextPosts.length === 0) {
      hasMore = false;
      return;
    }
    console.log('c');
    const lastPost = nextPosts.slice(-1)[0];
    priorPostRowId = lastPost.id;
    console.log('d');
    posts = [...posts, ...nextPosts.map(f => f.post)];
    console.log('e');
  }

  onMount(async () => {
    // pb.collection('posts').subscribe('*', async e => {
    //   const post = e.record;
    //   if(e.action === 'create') {
    //     posts = [post.id, ...posts];
    //   }
    //   else if(e.action === 'delete') {
    //     posts = posts.filter(e => post.id !== e);
    //   }
    // });

    window.addEventListener('scroll', () => {
      if(hasMore && window.innerHeight + window.scrollY >= Math.max(document.body.offsetHeight * 0.85, document.body.offsetHeight - 500)) {
        debounce(advanceFeed);
      }
    });
    advanceFeed();
  });
</script>

<div class="flex w-full">
  <div class="w-200 mx-auto px-5">
    {#each posts as postId (postId) }
      <PostPreview postId={postId}/>
    {/each}
  </div>
</div>

<FileUpload />
