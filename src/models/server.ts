import express, { Application } from 'express';
import { NODE_ENV, PORT } from '../helpers/cf-enviroment';
import morgan from 'morgan';
import cors from 'cors';
import { connectdb } from '../database/connectdb';

import userRoute from '../routes/user.route';

class Server {
  private app: Application;
  private port: string;
  private userPath: string;

  constructor() {
    this.app = express();
    // PUERTO DEL SERVIDOR
    this.port = PORT;
    this.userPath = '/api/user';
    this.conectarDb();
    this.middlewares();
    this.routes();
  }

  conectarDb() {
    // conectado a mongodb
    connectdb
      .initialize()
      .then((value) => console.log('{:database connect:}'))
      .catch((err) => console.log(err));
  }

  middlewares() {
    // JSON - bodyparse
    this.app.use(express.json());
    // this.app.use(express.urlencoded({ extended: false }));
    // fileupload
    // this.app.use(
    //   fileUpload({
    //     useTempFiles: true,
    //   }),
    // );
    // CORS "*"
    // this.app.use(cors({ origin: true }));
    this.app.use(cors());
    // this.app.use(cors(corsOptions));
    // Directorio Público
    // console.log(__dirname + '/../public');
    // this.app.use(express.static(__dirname + '/../public'));
    this.app.use(express.static(__dirname + '/../../public'));
    this.app.use('/admin', express.static(__dirname + '/../../admin'));

    // Morgan muestra las rutas - solo en dev
    if (NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
  }

  routes() {
    this.app.use(this.userPath, userRoute);
    // this.app.all('*', routeNotFound);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running at port: ${this.port}`);
    });
  }
}

export default Server;
