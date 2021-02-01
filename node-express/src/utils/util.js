const crypto = require("crypto");
const properties = require("../config/properties-config");
const fetch = require("node-fetch");

const hash = (string) => {
  const hmac = crypto.createHmac(
    "sha256",
    process.env.HASH_SECRET || "test-secret"
  );
  hmac.update(string);
  return hmac.digest("hex");
};

const executeGraphql = async (variables, reqHeaders, query) => {
  const fetchResponse = await fetch(properties.GRAPHQL_URL, {
    method: "POST",
    headers: reqHeaders || {},
    body: JSON.stringify({
      query: query,
      variables,
    }),
  });
  return await fetchResponse.json();
};

module.exports = {
  hash,
  executeGraphql,
};
