<script>
  export let root;

  let node;
  let hovered;
  let active;
  let dragged;

  $: {
    if (!node) {
      node = root;
    } else {
      node = node;
    }
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

  function click(node) {
    if (active) delete active.dataset.active;
    if (hovered) delete hovered.dataset.hover;
    active = node;
    node.dataset.active = "";
  }

  function dragstart(e, node) {
    e.dataTransfer.dropEffect = "move";
    dragged = node;
  }

  function dragenter(e, node) {
    e.preventDefault();
  }

  function dragover(e) {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    const y = (e.y - rect.top) / rect.height;
    if (y < 0.5) {
      e.target.style.borderTop = "1px solid black";
      e.target.style.borderBottom = "";
    } else {
      e.target.style.borderTop = "";
      e.target.style.borderBottom = "1px solid black";
    }
  }

  function dragleave(e) {
    e.target.style.borderTop = "";
    e.target.style.borderBottom = "";
  }

  function drop(e, node) {
    const source = dragged;
    const dest = node;

    e.target.style.borderTop = "";
    e.target.style.borderBottom = "";

    const rect = e.target.getBoundingClientRect();
    const y = (e.y - rect.top) / rect.height;

    source.remove();
    if (y < 0.5) {
      dest.before(source);
    } else {
      dest.after(source);
    }
  }
</script>

<div
  class="bg-gray-100 w-65 h-80 rounded-xl shadow-lg amoeba-item self-center m-4 divide-y justify-self-end pointer-events-auto"
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
        on:click={(e) => click(child)}
        on:dblclick={(e) => {
          if (child.children.length) node = child;
        }}
        on:mouseover={(e) => over(child)}
        on:mouseout={out}
        on:focus={(e) => console.log}
        on:blur={(e) => console.log}
        on:dragstart={(e) => dragstart(e, child)}
        on:dragenter={(e) => dragenter(e, child)}
        on:dragover={(e) => dragover(e)}
        on:dragleave={(e) => dragleave(e)}
        on:drop={(e) => drop(e, child)}
        class="px-2 py-1 cursor-pointer hover:bg-gray-200 flex justify-between"
        class:active={active === child}
        draggable="true"
      >
        {child.nodeName.toLowerCase()}
        <span class="font-mono text-gray-400 font-light">
          {#if child.children.length > 0}
            {child.children.length}
          {:else}
            {child.textContent.trim().substring(0, 15)}
          {/if}
        </span>
      </li>
    {/each}
  </ul>
</div>

<style>
  :global(.active) {
    @apply !bg-blue-400;
  }
</style>
