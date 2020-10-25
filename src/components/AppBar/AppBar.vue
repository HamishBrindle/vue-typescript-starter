<template>
  <v-app-bar
    ref="bar"
    app
    clipped-left
    color="primary"
    dark
  >
    <v-app-bar-nav-icon @click.stop="onToggleDrawer(!drawer)" />
    <v-toolbar-title>
      <router-link
        v-slot="{ navigate }"
        :to="{ name: 'home' }"
      >
        <app-logo
          class="logo"
          @click="navigate"
        />
      </router-link>
    </v-toolbar-title>
    <user-icon />
  </v-app-bar>
</template>

<script lang="ts">
import { Sync } from 'vuex-pathify';
import { UserService } from '@/services/UserService';
import {
  Vue, Component, Watch, Prop, Ref,
} from 'vue-property-decorator';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - TODO: Write proper declaration file for SVG
import ApplicationLogo from '@/assets/images/svg/app_logo_flat.svg?inline';
import UserIcon from './User/UserIcon.vue';

@Component({
  name: 'AppBar',
  components: {
    'app-logo': ApplicationLogo,
    UserIcon,
  },
})
export default class AppBar extends Vue {
  @Prop({ required: true, default: false })
  private readonly value!: boolean;

  @Ref('bar')
  private readonly barRef!: Vue;

  @Sync('layout/appBarHeight')
  private appBarHeight!: number;

  private readonly userService: UserService = UserService.getInstance();

  private drawer = this.value;

  private get user() {
    return this.userService.getActive();
  }

  mounted() {
    window.addEventListener('resize', this.onResize);
    this.$nextTick(this.onResize);
  }

  destroyed() {
    window.removeEventListener('resize', this.onResize);
  }

  @Watch('value')
  private onValueChange(v: boolean) {
    this.drawer = v;
  }

  private onToggleDrawer(isOpen: boolean) {
    this.$emit('input', isOpen);
  }

  private onResize() {
    this.appBarHeight = this.barRef.$el.getBoundingClientRect().height;
  }
}
</script>

<style lang="scss">
.logo {
  width: 2.5rem;
  padding-top: 0.5rem;
  opacity: 1;
  transition: opacity 150ms ease-in-out;

  path {
    fill: white;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
}
</style>
