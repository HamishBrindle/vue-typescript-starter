<template>
  <div class="storefront-layout">
    <!-- Navigation -->
    <slot />
    <!-- Footer -->
    <!-- Fixed Soundbar -->
    <!-- <soundbar class="storefront-layout__soundbar" /> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Sync } from 'vuex-pathify';
import Soundbar from '@/components/Storefront/Sound/Soundbar/Soundbar.vue';

@Component({
  name: 'StorefrontLayout',
  components: {
    Soundbar,
  },
})
export default class StorefrontLayout extends Vue {
  @Sync('context/theme@dark')
  isDarkTheme!: boolean;

  mounted() {
    this.isDarkTheme = false;
  }
}
</script>

<style lang="scss">
.storefront-layout {
  height: 100%;
  position: relative;

  &__soundbar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}
</style>
