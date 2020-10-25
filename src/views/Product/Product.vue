<template>
  <div class="products__wrapper">
    <div class="products">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Products',
  components: {},
})
export default class Products extends Vue {

}
</script>

<style lang="scss">
// .products {}
</style>
