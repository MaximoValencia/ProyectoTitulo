import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicine } from './medicine.entity';

@Injectable()
export class MedicinesService {
  constructor(
    @InjectRepository(Medicine)
    private repo: Repository<Medicine>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(dto: Partial<Medicine>) {
    const med = this.repo.create(dto);
    return this.repo.save(med);
  }
}
