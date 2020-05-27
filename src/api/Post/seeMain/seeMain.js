import {prisma} from "../../../../generated/prisma-client";

export default {
  Query: {
    seeMain: async (_, args) => {
      const posts = await prisma.posts({
        orderBy: "createdAt_DESC",
        first: 30,
      });

      return posts;
    },
  },
};
