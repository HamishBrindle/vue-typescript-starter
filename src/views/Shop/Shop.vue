<template>
  <div class="shop__wrapper">
    <div class="shop">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Shop',
  components: {},
})
export default class Shop extends Vue {

}
</script>

<style lang="scss">
// .shop {}
</style>
