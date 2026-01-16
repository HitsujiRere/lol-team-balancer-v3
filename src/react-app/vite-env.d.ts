/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * League of Legends DDRAGON Version
   */
  readonly VITE_DDRAGON_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
