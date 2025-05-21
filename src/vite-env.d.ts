/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MC_API_KEY: string;
  readonly VITE_MC_DC: string;
  readonly VITE_MC_AUDIENCE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
