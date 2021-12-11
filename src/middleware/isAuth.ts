import jwt from 'express-jwt';
// Мы исходим из предположения о том, что JWT приходит на сервер в заголовке Authorization, но токен может быть передан и в req.body, и в параметре запроса, поэтому вам нужно выбрать тот вариант, который подходит вам лучше всего.

export default jwt({
  secret: 'super_strong_password',
  algorithms: ['HS256'],
  getToken: (req) => req.headers.authorization
});
