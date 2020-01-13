import 'reflect-metadata';
import { ContainerConfig } from './inversify.config';
import * as http from 'http';
import {Routes} from "./routes/routes";
import {SocketService} from "./services/socket.service";
var express = require('express');

export class App {
    public express;
    private server: http.Server ;
    private io;
    //private config: IConnectionConfig;
    public static bootstrap(): App {
        const container = ContainerConfig.getContainer();
        return new App( container.get( Routes ), container.get( SocketService ));
    }

    constructor(private routes: Routes, private socketService: SocketService) {

        this.initExpress();
        this.middleware();
        this.initRoutes();
        this.initServer();
        this.initSockets();
        this.listen();
    }

    private initExpress(): void {

        this.express = express();

    }
    private middleware(): void {
        this.express.use(express.json())
         this.express.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', '*');
            res.header('Access-Control-Allow-Headers', '*');

            next();
        });
    }

    private initSockets(): void {
        this.socketService.createSocket(this.server);
    }
    private initRoutes(): void {

        this.express.use('/', this.routes.router);

    }

    private initServer() {
        this.server = http.createServer(this.express);
    }

    private listen() {
        const port =  8090; //TODO add config
        this.server.listen(port, () => {
            console.log(`MS running on port: ${port}`);
        });
    }
}