<script lang="ts">
  import { createEventDispatcher } from "svelte";

  /** how many times for multitap event to execute */
  export let times;
  /** max time different in milliseconds each click need to be */
  export let delay = 450;

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

<button class="reset" on:click={clickHandler}><slot /></button>
