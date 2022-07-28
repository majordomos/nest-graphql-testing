import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
@Module({
    imports: [
        NestConfigModule.forRoot({
            envFilePath: ['.env'],
            expandVariables: true,
            isGlobal: true,
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: './schema.gql',
            driver: ApolloDriver,
            debug: true,
            playground: true,
        }), 
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URL'),
                dbName: configService.get<string>('MONGODB_DATABASE'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class ConfigModule { }
