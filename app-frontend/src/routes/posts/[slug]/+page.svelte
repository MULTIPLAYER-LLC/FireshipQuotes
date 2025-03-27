<script lang="ts">
	import PostPreview from '$lib/ui/PostPreview.svelte';
	import { env } from '$env/dynamic/public';

  const { data } = $props();
  const { post, image, owner } = data;
</script>

<svelte:head>
  <!-- social media display -->
  <title>Fireship Discord Quotes</title>
  <meta name="description" content="Posted by {owner}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{env.PUBLIC_SITE_URL}/posts/{post.id}">
  <meta property="og:site_name" content="FireshipQuotes">
  <meta property="og:image" content="{image}">
  <meta name="twitter:card" content="summary_large_image">
</svelte:head>

<article class="max-w-full w-400 mx-auto px-5">
  <PostPreview postId={post.id}/>
</article>
