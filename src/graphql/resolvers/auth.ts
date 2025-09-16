import * as userDomain from '@/domain/user';
import { MutationSignInArgs } from '../generated-types';

export default {
  Mutation: {
    signIn: async (_: undefined, { input }: MutationSignInArgs) => {
      const { username, password } = input;
      const { accessToken } = await userDomain.signIn(username, password);

      // TODO: setup refreshToken in the cookie

      return { accessToken };
    },
  },
};
