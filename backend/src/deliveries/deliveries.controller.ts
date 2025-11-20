import { Controller, Get, Post, Body } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private del: DeliveriesService) {}

  @Get()
  findAll() {
    return this.del.findAll();
  }

  @Post()
  create(@Body() body: { patientId: number; medicineId: number; cantidad: number }) {
    return this.del.create(body);
  }
}
