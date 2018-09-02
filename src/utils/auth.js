export function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.jwt) {
    return {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOTg1ZDA4YmItNzU5OS00MWM5LTg1MTctMWU2NDYwYmJjMjdhIn0.AeIXUz-KOhdsKCeHxVd1C35L5pF-lznQ8l3IvnzDPNM`,
      Accept: 'application/vnd.api+json',
    };
  }
  return {};
}
