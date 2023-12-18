import { ForbiddenException, NotFoundException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectCreateDTO, ProjectUpdateDTO } from './project.dto';

const errorCodes = {
	'NOT_UNIQUE_VALUE': 'P2002',
	'NOT_FOUND': 'P2025',
}

@Injectable({})
export class ProjectService{
	constructor(private prisma: PrismaService){}
	
	async create(dto: ProjectCreateDTO){
		try {
			const project = await this.prisma.project.create({
				data: {
					title: dto.title,
        	status: dto.status,
        	startDate: dto.startDate ? new Date(dto.startDate) : null,
        	endDate: dto.endDate ? new Date(dto.endDate) : null,
        	logo: dto.logo,
        	description: dto.description,
				}
			})
			return project;
		} catch(e){
				if (e instanceof PrismaClientKnownRequestError){
					if (e.code === errorCodes['NOT_UNIQUE_VALUE']) {
						throw new ForbiddenException(`Project with ${dto.title} title already exists!`)
					}
				}
			throw e;
		}
	};

	async find(id: number){
		try {		
			const project = await this.prisma.project.findUniqueOrThrow({
				where: {
					id: id,
				}
			})
			return project;
		} catch(e){
				if (e instanceof PrismaClientKnownRequestError){
					if (e.code === errorCodes['NOT_FOUND']) {
						throw new NotFoundException(`Project with id: ${id} is not found!`)
					}
				}
			throw e;
		}
	};

	async findAll(){
		const projects = await this.prisma.project.findMany({})
		return projects;
	};

	async update(id: number, dto: ProjectUpdateDTO){
		await this.find(id);
		try {
			const project = await this.prisma.project.update({
				where: {
        	id: id,
      	},
      	data: {
        	...dto,
        	updatedAt: new Date(),
      	},
			})
			return project;
		} catch(e){
				if (e instanceof PrismaClientKnownRequestError){
					if (e.code === errorCodes['NOT_UNIQUE_VALUE']) {
						throw new ForbiddenException(`Project with ${dto.title} title already exists!`)
					}
				}
			throw e;
		}
	};

	async delete(id: number){
		try {
			const project = await this.find(id);
			await this.prisma.project.delete({
				where: {
					id: id
				}
			})
			return `Project was deleted:\n${JSON.stringify(project)}`
		} catch(e){
				if (e instanceof PrismaClientKnownRequestError){
					if (e.code === errorCodes['NOT_FOUND']) {
						throw new NotFoundException(`Project with id: ${id} is not found!`)
					}
				}
			throw e;
		}
	};
}