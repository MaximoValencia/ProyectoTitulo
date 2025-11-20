import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PatientsService } from './patients.services';

@Controller('patients')
export class PatientsController {
  constructor(private pats: PatientsService) {}

  @Get()
  find(@Query('rut') rut?: string) {
    if (rut) return this.pats.findByRut(rut);
    return this.pats.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.pats.create(body);
  }
}
