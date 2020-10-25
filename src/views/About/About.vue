<template>
  <div class="about__wrapper">
    <div class="about">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'About',
  components: {},
})
export default class About extends Vue {

}
</script>

<style lang="scss">
// .about {}
</style>
