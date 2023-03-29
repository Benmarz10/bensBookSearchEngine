const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // users: async () => {
    //   return User.find();
    // },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Password");
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { userId, body }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
    },

    deleteBook: async (parent, { userId, body }) => {
      return User.findOneAndDelete(
        { _id: userId },
        { $pull: { savedBooks: body } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
