<script>
  import { active } from "../stores";

  export let style;

  let styles;

  $: {
    if ($active) {
      styles = window.getComputedStyle($active);
    }
  }

  const staticClass = "block text-xs";

  $: rootClass = $$props.class
    ? `${$$props.class} ${staticClass}`
    : staticClass;

  function focus(e) {
    e.target.innerText = $active.style[style] || styles.getPropertyValue(style);
    setTimeout(() => {
      window.getSelection().selectAllChildren(e.target);
    }, 0);
  }

  function blur(e) {
    $active.style[style] = e.target.textContent;
    e.target.innerText = parseInt(styles.getPropertyValue(style));
    window.getSelection().removeAllRanges();
  }

  function nudge(e, dir) {
    let mag = 1;
    if (e.getModifierState("Shift")) {
      mag = e.getModifierState("Control") ? 0.1 : 10;
    }
    const text = e.target.textContent;
    const num = parseFloat(e.target.textContent);
    const newNum = num + dir * mag;
    const newNumStr = newNum % 1 === 0 ? newNum : newNum.toFixed(1);
    e.target.innerText = text.replace(num, newNumStr);
    $active.style[style] = e.target.textContent;
  }

  function keydown(e) {
    switch (e.code) {
      case "Enter":
        e.target.blur();
        break;
      case "ArrowUp":
        nudge(e, 1);
        break;
      case "ArrowDown":
        nudge(e, -1);
        break;
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
