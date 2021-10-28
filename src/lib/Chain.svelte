<script>
  import { activeChain } from "./stores";
</script>

<div
  class="bg-gray-100 w-65 h-65 rounded-xl shadow-lg  m-4 divide-y  pointer-events-auto"
>
  <ul>
    {#each [...$activeChain].reverse() as link, i}
      <li class:text-gray-200={false}>
        {link.nodeName.toLowerCase()}
      </li>
    {/each}
  </ul>
</div>
