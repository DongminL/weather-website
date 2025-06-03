import { mergeResolvers } from '@graphql-tools/merge';
import { weatherResolver } from "@/features/weather/controller/weatherResolver";

const resolvers = mergeResolvers([
    weatherResolver
]);

export default resolvers;