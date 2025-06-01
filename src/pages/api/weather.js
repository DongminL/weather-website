import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "@/features/weather/graphql/schema";
import { resolvers } from "@/features/weather/graphql/resolver";

export const config = {
    api: {
        bodyParser: false,
    },
};

let apolloServer = null;
let apolloHandler = null;

export default async function handler(req, res) {
    if (!apolloServer) {
        apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
        });

        await apolloServer.start();
        apolloHandler = apolloServer.createHandler({ path: "/api/weather" });
    }

    return apolloHandler(req, res);
}