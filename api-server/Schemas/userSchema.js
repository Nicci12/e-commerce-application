
  const signUpSchema = {
    type: "object",
    properties: {
      name: {type: "string"},
      email: {type: "string"},
      password: {type: "string", minLength: 2},
      repassword: {type: "string", minLength: 2}

    },
    required: ["email"],
    additionalProperties: false
  }


  const loginSchema = {
    type: "object",
    properties: {
      email: {type: "string"},
      password: {type: "string", minLength: 2},

    },
    required: ["email", "password"],
    additionalProperties: false

  }


  module.exports = {signUpSchema, loginSchema}