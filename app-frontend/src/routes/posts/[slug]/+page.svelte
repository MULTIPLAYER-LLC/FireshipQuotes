<script lang="ts">
	import PostPreview from '$lib/ui/PostPreview.svelte';
	import { env } from '$env/dynamic/public';

  const { data } = $props();
  const { post } = data;
</script>

<svelte:head>
  <!-- seo -->
  <title>Fireship Discord quote</title>
  <meta name="description" content="Quote from the Fireship Discord server">
  
  <!-- social media display -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="{env.PUBLIC_SITE_URL}/posts/{post?.id}">
  <meta property="og:site_name" content="FireshipQuotes">
  <meta property="og:image" content="{post?.image}">
</svelte:head>

<article class="max-w-full w-400 mx-auto px-5">
  <PostPreview postId={post.id}/>
</article>
