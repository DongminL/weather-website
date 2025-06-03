import { mergeTypeDefs } from '@graphql-tools/merge';
import { weatherTypeDefs } from "@/features/weather/schema/weatherSchema";

const typeDefs = mergeTypeDefs([
    weatherTypeDefs
]);

export default typeDefs;