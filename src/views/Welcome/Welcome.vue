<template>
  <div class="welcome__wrapper">
    <div class="welcome">
      Hello, world!
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Welcome',
  components: {},
})
export default class Welcome extends Vue {

}
</script>

<style lang="scss">
// .welcome {}
</style>
