const { hash, executeGraphql } = require("../utils/util");
const {
  signupQuery,
  loginQuery,
  deleteQuery,
} = require("../queries/user.queries");
const jwt = require("jsonwebtoken");

class UserService {
  async createUser(name, username, password, headers) {
    let hashedPassword = hash(password);

    const { data, errors } = await executeGraphql(
      { name, username, password: hashedPassword },
      headers,
      signupQuery
    );
    if (errors) {
      throw errors;
    }
    const tokenContents = {
      sub: data.insert_users_one.id.toString(),
      name: name,
      iat: Date.now() / 1000,
      iss: "https://myapp.com/",
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-user-id": data.insert_users_one.id.toString(),
        "x-hasura-default-role": "user",
        "x-hasura-role": "user",
      },
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    };

    const token = jwt.sign(tokenContents, "worldisfullofdevelopers");

    // success
    return {
      ...data.insert_users_one,
      token: token,
    };
  }

  async login(username, password, headers) {
    let hashedPassword = hash(password);

    const { data, errors } = await executeGraphql(
      { username, password: hashedPassword },
      headers,
      loginQuery
    );
    if (errors) {
      throw errors;
    }
    if (data.users && data.users.length > 0) {
      const tokenContents = {
        sub: data.users[0].id.toString(),
        name: username,
        iat: Date.now() / 1000,
        iss: "https://myapp.com/",
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-user-id": data.users[0].id.toString(),
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
        },
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      };

      const token = jwt.sign(tokenContents, "test-secret");
      // success
      return {
        ...data.users[0],
        accessToken: token,
      };
    }
    return null;
  }

  async deleteUser(username, headers) {
    const { data, errors } = await executeGraphql(
      { username },
      headers,
      deleteQuery
    );
    if (errors) {
      throw errors;
    }
    if (data.delete_users && data.delete_users.affected_rows === 1) {
      // success
      return {
        ...data.delete_users.returning[0],
      };
    }
    return null;
  }
}

module.exports = new UserService();
