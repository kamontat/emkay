<script lang="ts">
  import format from "date-fns/format";
  import formatDistance from "date-fns/formatDistance";
  import { updated_at } from "../../../scraper/data.json";
  const updatedAt = new Date(updated_at);

  const data = [
    { name: "Mode", value: import.meta.env.MODE },
    { name: "Environment", value: import.meta.env.VITE_VERCEL_ENV ?? "unknown" },
    { name: "Branch name", value: import.meta.env.VITE_VERCEL_GIT_COMMIT_REF ?? "unknown" },
    { name: "Commit ID", value: import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA ?? "unknown" },
    { name: "Commit message", value: import.meta.env.VITE_VERCEL_GIT_COMMIT_MESSAGE ?? "unknown" },
    {
      name: "Data updated time",
      value: `${format(updatedAt, "dd/MM/yyyy HH:mm")} (${formatDistance(updatedAt, new Date(), {
        addSuffix: true,
      })})`,
    },
  ];
</script>

<div class="debug-root">
  <h2 class="title">Debug information</h2>
  <div class="container">
    {#each data as element}
      <div class="row">
        <div class="col-6 col-sm-8">{element.name}</div>
        <div class="col-6 col-md-4">{element.value}</div>
      </div>
    {/each}
  </div>
</div>

<style>
  .debug-root {
    display: flex;
    flex-direction: column;

    margin-top: 1.5rem;
    padding-top: 0.5rem;
    padding-bottom: 1rem;
  }

  .title {
    text-align: center;
  }
</style>
