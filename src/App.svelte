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
</script>

<nav class="amoeba h-screen w-screen fixed">
  <Directory {root} />
</nav>

<div id="root">{@html testHtml}</div>

<style>
  :global(*[data-hover]) {
    @apply bg-amber-100;
  }
</style>
