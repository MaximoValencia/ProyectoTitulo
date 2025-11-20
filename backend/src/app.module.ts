import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { Patient } from './patients/patient.entity';
import { Medicine } from './medicines/medicine.entity';
import { Delivery } from './deliveries/delivery.entity';
import { PatientsModule } from './patients/patient.module';
import { MedicinesModule } from './medicines/medicine.module';
import { DeliveriesModule } from './deliveries/deliveries.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'posta_el_ciruelito',
      entities: [User, Patient, Medicine, Delivery],
      synchronize: true,
    }),
    AuthModule,
    PatientsModule,
    MedicinesModule,
    DeliveriesModule,
  ],
})
export class AppModule {}
