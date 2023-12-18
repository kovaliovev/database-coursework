import { Controller, ParseIntPipe, Body, Param, Post, Get, Patch, Delete } from '@nestjs/common';

import { ProjectService } from './project.service';
import { ProjectCreateDTO, ProjectUpdateDTO } from './project.dto';

@Controller('projects')
export class ProjectController{
	constructor(private projectService: ProjectService){}

	@Post('create')
	async create(@Body() dto: ProjectCreateDTO){
		return await this.projectService.create(dto);
	}

	@Get(':id')
	async find(@Param('id', ParseIntPipe) id: number){
		return await this.projectService.find(id);
	}

	@Get()
	async findAll(){
		return await this.projectService.findAll();
	}

	@Patch(':id')
	async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProjectUpdateDTO,){
		return await this.projectService.update(id, dto);
	}

	@Delete(':id')
	async delete(@Param('id', ParseIntPipe) id: number){
		return await this.projectService.delete(id);
	}
}