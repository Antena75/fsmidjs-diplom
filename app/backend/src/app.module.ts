import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { BooksModule } from './modules/books/books.module';
import { LibrariesModule } from './modules/libraries/libraries.module';
import { RentalsModule } from './modules/rentals/rentals.module';
import { SocketModule } from './modules/socket/socket.module';
import { SupportModule } from './modules/support/support.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  User } from './modules/users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: parseInt(config.get('POSTGRES_PORT')),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DATABASE'),
        entities: [User],
        synchronize: true,
      }),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    UsersModule,
    AuthModule,
    LibrariesModule,
    BooksModule,
    RentalsModule,
    SupportModule,
    SocketModule,
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 200,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
