import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  lote: string;

  @Column({ type: 'date' })
  vencimiento: string;

  @Column({ type: 'int', default: 0 })
  stock_actual: number;

  @Column({ type: 'int', default: 0 })
  stock_minimo: number;
}