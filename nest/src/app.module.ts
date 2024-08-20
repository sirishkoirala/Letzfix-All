import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SmartPhonesModule } from './modules/smartphone/smartphones.module';
import { DevicesModule } from './modules/devices/devices.module';
import { PhoneModelModule } from './modules/phone-models/phone-models.module';
import { PhonesModule } from './modules/phones/phones.module';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  // imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UsersModule,SmartPhoneModule],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'qwerty',
      database: 'letzfix',
      autoLoadModels: true,
      synchronize: true,
    }),
    DevicesModule,
    SmartPhonesModule,
    UsersModule,
    PhoneModelModule,
    PhonesModule,
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
