import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.status.enum';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}

    //Get all Tasks
    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

  //Get Task By Id
  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    } else {
      return found;
    }
  }

  //Creating Task
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  //Delete Taskby Id
    async deleteTaskById(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected == 0){
        throw new NotFoundException(`Task with ID ${id} not found`);
    }
    }


    //Update Task status 
    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;



        await this.taskRepository.save(task);
        return task;
    }

  //    getTasks():Task[]{
  //          return this.tasks;
  //    }

  //    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //     const {status,search} = filterDto;
  //     let tasks = this.getTasks();
  //     if(status){
  //         tasks = tasks.filter(task => task.status === status);
  //     }
  //     if(search){
  //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
  //     }
  //     return tasks;
  //    }

  //    createTask(createTaskDto: CreateTaskDto) : Task{
  //        const {title,description} = createTaskDto;
  //          const task: Task = {
  //               id: uuid(),
  //               title,
  //               description,
  //             status: TaskStatus.OPEN
  //          }
  //          this.tasks.push(task);
  //          return task;
  //    }

  //    getTaskById(id: string): Task {
  //     const found= this.tasks.find(task => task.id === id);

  //     if(!found){
  //         throw new NotFoundException();
  //     }else{
  //         return found;
  //     }

  //    }
  //    deleteTaskById(id: string): Task {
  //     const task = this.getTaskById(id);
  //     if(task){
  //         const index = this.tasks.indexOf(task);
  //         this.tasks.splice(index,1);
  //     }
  //     return task;
  //    }

  //    UpdateTaskStatus(id: string, status: TaskStatus): Task {
  //     const task = this.getTaskById(id);
  //     if(task){
  //         task.status = status;
  //     }
  //     return task;
  //    }
}
