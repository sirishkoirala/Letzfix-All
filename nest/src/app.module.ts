import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { DevicesModule } from './modules/devices/devices.module';
import { CustomersModule } from './modules/customers/customers.module';
import { DeviceModelsModule } from './modules/device-models/device-models.module';
import { FaultsModule } from './modules/faults/faults.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { DeviceBrandsModule } from './modules/device-brands/device-brands.module';
import { StoresModule } from './modules/stores/stores.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { InvoiceItemsModule } from './modules/invoice-items/invoice-items.module';
import { UsersModule } from './modules/users/users.module';
import { LogzioLoggerService } from './logzio-logger.service';

@Module({
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
      logging: false,
    }),
    StoresModule,
    CustomersModule,
    DevicesModule,
    DeviceBrandsModule,
    DeviceModelsModule,
    FaultsModule,
    AppointmentsModule,
    InvoicesModule,
    InvoiceItemsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, LogzioLoggerService],
})
export class AppModule {}
