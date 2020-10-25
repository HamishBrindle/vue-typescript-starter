<template>
  <div class="home__wrapper">
    <div class="home">
      Hello
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Home',
})
export default class Home extends Vue {

}
</script>

<style lang="scss">
// .home {}
</style>
