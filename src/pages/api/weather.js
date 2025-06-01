import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "@/features/weather/graphql/schema";
import { resolvers } from "@/features/weather/graphql/resolver";

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handler(req, res) {
    await server.start();
    return server.createHandler({ path: "/api/weather" })(req, res);
}