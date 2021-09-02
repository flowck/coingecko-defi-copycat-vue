declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $isLoading: (value: boolean) => void;
  }
}

export {};
