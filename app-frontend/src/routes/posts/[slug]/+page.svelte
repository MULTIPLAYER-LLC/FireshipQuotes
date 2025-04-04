<script lang="ts">
	import PostPreview from '$lib/ui/PostPreview.svelte';
  import { currentAuth } from '$lib/util/pocketbase.js';
	import { env } from '$env/dynamic/public';
	import { Button } from 'flowbite-svelte';

  const { data } = $props();
  const { post, image, owner } = data;
</script>

<svelte:head>
  <title>Fireship Discord Quotes</title>
  <meta name="description" content="Quoted by {owner}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="{env.PUBLIC_SITE_URL}">
  <meta property="og:image" content="{image}">
  <meta name="twitter:card" content="summary_large_image">
</svelte:head>

<article class="max-w-full w-400 mx-auto px-5">
  <PostPreview postId={post.id}/>
</article>

<center>
  <u><a href="/" class="text-sky-600">back to all quotes</a></u>
</center>
