
import { Entity, Column, PrimaryGeneratedColumn, Long } from 'typeorm';

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 150 })
    fullName:string;

    @Column('date') 
    birthday:Long;

    @Column() 
    isActive:boolean;
}