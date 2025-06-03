import { ApolloServer } from "apollo-server-micro";
import typeDefs from "@/graphql/schema";
import resolvers from "@/graphql/resolver";

export const config = {
    api: {
        bodyParser: false,
    },
};

let apolloHandler;

async function createApolloHandler() {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await apolloServer.start();
    return apolloServer.createHandler({ path: "/api/graphql" });
}

export default async function handler(req, res) {
    if (!apolloHandler) {
        apolloHandler = createApolloHandler();
    }

    const handler = await apolloHandler;
    return handler(req, res);
}