import { EmployeeEntity } from 'src/employee/employee.entity/employee.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class BooksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  store_id: number;

  @Column({ type: 'bigint' })
  start: string;

  @Column({ width: 11 })
  idEmployee: number;

  @Column({ width: 11 })
  idCustomer: number;

  @Column({ type: 'longtext', nullable: false })
  listService: string;

  @Column({ width: 11 })
  amount: number;

  @Column({ default: 1 })
  status: number;

  @Column({ type: 'bigint' })
  createAt: string;

  @Column({ type: 'bigint' })
  updateAt: string;
  
  @OneToOne((idEmployee) => EmployeeEntity, employee => employee.id)
 
  @JoinColumn({ name: 'name' })
  employee: EmployeeEntity;
}
