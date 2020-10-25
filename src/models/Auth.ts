import { BaseModel } from '@/models/BaseModel';
import { AttrField, OrmModel, PrimaryKey } from 'vuex-orm-decorators';

@OrmModel('auths')
export class Auth extends BaseModel {
  /**
   * Model name (used for CASL subject detection)
   */
  static get modelName() {
    return 'Auth';
  }

  /**
   * Token required for this User to communicate with
   * the server. Must be sent in with practically every
   * request to the backend.
  */
  @PrimaryKey()
  @AttrField(undefined)
  public authenticationToken!: string;

  /**
   * User's ID.
   */
  @AttrField(undefined)
  public userId!: string;

  /**
   * Permissions attached to this User and their roles.
   */
  @AttrField({})
  public permissions!: any;
}

export default Auth;
