export function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.jwt) {
    return {
      Authorization: `Bearer ${user.jwt}`,
      Accept: 'application/vnd.api+json',
    };
  }
  return {};
}
