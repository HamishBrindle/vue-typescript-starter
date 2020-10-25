<template>
  <v-app
    id="app-dashboard"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <!-- Overlay / Loading screen -->
    <v-overlay
      ref="overlay"
      :value="isOverlayVisible"
    >
      <v-progress-circular
        indeterminate
        size="64"
      />
    </v-overlay>

    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import constants from '@/constants.json';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import FullScreenLayout from '@/layouts/FullScreenLayout.vue';
import StorefrontLayout from '@/layouts/StorefrontLayout.vue';

@Component({
  name: 'App',
  components: {
    DashboardLayout,
    FullScreenLayout,
    StorefrontLayout,
  },
})
export default class App extends Vue {
  @Get('context/overlay@visible')
  isOverlayVisible!: boolean;

  @Get('context/theme@dark')
  isDarkTheme!: boolean;

  @Sync('layout/totalHeight')
  totalHeight!: number;

  drawer = null;

  applicationName = constants.appName;

  year = new Date().getFullYear();

  @Watch('isDarkTheme')
  onThemeChange() {
    this.applyTheme();
  }

  get layout() {
    const which = this.$route.meta.layout || 'main';
    return `${which}-layout`;
  }

  get theme() {
    return (this.isDarkTheme) ? 'dark' : 'light';
  }

  created() {
    this.applyTheme();
  }

  mounted() {
    window.addEventListener('resize', this.onResize);
    this.$nextTick(() => {
      this.onResize();
    });
  }

  destroyed() {
    window.removeEventListener('resize', this.onResize);
  }

  applyTheme() {
    this.$vuetify.theme.dark = this.isDarkTheme;
  }

  onResize() {
    this.totalHeight = window.innerHeight;
  }
}
</script>

<style lang="scss">
$fade-duration: 275ms;
$slide-duration: 375ms;
$breadcrumb-duration: 500ms;

// Fades
.fade-enter-active,
.fade-leave-active {
  transition: opacity $fade-duration ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

// Slide up-down
.slide-enter-active, .slide-leave-active {
  transition: all $slide-duration ease-in-out;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateY(3rem);
}

// Slide up-down
.slide-reverse-enter-active, .slide-reverse-leave-active {
  transition: all $slide-duration ease-in-out;
}
.slide-reverse-enter, .slide-reverse-leave-to {
  opacity: 0;
  transform: translateY(-3rem);
}
</style>
