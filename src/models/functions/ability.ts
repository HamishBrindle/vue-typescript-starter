import { AbilityMap } from '@/lib/types';
import { User } from '@/models/User';
import { defineAbility as caslDefineAbility } from '@casl/ability';

/**
 * Define a User's abilities via their roles on the Auth
 * object
 * @param auth
 */
export default function ability() {
  return caslDefineAbility<AbilityMap>((can) => {
    can('create', User);
    can('read', User);
    can('update', User);
    can('destroy', User);
  });
}
