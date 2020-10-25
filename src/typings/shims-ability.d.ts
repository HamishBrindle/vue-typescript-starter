/* eslint-disable @typescript-eslint/interface-name-prefix */

import Vue from 'vue';
import { AbilityMap } from '@/lib/types';

declare module 'vue/types/vue' {
  interface Vue {
    $ability: AbilityMap;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    ability?: AbilityMap;
  }
}
