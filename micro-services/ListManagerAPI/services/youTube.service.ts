import {injectable} from "inversify";
import {IVideo} from "../models/interfaces/video.interface";
import * as moment from "moment";
const util = require('util');
const YouTube = require('youtube-node');


@injectable()
export class YouTubeService {
    private key = 'AIzaSyBaB1tPAVUYIopx2rnJcWfJTXiI1G4GAoo';
    private youTube;
    private getById

    constructor(){
        this.init();
    }
    init(){
        this.youTube = new YouTube();
        this.youTube.setKey(this.key);
        this.getById = util.promisify(this.youTube.getById);
    }

    public getVideoById = async (id: string) => {
        const videoDetails = await this.getById(id);
        if (videoDetails.items.length === 0) {
            return;
        }
        const vid:IVideo = {
            id: id,
            title: videoDetails.items[0].snippet.title,
            duration:  moment.utc(moment.duration(videoDetails.items[0].contentDetails.duration).asMilliseconds()).format('HH:mm:ss')
        }
        return vid;
    }

}