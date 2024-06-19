import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService, Issue } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getIssue(@Param('id') id: string): Issue {
    return this.appService.getIssue(Number(id));
  }

  @Post()
  createIssue(@Body('issue') issue: Issue): Issue {
    return this.appService.createIssue(issue);
  }

  @Put(':id')
  updateIssue(@Param('id') id: string, @Body('issue') issue: Issue): Issue {
    return this.appService.updateIssue(Number(id), issue);
  }

  @Delete(':id')
  deleteIssue(@Param('id') id: string): number {
    return this.appService.deleteIssue(Number(id));
  }
}
