import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from './entities/project.enum';

@Controller('project')
@UsePipes(ValidationPipe)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }
  @Get('/projs')
  findall() {
    return this.projectService.findall();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':titre')
  remove(@Param('titre') titre: string) {
    return this.projectService.remove(titre);
  }
  
  @Patch(':titre/status')
  changeStatus(
    @Param('titre') titre: string,
    @Body('status') status: ProjectStatus,
  ) {
    return this.projectService.changeStatus(titre, status);
  }
}

