import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleController } from './example/example.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
// Modules
import { DatasetModule } from './dataset/dataset.module';
import { Dataset } from './dataset/entities/dataset.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      entities: [Dataset],
      synchronize: true,
      logging: true,
    }),
    DatasetModule,
  ],
  controllers: [AppController, ExampleController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
