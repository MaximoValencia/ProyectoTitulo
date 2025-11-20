import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private repo: Repository<Patient>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findByRut(rut: string) {
    return this.repo.findOne({ where: { rut } });
  }

  create(dto: Partial<Patient>) {
    const patient = this.repo.create(dto);
    return this.repo.save(patient);
  }
}
