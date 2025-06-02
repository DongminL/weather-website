import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';

const localLink = new HttpLink({ 
    uri: "/api/graphql",
});

const routingLink = ApolloLink.split(
    (operation) => operation.getContext().clientName === 'local',
    localLink,
);

const client = new ApolloClient({
    link: routingLink,
    cache: new InMemoryCache(),
});

export default client;