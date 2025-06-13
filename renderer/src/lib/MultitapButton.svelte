<script lang="ts">
  import { createEventDispatcher } from "svelte";

  interface Props {
    /** how many times for multitap event to execute */
    times: number;
    /** max time different in milliseconds each click need to be */
    delay?: number;
    children?: import('svelte').Snippet;
  }

  let { times, delay = 450, children }: Props = $props();

  const EVENT_MULTITAP_NAME = "multitap";
  const EVENT_RESET_NAME = "reset";
  const dispatch = createEventDispatcher();
  let previous = -1;
  let count = 0;

  const clickHandler = () => {
    if (previous < 0) previous = Date.now();
    const now = Date.now();

    const diff = now - previous;
    if (diff > delay) {
      dispatch(EVENT_RESET_NAME);
      reset();
    }

    count++;
    previous = Date.now();

    if (count >= times) {
      dispatch(EVENT_MULTITAP_NAME, {
        count,
      });
      reset();
    }
  };

  const reset = () => {
    previous = -1;
    count = 0;
  };
</script>

<button class="reset" onclick={clickHandler}>{@render children?.()}</button>
