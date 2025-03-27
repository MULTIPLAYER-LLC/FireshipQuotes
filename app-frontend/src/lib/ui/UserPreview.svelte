<script lang="ts">
  import { onMount } from 'svelte';
  import { pb } from '$lib/util/pocketbase';
  import { listen as listenVotes } from '$lib/realtime/userVotes';
  import { listen as listenPosts } from '$lib/realtime/userPosts';
  import { listen as listenUsers } from '$lib/realtime/users';
  import { Avatar, Badge } from 'flowbite-svelte';

  let { userId } = $props();
  let user: any = $state(null);
  let roles: string[] = $derived(user?.roles || []);
  let userVotesData: any = $state({num_votes: 0});
  let userPostsData: any = $state({num_posts: 0});

  function roleColor(role: string) {
    if(role === "admin") {
      return "green";
    }
    else if(role === "muted") {
      return "dark";
    }
    console.log(`unknown role ${role}`);
    return "dark";
  }

  onMount(async () => {
    listenUsers(userId, e => user = e);
    listenVotes(userId, e => userVotesData = e || {num_votes: 0} );
    listenPosts(userId, e => userPostsData = e || {num_posts: 0} );
  });
</script>

<div class="flex items-center space-x-4 rtl:space-x-reverse">
  <Avatar src={pb.files.getURL(user, user?.avatar)} alt={user?.name} rounded onclick={() => window.location.href = `/users/${userId}`} />
  <div class="space-y-1 font-medium dark:text-white">
    <div class="flex items-center">
      {user?.name}
      {#each (roles || []) as role (role) }
        <Badge color={roleColor(role)} class="ml-1">{role}</Badge>
      {/each}
    </div>
    <div class="text-sm text-gray-500 dark:text-gray-400">{userPostsData?.num_posts} posts | {userVotesData?.num_votes} upvotes</div>
  </div>
</div>