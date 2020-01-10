import 'reflect-metadata';
import { ContainerConfig } from './inversify.config';
import * as http from 'http';
import {Routes} from "./routes/routes";

var express = require('express');

export class App {
    public express;
    private server: http.Server ;
    //private config: IConnectionConfig;
    public static bootstrap(): App {
        const container = ContainerConfig.getContainer();
        return new App( container.get( Routes ));
    }

    constructor(private routes: Routes) {

        this.initExpress();
        this.middleware()
        this.initRoutes();

        this.initServer();
        this.listen();
    }

    private initExpress(): void {

        this.express = express();
        //this.express.get("/user/:username",
    }
    private middleware(): void {
        this.express.use(express.json())
        // this.express.use((req, res, next) => {
        //    res.header('Access-Control-Allow-Origin', '*');
        //    res.header('Access-Control-Allow-Methods', '*');
        //    res.header('Access-Control-Allow-Headers', '*');

            //next();
       // });
    }
    private initRoutes(): void {

        this.express.use('/', this.routes.router);

    }

    private initServer() {
        return this.server = http.createServer(this.express);
    }

    private listen() {
        const port =  4200; //TODO add config
        this.server.listen(port, () => {
            console.log(`MS running on port: ${port}`);
        });
    }
}