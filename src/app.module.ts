import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'faizan', // Adjust credentials as needed
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Caution: only for development (may lead to data loss)
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
