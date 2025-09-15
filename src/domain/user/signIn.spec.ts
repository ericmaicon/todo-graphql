import signIn from './signIn';
import * as userData from '@/data/user';

jest.mock('@/data/user');

describe('signIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw if user does not exist', async () => {
    (userData.getOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(signIn('username', 'password')).rejects.toThrow('User not found.');
  });

  it('should throw if password does not match', async () => {
    await expect(signIn('username', 'password2')).rejects.toThrow('Invalid Credentials.');
  });

  it('should return access token and refresh token', async () => {
    const response = await signIn('username', 'password');
    expect(response.accessToken.length).toBe(137);
    expect(response.refreshToken.length).toBe(137);
  });
});
