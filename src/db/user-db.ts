// import { db } from '../index';
// export const getUsers = db.query('SELECT * FROM meetings.users');
import { db } from '../index';
import { IReg } from '../model/registration';
import { map } from 'rxjs';

export const allUsers$ = (search, me) => {
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
// =========================================================================================================================================
/** new user registration */
export const registration$ = (user:IReg, pass:string) => db.tx((t) => {
  return t.query(`INSERT INTO meetings.users ("email", "firstName", "secondName","password","photo") 
                    VALUES ('${user.email}','${user.firstName}','${user.secondName}','${pass}',${user.photo ? '\'' + user.photo + '\'' : 'DEFAULT'}) 
                                RETURNING TRUE;`);
});
// =========================================================================================================================================
/** get user by them e-mail */
export const userByEmail$ = (email:string) => db.query(`SELECT * FROM meetings.users WHERE email = '${email}'`);