<script lang="ts">
	import { env } from '$env/dynamic/public';
</script>

<menu class="flex w-max mx-auto justify-between mb-2 gap-2 -mt-2 border-2 border-yellow-200 rounded-xl px-4 py-0.5">
  <a class="rounded-xl bg-yellow-200 -my-[2px] -ml-[16px] px-2 flex items-center" target="_blank" rel="noreferrer noopener" href="https://yellowbrickring.com"><strong>yellowbrickring</strong></a>
  <a class="underline text-gold" target="_blank" rel="noreferrer noopener" href="https://yellowbrickring.com/webring?from={env.PUBLIC_SITE_AUTHORITY}&to=prev">prev</a>
  <span>|</span>
  <a class="underline text-gold" target="_blank" rel="noreferrer noopener" href="https://yellowbrickring.com/webring?from={env.PUBLIC_SITE_AUTHORITY}&to=random">rand</a>
  <span>|</span>
  <a class="underline text-gold" target="_blank" rel="noreferrer noopener" href="https://yellowbrickring.com/webring?from={env.PUBLIC_SITE_AUTHORITY}&to=next">next</a>
</menu>

<style>
  @media (min-width: 1100px) {
    menu {
      position: relative;
      top: -2.6rem;
    }
  }
</style>
