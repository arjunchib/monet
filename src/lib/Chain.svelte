<script>
  export let chain, pointer;
</script>

<div
  class="bg-gray-100 w-65 h-65 rounded-xl shadow-lg  m-4 divide-y  pointer-events-auto"
>
  <ul>
    {#each [...chain].reverse() as link, i}
      <li class:text-gray-200={pointer >= chain.length - i}>
        {link.nodeName.toLowerCase()}
      </li>
    {/each}
  </ul>
</div>
