/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_APP_TITLE: string;
    VITE_API_URL: string;
    // You can add more environment variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }