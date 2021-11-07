<script>
  import SelectInput from "./inputs/SelectInput.svelte";
</script>

<div
  class="bg-gray-100 w-65 h-65 rounded-xl shadow-lg  m-4 divide-y  pointer-events-auto"
>
  <SelectInput
    style="font-family"
    options={["serif", "sans-serif", "cursive", "fantasy", "monospace"]}
  />
</div>
