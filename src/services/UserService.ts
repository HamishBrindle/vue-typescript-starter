import {
  Create, UpdateObject, Insert, InsertOrUpdate,
} from '@vuex-orm/core/lib/modules/payloads/Actions';
import {
  Collection, Query, Collections, Item,
} from '@vuex-orm/core';
import { User } from '@/models/User';
import { ModelService } from './ModelService';
import { AuthService } from './AuthService';

export class UserService extends ModelService<User> {
  protected model = User;

  protected path = '/users';

  /**
   * Cached instance of the service
   */
  private static instance: UserService | null = null;

  private readonly authService: AuthService = AuthService.getInstance();

  /**
   * Get an instance of the UserService
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new UserService();
      return this.instance;
    }
    return this.instance;
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

  public find(options: string | number | (string | number)[]): Item<User> {
    return this.model.find(options);
  }

  public findIn(options: (string | number | (string | number)[])[]): Collection<User> {
    return this.model.findIn(options);
  }

  public query(): Query<User> {
    return this.model.query();
  }

  public all(): Collection<User> {
    return this.model.all();
  }

  /**
   * Get the active User
   */
  public getActive(): User {
    const activeUser = this.model
      .query()
      .with('auth')
      .whereId(User.active)
      .first();

    if (!activeUser) throw Error('Cannot retrieve the active User - this may be a problem with state.');

    return activeUser;
  }

  /**
   * Get the active User
   */
  public getActiveToken(): string {
    const activeUser = this.getActive();
    if (!activeUser) {
      throw Error('Unable to get an authentication token. No current User found');
    }
    return activeUser?.authenticationToken;
  }

  /**
   * Set the active User
   */
  public setActive(record: User | string | number | null): Item<User> {
    return this.model.setActive(record);
  }

  /**
   * Get this User's associated Auth record or return null if not found
   * @param user
   */
  public getAuth(user: User) {
    return this.authService
      .query()
      .where('user_id', user.id)
      .first();
  }

  public get api() {
    return {
      /**
       * Find a list of Users on the server via GET request
       */
      find: async (args: any) => this.apiService.get(this.path, args),

      /**
       * Create a Customer on the server via POST request
       */
      create: async () => {
        throw Error('This method has no implementation yet');
      },

      /**
       * Find one Customer on the server via GET request
       */
      findOne: async () => {
        throw Error('This method has no implementation yet');
      },

      /**
       * Update an existing Customer on the server via PUT request
       */
      update: async () => {
        throw Error('This method has no implementation yet');
      },

      /**
       * Delete an existing Customer on the server via DELETE request
       */
      destroy: async () => {
        throw Error('This method has no implementation yet');
      },
    };
  }
}

export default UserService;
