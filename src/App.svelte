<script>
  import { onMount, onDestroy } from "svelte";
  import Directory from "./lib/Directory.svelte";
  import testHtml from "./assets/test.html?raw";

  let root;

  const observer = new MutationObserver((records) => {
    if (records.every((record) => record.attributeName === "data-hover"))
      return;
    root = root;
  });

  onMount(() => {
    root = document.getElementById("root");
    observer.observe(root, {
      subtree: true,
      characterData: true,
      attributes: true,
      childList: true,
    });
  });

  onDestroy(() => observer.disconnect());

  let hovered;
  function move(e) {
    if (hovered) delete hovered.dataset.hover;
    e.target.dataset.hover = "";
    hovered = e.target;
  }

  function leave() {
    if (hovered) delete hovered.dataset.hover;
  }

  let active;
  function click(e) {
    if (active) delete active.dataset.active;
    e.target.dataset.active = "";
    active = e.target;
  }
</script>

<nav class="amoeba h-screen w-screen fixed pointer-events-none">
  <Directory {root} />
</nav>

<div
  id="root"
  on:mouseleave|stopPropagation={leave}
  on:mousemove|stopPropagation={(e) => move(e)}
  on:click|stopPropagation={(e) => click(e)}
>
  {@html testHtml}
</div>

<style>
  :global(*[data-hover]) {
    @apply bg-amber-100;
    cursor: pointer;
    user-select: none;
  }

  :global(*[data-active]) {
    @apply outline-dark-100;
    outline-offset: 0;
  }
</style>
