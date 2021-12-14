import {
  Body, Controller, Get, JsonController, Post, Put, UseBefore
} from 'routing-controllers';
import 'reflect-metadata';
import {
  createMeetings$, deleteMeeting$, lastValue$, meetings$, updateMeeting$
} from '../db/meetings.db';
import { lastValueFrom } from 'rxjs';

import { Authentication } from '../middleware/midAuthentication';
import httpContext from 'express-http-context';
import { IMeetings } from '../model/meetings.types';

@Controller()
@JsonController('/meeting')
export class MeetingController {
  @Get('/all')
  @UseBefore(Authentication)
  async getMeetings () {
    const user = httpContext.get('userId');
    return await lastValueFrom(meetings$(user), { defaultValue: [] });
  }
  @Post('/create')
  @UseBefore(Authentication)
  async createMeetings (@Body() data: IMeetings) {
    const newMeeting:any = await lastValueFrom(lastValue$());
    return await lastValueFrom(createMeetings$(data, newMeeting['num']));
  }
  @Post('/delete')
  @UseBefore(Authentication)
  async deleteMeetings(@Body() data: IMeetings) {
    return await lastValueFrom(deleteMeeting$(data.meetingId));
  }
  @Put('/update')
  @UseBefore(Authentication)
  async updateMeetings(@Body() data: IMeetings) {
    return await lastValueFrom(updateMeeting$(data));
  }

}
