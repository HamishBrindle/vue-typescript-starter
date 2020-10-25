import { User } from '@/models/User';
import { Ability } from '@casl/ability';

type CrudAbilityActions = 'create' | 'read' | 'update' | 'destroy';

export type UserAbilities = [
  | 'manage'
  | CrudAbilityActions,
  User | typeof User
];

export type AppAbilities =
  | UserAbilities;

export type AbilityMap = Ability<AppAbilities>;
