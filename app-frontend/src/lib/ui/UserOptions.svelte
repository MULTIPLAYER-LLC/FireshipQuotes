<script lang="ts">
  import { currentAuth, pb } from '$lib/util/pocketbase';
  import { Button } from 'flowbite-svelte';

  async function login() {
    await pb.collection('users').authWithOAuth2({ provider: "discord" });
  }
  async function signOut() {
    pb.authStore.clear();
  }
</script>

<div>
  {#if $currentAuth}
    Signed in as {$currentAuth.name}
    <Button on:click={signOut}>Log Out</Button>
  {:else}
    <Button on:click={login}>Log In</Button>
  {/if}
</div>