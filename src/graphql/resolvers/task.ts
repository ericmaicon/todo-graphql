import * as taskDomain from '@/domain/task';
import { MutationCreateTaskArgs, MutationUpdateTaskArgs } from '../generated-types';

export default {
  Mutation: {
    createTask: async (_: undefined, { input }: MutationCreateTaskArgs) => {
      return taskDomain.createTask(1, input);
    },
    updateTask: async (_: undefined, { id, input }: MutationUpdateTaskArgs) => {
      return taskDomain.updateTask(parseInt(id), input);
    },
  },
};
