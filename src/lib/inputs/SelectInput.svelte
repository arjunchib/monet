<script>
  import { active } from "../stores";
  export let style, options;

  let value;

  $: {
    if ($active) {
      value = window.getComputedStyle($active)?.getPropertyValue(style);
    }
  }

  function focus(e) {
    event.target.select();
  }

  function blur(e) {
    window.getSelection().removeAllRanges();
  }
</script>

<input
  {value}
  list={style}
  on:focus={(e) => focus(e)}
  on:blur={(e) => blur(e)}
  on:input={(e) => ($active.style[style] = e.target.value)}
/>
<datalist id={style}>
  {#each options as option}
    <option>{option}</option>
  {/each}
</datalist>
