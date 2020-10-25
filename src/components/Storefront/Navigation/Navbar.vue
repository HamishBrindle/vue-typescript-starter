<template>
  <div class="navbar__wrapper">
    <div class="navbar">
      NAVBAR
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Navbar',
  components: {},
})
export default class Navbar extends Vue {

}
</script>

<style lang="scss">
.navbar {
  width: 100%;
}
</style>
