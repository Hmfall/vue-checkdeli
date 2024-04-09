declare global {
    interface ImportMetaEnv {
        readonly PROD: boolean;
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }

    export type Nullable<T> = T | null;

    export type Id = number;
}

export {};
