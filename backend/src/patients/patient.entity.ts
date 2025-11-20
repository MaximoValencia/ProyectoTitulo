import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rut: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  diagnostico: string;

  @Column({ nullable: true })
  telefono: string;
}