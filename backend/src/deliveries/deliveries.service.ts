import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from './delivery.entity';
import { Patient } from '../patients/patient.entity';
import { Medicine } from '../medicines/medicine.entity';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery) private delRepo: Repository<Delivery>,
    @InjectRepository(Patient) private patRepo: Repository<Patient>,
    @InjectRepository(Medicine) private medRepo: Repository<Medicine>,
  ) {}

  async create(dto: { patientId: number; medicineId: number; cantidad: number }) {
    const patient = await this.patRepo.findOne({ where: { id: dto.patientId } });
    const medicine = await this.medRepo.findOne({ where: { id: dto.medicineId } });

    if (!patient || !medicine) throw new BadRequestException('Datos inválidos');

    if (medicine.stock_actual < dto.cantidad) {
      throw new BadRequestException('Stock insuficiente');
    }

    medicine.stock_actual -= dto.cantidad;
    await this.medRepo.save(medicine);

    const delivery = this.delRepo.create({
      patient,
      medicine,
      cantidad: dto.cantidad,
    });
    return this.delRepo.save(delivery);
  }

  findAll() {
    return this.delRepo.find();
  }
}
