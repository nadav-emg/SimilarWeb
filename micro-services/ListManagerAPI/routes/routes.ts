
import { Router } from 'express';
import { injectable } from 'inversify';
import { Controller} from "../controllers/controller";

@injectable()
export class Routes {

    router: Router;

    constructor(private controller: Controller) {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.route('/list/video')
            .post(this.controller.AddVideoToList);

        this.router.route('/list')
            .get(this.controller.getAllVideos);

        this.router.route('/list/video/:id')
            .delete(this.controller.getAllVideos);


    }
}
