export default `
query User($domain: String, $externalId: String, $username: String) {
  user(domain: $domain, externalId: $externalId, username: $username)
}`;
