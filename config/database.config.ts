import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'pos_db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
};
