<script>
  import LengthInput from "./inputs/LengthInput.svelte";

  export let node;

  let styles, height;

  $: {
    if (node) {
      styles = window.getComputedStyle(node);
      height = styles.getPropertyValue("height");
    }
  }

  function focus(e) {
    e.target.innerText = styles.getPropertyValue("width");
    setTimeout(() => {
      window.getSelection().selectAllChildren(e.target);
    }, 0);
  }

  function blur(e) {
    node.style.width = e.target.textContent;
    e.target.innerText = node.clientWidth;
    window.getSelection().removeAllRanges();
  }

  function keydown(e) {
    if (e.code === "Enter") {
      e.target.blur();
    }
  }
</script>

<div
  class="bg-gray-100 w-65 h-65 rounded-xl shadow-lg amoeba-item self-center m-4 divide-y justify-self-end pointer-events-auto amoeba"
>
  <div
    class="border-dashed border-1 border-yellow-500 bg-yellow-100 w-55 h-38 amoeba-item place-self-center flex items-center justify-center"
  >
    <div
      class="border-5 border-gray-500 bg-purple-200 w-41 h-23 flex items-center justify-center"
    >
      <div
        class=" w-25 h-8 border-dashed border-1 border-blue-500 bg-blue-200  flex items-center justify-center text-xs flex-row gap-1"
      >
        <LengthInput {node} style="width" />
        x
        <LengthInput {node} style="height" />
      </div>
    </div>
  </div>
</div>
