<script>
  import { onMount, onDestroy } from "svelte";
  import Directory from "./lib/Directory.svelte";
  import testHtml from "./assets/test.html?raw";
  import Layout from "./lib/Layout.svelte";
  import Chain from "./lib/Chain.svelte";
  import { root, active, hover } from "./lib/stores.js";

  let showPanel = true;

  const observer = new MutationObserver((records) => {
    if (records.every((record) => record.attributeName.startsWith("data-")))
      return;
    $root = $root;
    $active = $active;
  });

  onMount(() => {
    root.set(document.getElementById("root"));
    observer.observe($root, {
      subtree: true,
      characterData: true,
      attributes: true,
      childList: true,
    });
    document.addEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    observer.disconnect();
    document.removeEventListener("keydown", handleKeydown);
  });

  function handleKeydown(e) {
    switch (e.code) {
      case "Space":
        showPanel = !showPanel;
        break;
      case "BracketLeft": // up the tree
        break;
      case "BracketRight": // down the tree
        break;
    }
  }
</script>

<nav
  class="amoeba h-screen w-screen fixed pointer-events-none"
  class:hidden={!showPanel}
>
  <div class="amoeba-item self-center justify-self-start">
    <Directory />
    <Chain />
  </div>
  <Layout />
</nav>

<div
  id="root"
  on:mouseleave|stopPropagation={() => ($hover = null)}
  on:mouseover|stopPropagation={(e) => ($hover = e.target)}
  on:click|stopPropagation={(e) => ($active = e.target)}
  on:focus
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
    @apply bg-amber-100;
    outline-offset: 0;
  }

  :global(.hidden) {
    display: none;
  }
</style>
