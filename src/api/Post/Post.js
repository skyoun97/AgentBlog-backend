import {prisma} from "../../../generated/prisma-client";
import {USER_FRAGMENT, COMMENT_FRAGMENT} from "../../fragments";

export default {
  Post: {
    isLiked: (parent, _, {request}) => {
      const {id: postId} = parent;
      const {user} = request;
      if (user === undefined) return false;
      return prisma.$exists.like({
        AND: [{post: {id: postId}}, {user: {id: user.id}}],
      });
    },
    likeCount: (parent, _) => {
      return prisma
        .likesConnection({
          where: {post: {id: parent.id}},
        })
        .aggregate()
        .count();
    },
    commentCount: (parent, _) => {
      return prisma
        .commentsConnection({
          where: {post: {id: parent.id}},
        })
        .aggregate()
        .count();
    },
    hashtags: (parent, _) => {
      return prisma.post({id: parent.id}).hashtags();
    },
    files: (parent, _) => {
      return prisma.post({id: parent.id}).files();
    },
    comments: (parent, _) => {
      return prisma
        .post({id: parent.id})
        .comments({first: 10})
        .$fragment(COMMENT_FRAGMENT);
    },
    user: (parent, _) => {
      return prisma
        .post({id: parent.id})
        .user()
        .$fragment(USER_FRAGMENT);
    },
  },
};
