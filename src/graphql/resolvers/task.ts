import * as taskDomain from '@/domain/task';
import { MutationCreateTaskArgs, MutationUpdateTaskArgs } from '../generated-types';
import { TODOContext } from '../context';

export default {
  Mutation: {
    createTask: async (_: undefined, { input }: MutationCreateTaskArgs, context: TODOContext) => {
      return taskDomain.createTask(context.userId!, input);
    },
    updateTask: async (_: undefined, { id, input }: MutationUpdateTaskArgs) => {
      return taskDomain.updateTask(parseInt(id), input);
    },
  },
};
