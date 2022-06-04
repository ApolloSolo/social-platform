const { User, Thought } = require("../models");

const resolvers = {
  Query: {
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    user: async (parent, { username }) => {
      const params = username ? { username } : {};
      return User.findOne(params)
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
  },
};

//"That's all we need to get this sample code up and running. Nothing to import for the moment,
//just a simple object called resolvers with a Query nested object that holds a series of methods.
//These methods get the same name of the query or mutation they are resolvers for.
//This way, when we use the query helloWorld, this helloWorld() method will execute and return the string "Hello world!"

module.exports = resolvers;
