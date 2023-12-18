import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
	IsDateString,
  MaxLength,
} from 'class-validator';

import { ProjectStatus } from '@prisma/client';

class ProjectCreateDTO	 {
	@IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  logo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string;
}

class ProjectUpdateDTO	 {
	@IsOptional()
  @IsString()
  @MaxLength(50)
  title?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  logo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string;
}

export { ProjectCreateDTO, ProjectUpdateDTO };
