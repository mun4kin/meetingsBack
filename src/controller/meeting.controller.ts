import {
  Body, Controller, Get, JsonController, Post, UseBefore
} from 'routing-controllers';
import 'reflect-metadata';
import {
  createMeetings$, deleteMeeting$, lastValue$, meetings$
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
    let result = [];
    try {
      result = await lastValueFrom(meetings$(user));
    } catch (e) {}
    return result;

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


}
