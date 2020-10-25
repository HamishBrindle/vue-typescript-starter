<template>
  <div class="landing-page-layout__wrapper">
    <div class="landing-page-layout">
      <!-- Landing-page Body -->
      <v-main>
        <v-container class="landing-page-layout__body">
          <transition
            name="fade"
            mode="out-in"
          >
            <slot />
          </transition>
        </v-container>
      </v-main>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'LandingPageLayout',
  components: {},
})
export class LandingPageLayout extends Vue {
}

export default LandingPageLayout;
</script>

<style lang="scss">
// .landing-page-layout {}
</style>
