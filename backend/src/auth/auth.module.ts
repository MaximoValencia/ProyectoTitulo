import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      // Se usa un valor por defecto si no existe la variable de entorno
      secret: process.env.JWT_SECRET || 'supersecreto',
      signOptions: {
        // ✅ Esta línea es la que corrige tu error
        expiresIn: (process.env.JWT_EXPIRES as any) || '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
