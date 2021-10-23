<script>
  export let node;
  export let style;

  let styles;

  $: {
    if (node) {
      styles = window.getComputedStyle(node);
    }
  }

  function focus(e) {
    e.target.innerText = styles.getPropertyValue(style);
    setTimeout(() => {
      window.getSelection().selectAllChildren(e.target);
    }, 0);
  }

  function blur(e) {
    node.style[style] = e.target.textContent;
    e.target.innerText = parseInt(styles.getPropertyValue(style));
    window.getSelection().removeAllRanges();
  }

  function keydown(e) {
    if (e.code === "Enter") {
      e.target.blur();
    }
  }
</script>

<div
  class="block"
  contenteditable
  on:focus={(e) => focus(e)}
  on:keydown={(e) => keydown(e)}
  on:blur={(e) => blur(e)}
>
  {styles?.getPropertyValue(style)}
</div>
