import { Controller, Get, Post, Body } from '@nestjs/common';
import { MedicinesService } from './medicine.service';

@Controller('medicines')
export class MedicinesController {
  constructor(private meds: MedicinesService) {}

  @Get()
  findAll() {
    return this.meds.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.meds.create(body);
  }
}
