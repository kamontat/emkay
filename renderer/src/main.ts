import "./styles/app.css";
import "./styles/mymk.css";
import "./styles/reset.css";

import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
