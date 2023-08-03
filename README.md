# GraphQL User Registration API

This API allows you to register new users, using GraphQL, Node.js, MongoDB, and bcrypt for password hashing.

## Setup

To install this project, you'll need Node.js and npm installed on your machine.

clone this repository:
\`\`\`
git clone <repo-url>
\`\`\`



## Usage

To register a new user, use the `RegisterUser` mutation. Here's an example:

\`\`\`graphql
mutation RegisterUser($user: RegisterInput!) {
  RegisterUser(registerInput: $user) {
    id
    username
    email
    token
  }
}
\`\`\`

With variables:

\`\`\`json
{
  "user": {
    "username": "myusername",
    "password": "mypassword",
    "confirmPassword": "mypassword",
    "email": "myemail@example.com"
  }
}
\`\`\`

In the above mutation, `$user` is an input variable of type `RegisterInput` which must be provided when making the request.

## Error Handling

Errors are thrown in the following scenarios:

1. If the `username` is already taken.
2. If the `password` and `confirmPassword` do not match.
3. If any of the fields are empty.
4. If the email is not a valid email format.

Error messages are returned in the following format:

\`\`\`json
{
  "errors": [
    {
      "message": "<Error Message>",
      "locations": [<Location Data>],
      "path": ["RegisterUser"],
      "extensions": {
        "code": "<Error Code>",
        "exception": {
          "stacktrace": [<Stacktrace Data>]
        }
      }
    }
  ],
  "data": null
}
\`\`\`

## Contact

If you have any questions or run into any issues, please open an issue on this repository.
