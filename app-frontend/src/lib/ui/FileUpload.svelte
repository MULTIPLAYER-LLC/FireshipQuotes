<script lang="ts">
  import { SpeedDial, SpeedDialButton } from 'flowbite-svelte';
  import { FileCirclePlusSolid } from 'flowbite-svelte-icons';
  import { Button, Modal, Label, Fileupload } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import { currentAuth, pb } from '$lib/util/pocketbase';

  let images: any = $state();
  let formModal = $state(false);
  let locked = $state(false);

  async function uploadImage() {
    if(images.length > 0 && !locked) {
      formModal = false;
      await pb.collection('posts').create({
        image: images.item(0),
        owner: $currentAuth.id
      });
    }
  }

  async function onExpand() {
    if(!$currentAuth) {
      await pb.collection('users').authWithOAuth2({ provider: "discord" });
    }
    formModal = true;
  }

</script>

<SpeedDial color="primary" defaultClass="fixed end-6 bottom-6 z-10">
  <Button pill={true} on:click={onExpand} slot="button" color="primary" class="p-3">
    <FileCirclePlusSolid class="w-8 h-8" />
  </Button>
</SpeedDial>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
  <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Upload a quote!</h3>
  <Fileupload bind:files={images} />
  <Button on:click={uploadImage} type="submit" class="w-full1">Upload!</Button>
</Modal>