import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { name, email, gender } = args;
            const exists = await prisma.$exists.user(email);
            if (exists) {
                throw Error("이미 존재하는 계정입니다.");
            }
            await prisma.createUser({
                name,
                email,
                gender,
            });
            return true;
        },
    },
};