<template>
  <div class="table-actions__wrapper">
    <div class="table-actions">
      <!-- View a record in a different view -->
      <template v-if="view && canRead()">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              color="accent"
              text
              fab
              small
              v-on="on"
              @click="view(record)"
            >
              <v-icon>mdi-eye-outline</v-icon>
            </v-btn>
          </template>
          <span>View</span>
        </v-tooltip>
      </template>

      <!-- Edit a record in a different view -->
      <template v-if="edit && canUpdate(record)">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              color="blue"
              text
              fab
              small
              v-on="on"
              @click="edit(record)"
            >
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>
      </template>

      <!-- Approve status of record -->
      <template v-if="approve && canUpdateStatus(record)">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              color="green"
              text
              fab
              small
              v-on="on"
              @click="approve(record)"
            >
              <v-icon>mdi-clipboard-check-outline</v-icon>
            </v-btn>
          </template>
          <span>Approve</span>
        </v-tooltip>
      </template>

      <!-- Deny status of record -->
      <template v-if="deny && canUpdateStatus(record)">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              color="red"
              text
              fab
              small
              v-on="on"
              @click="deny(record)"
            >
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
          </template>
          <span>Deny</span>
        </v-tooltip>
      </template>

      <template>
        <slot />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { BaseModel } from '@/models/BaseModel';

@Component({
  name: 'TableRowActions',
})
export default class TableRowActions<T extends BaseModel> extends Vue {
  /**
   * A record as a data table row
   */
  @Prop({ required: true })
  private readonly record!: BaseModel;

  /**
   * Callback for when `edit` button is clicked
   */
  @Prop({ default: false })
  private readonly view!: ((record: T) => Promise<any>) | false;

  /**
   * Callback for when `edit` button is clicked
   */
  @Prop({ default: false })
  private readonly edit!: ((record: T) => Promise<any>) | false;

  /**
   * Callback for when `approve` button is clicked
   */
  @Prop({ default: false })
  private readonly approve!: ((record: T) => Promise<any>) | false;

  /**
   * Callback for when `deny` button is clicked
   */
  @Prop({ default: false })
  private readonly deny!: ((record: T) => Promise<any>) | false;

  /**
   * Callback to check for view permission on the model instance
   */
  @Prop({ required: true })
  private readonly canRead!: () => boolean;

  /**
   * Callback to check for edit permission on the model instance
   */
  @Prop({ required: true })
  private readonly canUpdate!: (record: T) => boolean;

  /**
   * Callback to check for approval permission on the model instance
   */
  @Prop({ required: true })
  private readonly canUpdateStatus!: (record: T) => boolean;
}
</script>

<style lang="scss">
</style>
