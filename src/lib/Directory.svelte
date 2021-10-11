<script>
  export let root;

  let node;
  let hovered;

  $: {
    if (!node) node = root;
  }
  $: children = node ? Array.from(node.children) : [];

  function over(node) {
    if (hovered) delete hovered.dataset.hover;
    hovered = node;
    node.dataset.hover = "";
  }

  function out() {
    delete hovered.dataset.hover;
  }
</script>

<div
  class="bg-gray-100 w-65 h-80 rounded-xl shadow-lg amoeba-item self-center m-4 divide-y justify-self-end"
>
  <div class="m-2 grid grid-cols-[1fr,3fr,1fr] justify-items-center">
    <button
      disabled={node === root}
      on:click={(e) => (node = node.parentElement)}
      class="disabled:text-gray-300">back</button
    >
    {node?.nodeName.toLowerCase()}
  </div>
  <ul>
    {#each children as child}
      <li
        on:click={(e) => {
          if (child.children.length) node = child;
        }}
        on:mouseover={(e) => over(child)}
        on:mouseout={out}
        on:focus={(e) => console.log}
        on:blur={(e) => console.log}
        class="px-2 py-1 cursor-pointer hover:bg-gray-200"
      >
        {child.nodeName.toLowerCase()}
        {#if child.children.length > 0}
          ({child.children.length})
        {:else}
          - {child.textContent.substring(0, 10)}
        {/if}
      </li>
    {/each}
  </ul>
</div>
