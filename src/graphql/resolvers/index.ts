import auth from './auth';
import task from './task';

export default {
  Query: {
    ...task.Query,
  },
  Mutation: {
    ...auth.Mutation,
    ...task.Mutation,
  },
};
