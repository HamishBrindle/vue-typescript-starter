<template>
  <div class="notifications-icon__wrapper">
    <div class="notifications-icon">
      <!-- Notifications Icon -->
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
            <v-badge
              color="accent"
              overlap
              content="4"
            >
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card
          class="mx-auto"
          max-width="400"
          tile
        >
          <v-list
            three-line
            flat
            avatar
          >
            <v-subheader>Notifications</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-avatar>
                  <v-img :src="item.avatar" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="item.title" />
                  <v-list-item-subtitle v-html="item.subtitle" />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

/**
 * TODO: Example items until this component is fleshed out
 */
const exampleItems = [
  {
    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    title: 'Order needs Approval',
    subtitle: '<span class=\'text--primary\'>Ali Connors</span> &mdash; We need to get another set of eyes on this PPE order',
  }, {
    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    title: 'Masks Discussion <span class="grey--text text--lighten-1">4</span>',
    subtitle: '<span class=\'text--primary\'>to Alex, Scott, Jennifer</span> &mdash; How about we just contact them ahead of time??',
  }, {
    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    title: 'Order Approved',
    subtitle: '<span class=\'text--primary\'>SYSTEM</span> &mdash; Order #1846288 has been approved',
  }, {
    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    title: 'Inventory Question',
    subtitle: '<span class=\'text--primary\'>Trevor Hansen</span> &mdash; Have any ideas about when those changes will take effect?',
  },
];

@Component({
  name: 'NotificationsIcon',
})
export default class NotificationsIcon extends Vue {
  @Prop({ required: false, default: () => exampleItems })
  private readonly items!: any[];
}
</script>

<style lang="scss">
// .notifications-icon {}
</style>
