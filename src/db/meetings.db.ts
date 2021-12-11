// import { db } from '../index';
// export const getUsers = db.query('SELECT * FROM meetings.users');
import { db } from '../index';
import { forkJoin, map } from 'rxjs';
import { IMeetings } from '../model/meetings.types';

// =====================================================================================================================
/** Get last generated value for sync table*/
export const lastValue$ = () => db.query(' select (last_value+1) as num  from meetings."meetings_meetingId_seq"');
// =====================================================================================================================
/** Get meetings which are available to user*/
export const meetings$ = (userId:string) => {
  const result = [];
  let lastMeetingId = 0;
  return db.query(`
    SELECT t1.* , t2."isCreator" , t3."userId",t3.email,"firstName",t3."secondName",t3.photo
    FROM  meetings.meetings as t1 join
          meetings."mUsers" as t2 on t1."meetingId"=t2."meetingId" left join
          meetings.users as t3 ON t3."userId"=t2."userId"
    WHERE t2."meetingId" in (select "meetingId" from meetings."mUsers" where "userId"='${userId}')
    ORDER BY t1.datetime desc, t1."meetingId" desc, t2."isCreator"
    ` ).pipe(map((a) => {
    const user = {
      ...a,
      ...{
        meetingId: undefined,
        name: undefined,
        datetime: undefined,
        description: undefined,
      }
    };

    if ( !lastMeetingId || lastMeetingId !== a.meetingId) {
      lastMeetingId = a.meetingId;
      result.push( {
        meetingId: a.meetingId,
        name: a.name,
        datetime: +a.datetime,
        description: a.description,
        users: [{ ...user }]
      });
    } else {
      result[result.length - 1].users.push({ ...user });
    }

    return result;
  }));
};
// =====================================================================================================================
/** Meeting creation*/
export const createMeetings$ = (data: IMeetings, newMeetingId:number) => {

  const results = [];
  return db.tx((t) => {
    /** meeting creation*/
    const insertMeting = t.query(`
        INSERT INTO meetings.meetings ("name", "description", "datetime") 
        VALUES ('${data.name}','${data.description}','${data.datetime}') 
        RETURNING TRUE;`);
    results.push(insertMeting);
    /** add users to meeting*/
    data.users.forEach((item) => {
      const insertUser = t.query(`
        INSERT INTO meetings."mUsers" ("meetingId", "userId", "isCreator") 
        VALUES ('${newMeetingId}','${item.userId}','${!!item.isCreator}') 
        RETURNING TRUE;`);
      results.push(insertUser);
    });
    return forkJoin(results);
  });
};
export const deleteMeeting$ = (meetingId:number) => {
  const results = [];
  return db.tx((t) => {
    const deleteMeting = t.query(`
        delete from meetings.meetings where "meetingId"=${meetingId}
        RETURNING TRUE;`);
    results.push(deleteMeting);
    const deleteMUsers = t.query(`
        delete from meetings."mUsers" where "meetingId"=${meetingId}
        RETURNING TRUE;`);
    results.push(deleteMUsers);

    return forkJoin(results);
  });
};
// =====================================================================================================================
