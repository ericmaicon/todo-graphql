import auth from './auth';
import task from './task';

export default {
  Mutation: {
    ...auth.Mutation,
    ...task.Mutation,
  },
};
