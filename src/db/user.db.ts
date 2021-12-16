
import { db } from '../index';

import { map, Observable } from 'rxjs';
import { IRegUser, TSearchUsers } from '../model/user.types';

// =====================================================================================================================
/** Get all available users  for adding to meeting, limit 4 is threshold*/
export const allUsers$ = (search:string, me:number):Observable<TSearchUsers[]> => {
  const users = [];
  return db.query(`
    SELECT "firstName","secondName",email,photo,"userId" FROM meetings.users
    WHERE "userId" != '${me}' and (  LOWER("firstName") LIKE '%${search}%' 
          OR LOWER("secondName" )LIKE '%${search}%' OR LOWER(email) LIKE '%${search}%')
    LIMIT 4
    `).pipe(map((user) => {
    users.push(user);
    return users;
  }));
};
// =====================================================================================================================
/** New user registration */
export const registration$ = (user:IRegUser, pass:string):Observable<boolean[]> => db.tx((t) => {
  return t.query(`
    INSERT INTO meetings.users ("email", "firstName", "secondName","password","photo") 
    VALUES ('${user.email}','${user.firstName}','${user.secondName}','${pass}',
            ${user.photo ? '\'' + user.photo + '\'' : 'DEFAULT'}) 
    RETURNING TRUE;`);
});
// =====================================================================================================================
/** Get user by them e-mail */
export const userByEmail$ = (email:string) => db.query(`SELECT * FROM meetings.users WHERE email = '${email}'`);

export const isAdmin$ = (email:string) => db.query(`SELECT * FROM meetings.users WHERE "isAdmin" = true and email = '${email}'`);
