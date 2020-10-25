<template>
  <v-row
    class="logout"
    align="center"
    justify="center"
  >
    <v-col
      cols="12"
      sm="8"
      md="4"
    >
      <div class="logout__wrapper">
        <div class="logout">
          <v-card>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="display-1 font-weight-light">
                  Logged Out
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-card-text>
              <div>
                You've successfully logged out.
                <span class="font-weight-bold">
                  &nbsp;Great work today
                </span>, we'll see you again soon!
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <router-link
                v-slot="{ href, navigate }"
                :to="{ name: 'login' }"
              >
                <v-btn
                  color="primary"
                  text
                  depressed
                  large
                  :href="href"
                  @click="navigate"
                >
                  Login
                </v-btn>
              </router-link>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { AuthService } from '@/services/AuthService';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Logout',
})
export class Logout extends Vue {
  private readonly authService = AuthService.getInstance();

  private beforeCreate() {
    this.authService.logout();
  }
}

export default Logout;
</script>

<style lang="scss">
// .logout {}
</style>
