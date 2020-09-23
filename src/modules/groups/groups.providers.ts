import { Group } from './group.entity';
import { GROUP_REPOSITORY } from '../../core/constants';

export const groupsProviders = [
  {
    provide: GROUP_REPOSITORY,
    useValue: Group,
  },
];
