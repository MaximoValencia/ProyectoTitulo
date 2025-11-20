import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwt: JwtService,
  ) {}

  async register(username: string, password: string, role: string) {
    const existing = await this.usersRepo.findOne({ where: { username } });
    if (existing) {
      throw new BadRequestException('El usuario ya existe');
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ username, password: hashed, role });
    await this.usersRepo.save(user);
    return { message: 'Usuario creado' };
  }

  async login(username: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, username: user.username, role: user.role };
    const access_token = await this.jwt.signAsync(payload);

    return { access_token };
  }
}
