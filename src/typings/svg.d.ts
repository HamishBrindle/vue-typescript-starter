import { Component } from "vue";
import { VueConstructor } from "vue/types/umd";

declare module '*.svg' {
  const value: any;
  export default value;
}

declare module '*.svg?inline' {
  const value: any;
  export default value;
}