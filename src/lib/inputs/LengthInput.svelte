<script>
  import { active } from "../stores";

  export let style;

  let value, displayValue, input;
  let showUnits = false;

  $: {
    if ($active) {
      value = window.getComputedStyle($active)?.getPropertyValue(style);
    }
  }

  $: {
    if (showUnits) {
      displayValue = value;
    } else {
      const numValue = parseInt(value);
      displayValue = Number.isNaN(numValue) ? "-" : numValue.toString();
    }
  }

  $: {
    if (input) input.innerText = displayValue;
  }

  const staticClass = "block text-xs";

  $: rootClass = $$props.class
    ? `${$$props.class} ${staticClass}`
    : staticClass;

  function focus(e) {
    showUnits = true;
    setTimeout(() => {
      window.getSelection().selectAllChildren(e.target);
    }, 0);
  }

  function blur(e) {
    showUnits = false;
    $active.style[style] = e.target.textContent;
    window.getSelection().removeAllRanges();
  }

  function nudge(e, dir) {
    let mag = 1;
    if (e.getModifierState("Shift")) {
      mag = e.getModifierState("Control") ? 0.1 : 10;
    }
    const text = e.target.textContent;
    const num = parseFloat(value);
    const newNum = num + dir * mag;
    const newNumStr = newNum % 1 === 0 ? newNum : newNum.toFixed(1);
    $active.style[style] = text.replace(num, newNumStr);
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
  bind:this={input}
  class={rootClass}
  contenteditable
  on:focus={(e) => focus(e)}
  on:keydown|stopPropagation={(e) => keydown(e)}
  on:blur={(e) => blur(e)}
/>
