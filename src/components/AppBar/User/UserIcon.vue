<template>
  <div class="user-icon__wrapper">
    <div class="user-icon">
      <v-menu
        bottom
        left
      >
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            icon
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-subheader>Account Options</v-subheader>
            <v-list-item>
              <v-list-item-avatar>
                <v-img
                  v-if="user.avatar"
                  :src="user.avatar"
                />
                <v-icon
                  v-else
                  x-large
                >
                  mdi-account
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ user.name || '??' }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.email || '??' }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-avatar />

              <v-list-item-content>
                <v-list-item-title>Roles</v-list-item-title>
                <v-list-item-subtitle>{{ roles }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              v-for="item in items"
              :key="item.label"
              :color="item.color"
              text
              @click="onMenuOptionClick(item.action)"
            >
              {{ item.title }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { UserService } from '@/services/UserService';
import { User } from '@/models/User';
import { Utilities } from '@/tools/Utilities';

const exampleItems = [
  {
    title: 'Settings',
    action: 'user-settings',
    color: 'primary',
  },
  {
    title: 'Logout',
    action: 'user-logout',
    color: 'red',
  },
];

@Component({
  name: 'UserIcon',
})
export default class UserIcon extends Vue {
  @Prop({ required: false, default: () => exampleItems })
  private readonly items!: any[];

  private readonly userService: UserService = UserService.getInstance();

  private readonly user: User | null = this.userService.getActive();

  created() {
    if (!this.user) throw Error('Unable to find an active User');
  }

  private get roles() {
    const roles = this.user?.roles;
    if (!roles) throw Error('No roles available for this User');
    return (roles.length > 1)
      ? this.user?.roles.map((role) => Utilities.titleCase(role)).join(', ')
      : Utilities.titleCase(roles[0]);
  }

  /**
   * On click of menu option
   */
  private onMenuOptionClick(option: string) {
    switch (option) {
      case 'user-settings': {
        const currentRoute = this.$route.name;
        if (currentRoute !== 'settings') {
          this.$router.push({ name: 'settings' });
        }
        break;
      }
      case 'user-logout': {
        this.$router.push({ name: 'logout' });
        break;
      }
      default: {
        break;
      }
    }
  }
}
</script>

<style lang="scss">
// .user-icon {}
</style>
