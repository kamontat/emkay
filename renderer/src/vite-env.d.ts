/// <reference types="svelte" />
/// <reference types="vite/client" />

// NOTE: System Environment https://vercel.com/docs/projects/environment-variables/system-environment-variables

interface ImportMetaEnv {
  /** The Environment that the app is deployed and running on. The value can be either production, preview, or development. */
  readonly VITE_VERCEL_ENV: string;
  /** The domain name of the generated deployment URL. Example: *.vercel.app. The value does not include the protocol schemehttps://. NOTE: This Variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection. */
  readonly VITE_VERCEL_URL: string;
  /** The domain name of the generated Git branch URL. Example: *-git-*.vercel.app. The value does not include the protocol scheme https://. */
  readonly VITE_VERCEL_BRANCH_URL: string;
  /** The Protection Bypass for Automation value, if the secret has been generated in the project's Deployment Protection settings. */
  readonly VITE_VERCEL_AUTOMATION_BYPASS_SECRET: string;
  /** The Git Provider the deployment is triggered from. Example: github. */
  readonly VITE_VERCEL_GIT_PROVIDER: string;
  /** The origin repository the deployment is triggered from. Example: my-site. */
  readonly VITE_VERCEL_GIT_REPO_SLUG: string;
  /** The account that owns the repository the deployment is triggered from. Example: acme. */
  readonly VITE_VERCEL_GIT_REPO_OWNER: string;
  /** The ID of the repository the deployment is triggered from. Example: 117716146. */
  readonly VITE_VERCEL_GIT_REPO_ID: string;
  /** The git branch of the commit the deployment was triggered by. Example: improve-about-page. */
  readonly VITE_VERCEL_GIT_COMMIT_REF: string;
  /** The git SHA of the commit the deployment was triggered by. Example: fa1eade47b73733d6312d5abfad33ce9e4068081. */
  readonly VITE_VERCEL_GIT_COMMIT_SHA: string;
  /** The message attached to the commit the deployment was triggered by. Example: Update about page. */
  readonly VITE_VERCEL_GIT_COMMIT_MESSAGE: string;
  /** The username attached to the author of the commit that the project was deployed by. Example: johndoe. */
  readonly VITE_VERCEL_GIT_COMMIT_AUTHOR_LOGIN: string;
  /** The name attached to the author of the commit that the project was deployed by. Example: John Doe. */
  readonly VITE_VERCEL_GIT_COMMIT_AUTHOR_NAME: string;
  /** The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string. Example: 23. */
  readonly VITE_VERCEL_GIT_PULL_REQUEST_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
