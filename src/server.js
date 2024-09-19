import 'dotenv/config';

import http from 'http';
import express from 'express';
import morgan from 'morgan';

import './database/connection.js';
import { User, } from './database/models/user.model.js';

// Paso 2. Importar nuestro modulo.
import authRouter from './routes/auth.routes.js';

async function main() {
  const port = +process.env.APP_PORT ?? 4000;
  const app = express();

  app.use(morgan('dev'));

  app.get('/', (req, res) => {
    res.send('Hola mundo!');
  });

  app.use('/auth', authRouter);

  // const usersExists = await User.findOne({
  //   where: {
  //     id: 'cualquiercosa',
  //   },
  // });

  // if (!usersExists) {
  //   await User.create({
  //     id: 'cualquiercosa',
  //     email: 'brian@mail.com',
  //     password: '123456',
  //     name: 'Brian Castro',
  //   });
  // }

  const httpServer = http.createServer(app);
  httpServer.listen(port, () => {
    console.log('Server running on port: ', port);
  });
}

main()
  .catch(err => console.error(err));