<script lang="ts">
	import '../app.css';
  import { currentAuth, pb } from '$lib/util/pocketbase';
  import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, DropdownHeader, DropdownItem, Dropdown, DropdownDivider } from 'flowbite-svelte';
  import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
	let { children } = $props();


  async function login() {
    await pb.collection('users').authWithOAuth2({ provider: "discord" });
  }
  async function signOut() {
    pb.authStore.clear();
  }
</script>

<div class="min-h-screen min-w-screen relative z-0">
  <script src="https://yellowbrickring.com/widget.js" defer></script>
  <Navbar>
    <NavBrand href="/">
      <img src="/favicon.png" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Fireship Discord Quotes</span>
    </NavBrand>
    <webring-widget site-id="fireshipquotes.com"></webring-widget>
    <NavHamburger />
    {#if $currentAuth}
      <NavUl>
        <NavLi id="user-menu" class="cursor-pointer">Account</NavLi>
      <Dropdown placement="bottom" triggeredBy="#user-menu">
        <DropdownHeader>
          <span class="block text-sm font-semibold">{$currentAuth?.name || "ERROR"}</span>
          <span class="block truncate text-sm font-thin">{$currentAuth?.discord_id || "xxxxxxxxxxxxxxxxxx" }</span>
        </DropdownHeader>
        <DropdownDivider />
        <DropdownItem class="cursor-pointer" on:click={signOut}>Log Out</DropdownItem>
      </Dropdown>
    </NavUl>
    {:else}
      <NavUl>
        <NavLi class="cursor-pointer" on:click={login}>Log In</NavLi>
      </NavUl>
    {/if}
  </Navbar>

  <main class="max-w-full min-h-screen">
    {@render children()}
  </main>

  <Footer class="w-full bg-white border-t border-gray-200 shadow-sm flex items-center justify-evenly p-6 dark:bg-gray-800 dark:border-gray-600">
    <FooterCopyright href="/" by="MULTIPLAYER, LLC" year={2025} />
    <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
      <FooterLink href="https://discord.gg/wAxRKV6Xrv" target="_blank">Fireship Discord</FooterLink>
      <FooterLink href="/privacy">Privacy Policy</FooterLink>
      <FooterLink href="https://github.com/MULTIPLAYER-LLC/FireshipQuotes">Source Code</FooterLink>
    </FooterLinkGroup>
  </Footer>
</div>
