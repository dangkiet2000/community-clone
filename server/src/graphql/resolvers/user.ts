import { User } from "@prisma/client";
import { GraphQLContext } from "../../utils/types";
import { GraphQLError } from "graphql";
const resolvers = {
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ) => {
      const { username } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: "Not authorized",
        };
      }

      const { id: userId } = session.user;

      try {
        // Check username is not taken
        const existingUser = await prisma.user.findUnique({
          where: {
            username: username,
          },
        });

        if (existingUser) {
          return {
            error: "That username is taken. Try another one",
          };
        }

        // Update username for user
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username,
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("createUsername error", error);
        return {
          error: error?.message,
        };
      }
    },
  },

  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<Array<User>> => {
      const { session, prisma } = context;
      const { username: searchedUsername } = args;

      if (!session?.user) {
        throw new GraphQLError("You are not authorized to perform this action");
      }

      const {
        user: { username: myUsername },
      } = session;

      const users = await prisma.user.findMany({
        where: {
          username: {
            contains: searchedUsername,
            not: myUsername, // Make results not contain current username
            mode: "insensitive", // Making result not capslock or not.
          },
        },
      });

      return users;
    },
  },
};

export default resolvers;
