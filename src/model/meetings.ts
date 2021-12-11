import { IReg } from './registration';

export interface IMeetings {
  meetingId:number;
  name:string
  datetime:number
  time?:string
  date?:string
  description:string
  users:IReg[]
}
