import {injectable} from 'inversify';
import { Request, Response } from 'express';
import {IVideo} from '../models/interfaces/video.interface'

@injectable()
export class Service {
    private videoList: IVideo[] = [];

    constructor() {

    }

    async add2List(video: IVideo) {
        this.videoList.push(video);
    }



    getAllVideos = async (limit?: number, offset?: number) => {
        if (!limit) {
            return this.videoList;
        }

        if (!offset) {
            offset = 0;
        }

        return this.videoList.slice(offset, offset + limit);
    }


}



