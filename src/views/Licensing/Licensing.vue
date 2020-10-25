<template>
  <div class="licensing__wrapper">
    <div class="licensing">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Licensing',
  components: {},
})
export default class Licensing extends Vue {

}
</script>

<style lang="scss">
// .licensing {}
</style>
