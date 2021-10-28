import { writable, get, derived } from "svelte/store";

export const root = writable();
export const active = createActive();
export const hover = createHover();
export const activeChain = derived(active, ($active) => {
  if ($active == null) return [];
  let curr = $active;
  const chain = [curr];
  while (curr.parentElement !== get(root)) {
    curr = curr.parentElement;
    chain.push(curr);
  }
  return chain;
});

function createActive() {
  const { subscribe, update } = writable();

  return {
    subscribe,
    set(value) {
      update((n) => {
        if (n) delete n.dataset.active;
        if (value) value.dataset.active = "";
        return value;
      });
    },
  };
}

function createHover() {
  const { subscribe, update } = writable();

  return {
    subscribe,
    set(value) {
      update((n) => {
        if (n) delete n.dataset.hover;
        if (value) value.dataset.hover = "";
        return value;
      });
    },
  };
}
