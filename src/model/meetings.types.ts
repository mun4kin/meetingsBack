
import { IMeetingsUser } from './user.types';

export class IMeetings {
  datetime: number;
  description: string;
  meetingId: number;
  name: string;
  users:IMeetingsUser[];
}
