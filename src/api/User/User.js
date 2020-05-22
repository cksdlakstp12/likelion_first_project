import { prisma } from "../../../../generated/prisma-client";

export default {
    User: {
        posts: ({ id }) => prisma.user({ id }).posts(),
        comments: ({ id }) => prisma.user({ id }).comments(),
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        },
    },
};