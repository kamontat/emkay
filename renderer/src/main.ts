import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject as injectAnalytics } from '@vercel/analytics'

import "./styles/app.css";
import "./styles/mymk.css";
import "./styles/reset.css";

import App from "./App.svelte";
import { mount } from "svelte";

injectSpeedInsights();
injectAnalytics();
const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
