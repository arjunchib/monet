<script>
  import { onMount, onDestroy } from "svelte";
  import Directory from "./lib/Directory.svelte";
  import testHtml from "./assets/test.html?raw";
  import Layout from "./lib/Layout.svelte";
  import Chain from "./lib/Chain.svelte";

  let root, active, hovered;
  let activeChain = [];
  let activeChainPointer = 0;
  let showPanel = true;

  const observer = new MutationObserver((records) => {
    if (records.every((record) => record.attributeName === "data-hover"))
      return;
    root = root;
    active = active;
  });

  onMount(() => {
    root = document.getElementById("root");
    observer.observe(root, {
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

  function move(e) {
    if (hovered) delete hovered.dataset.hover;
    e.target.dataset.hover = "";
    hovered = e.target;
  }

  function leave() {
    if (hovered) delete hovered.dataset.hover;
  }

  function click(e) {
    let currEl = e.target;
    activeChain = [currEl];
    while (currEl.parentElement !== root) {
      currEl = currEl.parentElement;
      activeChain.push(currEl);
    }
    activeChainPointer = 0;
    updateActive(e.target);
  }

  function handleKeydown(e) {
    switch (e.code) {
      case "Space":
        showPanel = !showPanel;
        break;
      case "BracketLeft": // up the tree
        if (active && activeChainPointer + 1 < activeChain.length) {
          activeChainPointer += 1;
          updateActive(activeChain[activeChainPointer]);
          console.log(activeChain);
        }
        break;
      case "BracketRight": // down the tree
        if (activeChainPointer - 1 >= 0) {
          activeChainPointer -= 1;
          updateActive(activeChain[activeChainPointer]);
        }
        break;
    }
  }

  function updateActive(newValue) {
    if (active) delete active.dataset.active;
    if (hovered) delete hovered.dataset.hover;
    active = newValue;
    active.dataset.active = "";
  }
</script>

<nav
  class="amoeba h-screen w-screen fixed pointer-events-none"
  class:hidden={!showPanel}
>
  <div class="amoeba-item self-center justify-self-start">
    <Directory {root} />
    <Chain chain={activeChain} pointer={activeChainPointer} />
  </div>
  <Layout node={active} />
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
    @apply bg-amber-100;
    outline-offset: 0;
  }

  :global(.hidden) {
    display: none;
  }
</style>
