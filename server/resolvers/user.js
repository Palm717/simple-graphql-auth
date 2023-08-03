const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { UserInputError, AuthenticationError } = require("apollo-server");

const User = require("../models/User");

const validateLogin = (username, password) => {
  const errors = {};
  if (username.trim() === "") errors.username = "Username must not be empty";
  if (password === "") errors.password = "Password must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateRegister = (username, password, confirmPassword, email) => {
  const errors = {};
  if (username.trim() === "") errors.username = "Username must not be empty";
  if (email.trim() === "") errors.email = "Email must not be empty";
  if (password === "") errors.password = "Password must not be empty";
  if (password !== confirmPassword)
    errors.confirmPassword = "Passwords must match";

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const getToken = ({ id, username, email }) => {
  return jwt.sign(
    {
      id,
      username,
      email,
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    async LoginUser(_, { username, password }) {
      const { errors, valid } = validateLogin(username, password);
      if (!valid) throw new UserInputError("Error", { errors });

      const user = await User.findOne({ username });
      if (!user) throw new AuthenticationError("user not found ");

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new AuthenticationError("password does not match");

      const token = getToken(user);
      return {
        id: user._id,
        ...user._doc,
        token,
      };
    },

    async RegisterUser(_, { user }) {
      let { username, password, confirmPassword, email } = user;
      const { errors, valid } = validateRegister(
        username,
        password,
        confirmPassword,
        email
      );
      if (!valid) throw new UserInputError("Error", { errors });

      const existingUser = await User.findOne({ username });
      if (existingUser) throw new UserInputError("This username is taken");

      password = await bcrypt.hash(password, 10); // hashing the password
      const newUser = new User({
        username,
        password,
        email,
        created: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = getToken(res);

      return {
        id: res._id,
        ...res._doc,
        token,
      };
    },
  },
};
