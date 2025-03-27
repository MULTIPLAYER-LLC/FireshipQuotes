<script lang="ts">
  import { onMount } from 'svelte';
  import { listen as listenUsers } from '$lib/realtime/users';
  import { currentAuth, pb } from '$lib/util/pocketbase';
	import UserPreview from '$lib/ui/UserPreview.svelte';
	import { Button } from 'flowbite-svelte';

  let { data } = $props();
  let userId: string = data?.userId;
  let user: any = $state(null);

  function muteUser() {
    pb.collection('users').update(userId, {
      "roles+": ["muted"],
    });
  }

  onMount(async () => {
    listenUsers(userId, e => user = e);
  });
</script>

{#if user}
  <UserPreview userId={userId}/>
  {#if $currentAuth?.roles?.includes("admin")}
    <br>
    <Button onclick={muteUser}>Mute</Button>
  {/if}
{/if}