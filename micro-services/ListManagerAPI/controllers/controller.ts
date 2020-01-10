import { injectable } from 'inversify';
import { Request, Response } from 'express';

import {Service} from "../services/service";
import {IVideo} from "../models/interfaces/video.interface";



@injectable()
export class Controller {

    constructor(private service: Service){

    }
    AddVideoToList = async(req: Request, res: Response) => {
        try {
            const videoReq: IVideo = {
                url: req.body.url
            }
            this.service.add2List(videoReq);
            res.status(200).send();
        } catch (e) {
            console.log(e.message);
            res.status(500).send("failed");
        }
    }
        getAllVideos = async(req: Request, res: Response) => {
            try {
                const result= await this.service.getAllVideos(req.query.limit,req.query.offset);
                res.status(200).send(JSON.stringify(result));
            } catch (e) {
                console.log(e.message);
                res.status(500).send("failed");
            }

    }


}