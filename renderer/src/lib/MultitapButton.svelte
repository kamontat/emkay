<script lang="ts">
  interface Props {
    /** how many times for multitap event to execute */
    times: number;
    /** max time different in milliseconds each click need to be */
    delay?: number;
    onMultitap?: (count: number) => void;
    onReset?: () => void;
    children?: import("svelte").Snippet;
  }

  let { times, delay = 450, onMultitap, onReset, children }: Props = $props();

  let previous = -1;
  let count = 0;

  const clickHandler = () => {
    if (previous < 0) previous = Date.now();
    const now = Date.now();

    const diff = now - previous;
    if (diff > delay) {
      onReset?.();
      reset();
    }

    count++;
    previous = Date.now();

    if (count >= times) {
      onMultitap?.(count);
      reset();
    }
  };

  const reset = () => {
    previous = -1;
    count = 0;
  };
</script>

<button class="reset" onclick={clickHandler}>{@render children?.()}</button>
