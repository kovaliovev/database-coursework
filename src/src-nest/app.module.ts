import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProjectModule } from './project/project.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
		ConfigModule.forRoot({
				isGlobal: true,
			}), 
		PrismaModule, 
		ProjectModule
	],
})
export class AppModule {}