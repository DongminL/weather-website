import '@/styles/global.css';
import { ApolloProvider } from '@apollo/client';
import client from '@/graphql/apolloClient';

export default function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <div className="appLayout">
                <Component {...pageProps} />
            </div>
        </ApolloProvider>
    );
}