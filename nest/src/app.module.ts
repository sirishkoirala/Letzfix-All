import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { DevicesModule } from './modules/devices/devices.module';
import { CustomersModule } from './modules/customers/customers.module';
import { DeviceModelsModule } from './modules/device-models/device-models.module';
import { FaultsModule } from './modules/faults/faults.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { DeviceBrandsModule } from './modules/device-brands/device-brands.module';
import { StoresModule } from './modules/stores/stores.module';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoiceItemsModule } from './invoice-items/invoice-items.module';

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
    }),
    // UsersModule,
    StoresModule,
    CustomersModule,
    DevicesModule,
    DeviceBrandsModule,
    DeviceModelsModule,
    FaultsModule,
    AppointmentsModule,
    InvoicesModule,
    InvoiceItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
