const query = `
mutation signIn($input: SignInDAO!) {
  signIn(input: $input) {
    accessToken
  }
}`;

export default async function getAccessToken(
  request,
  username = 'username',
  password = 'password',
): Promise<string> {
  const req = await request.post('/graphql', {
    data: {
      query,
      variables: {
        input: {
          username,
          password,
        },
      },
    },
  });

  const response = await req.json();
  return response.data.signIn.accessToken;
}
