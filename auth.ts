const jwtCheck = auth({
  audience: "lasu-food-app-api",
  issuerBaseURL: "https://dev-tq0warqv07u7whhn.us.auth0.com/",
  tokenSigningAlg: "RS256",
});
