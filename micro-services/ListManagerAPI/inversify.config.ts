import { Container } from "inversify";
import {Controller } from "./controllers/controller"

import {Service} from "./services/service";
import {Routes} from "./routes/routes";
import {YouTubeService} from "./services/youTube.service";
import {SocketService} from "./services/socket.service";


export class ContainerConfig {
    static  instance: ContainerConfig = new ContainerConfig();
    static  container: Container;
    static getContainer() {
        return ContainerConfig.container;
    }
    private constructor() {
        ContainerConfig.container = new Container({ defaultScope: 'Singleton' });

        //Services
        ContainerConfig.container.bind<Service>(Service).toSelf();
        ContainerConfig.container.bind<YouTubeService>(YouTubeService).toSelf();
        ContainerConfig.container.bind<SocketService>(SocketService).toSelf();
        //Routes
        ContainerConfig.container.bind<Routes>(Routes).toSelf();

        // Controllers
        ContainerConfig.container.bind<Controller>(Controller).toSelf();


    }
}