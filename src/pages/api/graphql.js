import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolver";

export const config = {
    api: {
        bodyParser: false,
    },
};

let apolloServer = null;
let apolloHandler = null;

export default async function handler(request, response) {
    if (!apolloServer) {
        apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
        });

        await apolloServer.start();
        apolloHandler = apolloServer.createHandler({ path: "/api/graphql" });
    }

    return apolloHandler(request, response);
}