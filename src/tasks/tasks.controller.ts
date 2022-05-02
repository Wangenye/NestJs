import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks.status.enum';
import { TasksService } from './tasks.service';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
//Get All Task
@Get()
getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }


  //Get Task by id

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  //Create new Task
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  //Delet Task by id
  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  //Update task status
  @Patch('/:id/')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }

  // @Get()
  // getTasks(@Query() filterDto : GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //      return this.tasksService.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getTasks();
  //   }
  //   // return this.tasksService.getTasks();
  // }

  // @Post()
  // createTask(
  //   @Body() createTaskDto:CreateTaskDto
  // ): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Get('/:id')
  // getTaskById(
  //   @Param('id') id: string
  //   ): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  // @Delete('/:id')
  // deleteTaskById(
  //   @Param('id') id: string
  //   ): Task {
  //   return this.tasksService.deleteTaskById(id);
  // }
  // @Patch('/:id')
  //   updateTaskStatus(
  //       @Param('id') id: string,
  //       @Body() updateTaskStatusDto: UpdateTaskStatusDto
  //   ): Task {
  //       const {status} = updateTaskStatusDto;
  //       return this.tasksService.UpdateTaskStatus(id,status);
  //   }
}
