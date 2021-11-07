<script>
  import LengthInput from "./inputs/LengthInput.svelte";
</script>

<div
  class="bg-gray-100 w-65 h-65 rounded-xl shadow-lg  m-4 divide-y pointer-events-auto amoeba"
>
  <div
    class="border-dashed border-1 border-yellow-500 bg-yellow-100 w-55 h-38 amoeba-item place-self-center grid-9"
  >
    <div
      class="border-5 border-gray-500 bg-purple-200 w-41 h-23 grid-9 col-start-2 row-start-2"
    >
      <div
        class="w-25 h-8 border-dashed border-1 border-blue-500 bg-blue-200  flex items-center justify-center flex-row gap-1 col-start-2 row-start-2 text-xs"
      >
        <LengthInput style="width" />
        x
        <LengthInput style="height" />
      </div>
      <LengthInput style="padding-top" class="col-start-2 row-start-1" />
      <LengthInput style="padding-right" class="col-start-3 row-start-2" />
      <LengthInput style="padding-bottom" class="col-start-2 row-start-3" />
      <LengthInput style="padding-left" class="col-start-1 row-start-2" />
    </div>
    <LengthInput style="margin-top" class="col-start-2 row-start-1" />
    <LengthInput style="margin-right" class="col-start-3 row-start-2" />
    <LengthInput style="margin-bottom" class="col-start-2 row-start-3" />
    <LengthInput style="margin-left" class="col-start-1 row-start-2" />
  </div>
</div>

<style>
  .grid-9 {
    display: grid;
    grid: repeat(3, auto) / repeat(3, 1fr);
    place-items: center;
  }
</style>
