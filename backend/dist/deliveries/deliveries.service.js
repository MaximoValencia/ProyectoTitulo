"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const delivery_entity_1 = require("./delivery.entity");
const patient_entity_1 = require("../patients/patient.entity");
const medicine_entity_1 = require("../medicines/medicine.entity");
let DeliveriesService = class DeliveriesService {
    constructor(delRepo, patRepo, medRepo) {
        this.delRepo = delRepo;
        this.patRepo = patRepo;
        this.medRepo = medRepo;
    }
    async create(dto) {
        const patient = await this.patRepo.findOne({ where: { id: dto.patientId } });
        const medicine = await this.medRepo.findOne({ where: { id: dto.medicineId } });
        if (!patient || !medicine)
            throw new common_1.BadRequestException('Datos inválidos');
        if (medicine.stock_actual < dto.cantidad) {
            throw new common_1.BadRequestException('Stock insuficiente');
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
};
exports.DeliveriesService = DeliveriesService;
exports.DeliveriesService = DeliveriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(delivery_entity_1.Delivery)),
    __param(1, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __param(2, (0, typeorm_1.InjectRepository)(medicine_entity_1.Medicine)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DeliveriesService);
//# sourceMappingURL=deliveries.service.js.map