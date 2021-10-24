<script>
  export let node;
  export let style;

  let styles;

  $: {
    if (node) {
      styles = window.getComputedStyle(node);
    }
  }

  const staticClass = "block text-xs";

  $: rootClass = $$props.class
    ? `${$$props.class} ${staticClass}`
    : staticClass;

  function focus(e) {
    e.target.innerText = node.style[style] || styles.getPropertyValue(style);
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
  class={rootClass}
  contenteditable
  on:focus={(e) => focus(e)}
  on:keydown={(e) => keydown(e)}
  on:blur={(e) => blur(e)}
>
  {parseInt(styles?.getPropertyValue(style))}
</div>
