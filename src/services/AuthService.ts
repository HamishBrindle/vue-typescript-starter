import {
  Collection, Collections, Item, Query,
} from '@vuex-orm/core';
import {
  Create, Insert, InsertOrUpdate, UpdateObject,
} from '@vuex-orm/core/lib/modules/payloads/Actions';
import { AbilityMap } from '@/lib/types';
import { AppAbility } from '@/lib/AppAbility';
import { Auth } from '@/models/Auth';
import { ModelService } from '@/services/ModelService';
import { User } from '@/models/User';
import ability from '@/models/functions/ability';

export class AuthService extends ModelService<Auth> {
  /**
   * App abilities
   */
  private ability: AbilityMap = new AppAbility();

  /**
   * Model to be serviced
   */
  protected model = Auth;

  /**
   * API path
   */
  protected path = '/auth';

  /**
   * Cached instance of the service
   */
  private static instance: AuthService | null = null;

  /**
   * Get an instance of the UserService
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new AuthService();
      return this.instance;
    }
    return this.instance;
  }

  /**
   * Update the abilities available to a User that can be checked
   * throughout the application.
   * @param user
   */
  public defineAbility(): AbilityMap {
    if (!this.ability) {
      this.ability = ability();
      return this.ability;
    }
    const { rules } = ability();
    this.ability.update(rules);
    return this.ability;
  }

  public create(payload: Create): Promise<Collections> {
    return this.model.create(payload);
  }

  public update(payload: UpdateObject): Promise<Collections> {
    return this.model.update(payload);
  }

  public insert(payload: Insert): Promise<Collections> {
    return this.model.insert(payload);
  }

  public insertOrUpdate(payload: InsertOrUpdate): Promise<Collections> {
    return this.model.insertOrUpdate(payload);
  }

  public find(options: string | number | (string | number)[]): Item<Auth> {
    return this.model.find(options);
  }

  public findIn(options: (string | number | (string | number)[])[]): Collection<Auth> {
    return this.model.findIn(options);
  }

  public query(): Query<Auth> {
    return this.model.query();
  }

  public all(): Collection<Auth> {
    return this.model.all();
  }

  /**
   * Get the active Auth
   */
  public getActive(): Item<Auth> {
    return this.model.getActive();
  }

  /**
   * Set the active Auth
   */
  public setActive(record: Auth | string | number | null): Item<Auth> {
    return this.model.setActive(record);
  }

  /**
   * Get app abilities object
   */
  public getAbility(): AbilityMap {
    return this.ability;
  }

  /**
   * Set app abilities object
   * @param value
   */
  public setAbility(value: AbilityMap) {
    this.ability = value;
  }

  /**
   * Login as a User to the API and recieve user/auth data
   */
  public async login(email: string /* password: string */): Promise<Item<User>> {
    await User.create({
      data: {
        id: '123',
        email,
        name: 'Young & Shameless',
        created_at: new Date().toUTCString(),
        updated_at: new Date().toUTCString(),
        avatar: 'https://i1.sndcdn.com/avatars-000249162379-ohg77t-t500x500.jpg',
        roles: ['ADMIN'],
        auth: {
          user_id: '123',
          authenticationToken: 'abc123',
        },
      },
    });

    const user = User.query().whereId('123').with('auth').first();

    return this.setActiveUser(user as any);
  }

  /**
   * Logout of the application and remove User and Auth
   * data
   */
  public async logout(): Promise<void> {
    await User.deleteAll();
    await Auth.deleteAll();
    this.setActive(null);
  }

  public get api() {
    return {
      /**
       * Sign in with an existing user's credentials
       */
      login: async (args: any) => {
        const { data } = await this.apiService.post(`${this.path}/sign_in`, args);
        return AuthService.getAuthorizedUserData(data);
      },
    };
  }

  /**
   * Returns User with valid Auth
   * @param user user data
   */
  private static getAuthorizedUserData(user: User): User {
    return user;
  }

  /**
   * Creates User and sets active User/Auth
   * @param userData authorized user data
   */
  private async setActiveUser(userData: Record<string, any>): Promise<User> {
    const user = new User(userData);

    await User.insert({ data: user });

    User.active = user.id;
    Auth.active = user.auth;

    if (!user.auth) {
      throw Error('Invalid (or undefined) Auth object associated with User');
    }

    this.defineAbility();

    return user;
  }
}

export default AuthService;
