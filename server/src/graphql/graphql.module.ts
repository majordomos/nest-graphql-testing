import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: './schema.gql',
            driver: ApolloDriver,
            debug: true,
            playground: true,
        }),
    ],
})
export class GraphqlModule {}
