const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
const User = require("../models/User");
const Todo = require("../models/Todo");
const SECRET = process.env.SECRET;

const getUser = async (auth) => {
  if (!auth) throw new AuthenticationError("you must be logged in!");
  const token = auth.split("Bearer ")[1];
  if (!token) throw new AuthenticationError("you should provide a token!");
  const user = await jwt.verify(token, SECRET, (err, decoded) => {
    if (err) throw new AuthenticationError("invalid token!");
    return decoded;
  });
  return user;
};

module.exports = {
  Mutation: {
    async createTodo(_, { text }, { auth }) {
      const user = await getUser(auth);
      const newTodo = new Todo({
        user: user.id,
        username: user.username,
        text,
        created: new Date().toISOString(),
      });
      const todo = await newTodo.save();
      return todo;
    },

    async deleteTodo(_, { todoId }, { auth }) {
      const user = await getUser(auth);
      const todo = await Todo.findById(todoId);
      if (todo && todo.username === user.username) {
        await todo.delete();
      } else {
        throw new AuthenticationError(
          `you're not allowed to delete this todo!!`
        );
      }
      return "Todo deleted!";
    },
  },
};
