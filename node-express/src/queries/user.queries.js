const signupQuery = `
mutation ($name: String!, $username: String!, $password: String!) {
  insert_users_one(object: {
    name: $name,
    username: $username,
    password: $password
  }) {
    id
  }
}
`;

const loginQuery = `
query ($username: String!, $password: String!) {
  users(where: {
      password: {_eq: $password}, 
      username: {_eq: $username}}
  ) {
    id
  }
}
`;

const deleteQuery = `
mutation ($username: String!) {
    delete_users(where: {username: {_eq: $username}}
  ) {
    affected_rows
    returning {
        username
        id
      }
  }
}
`;
module.exports = {
  signupQuery,
  loginQuery,
  deleteQuery,
};
