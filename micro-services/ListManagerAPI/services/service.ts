import {injectable} from 'inversify';
import {IVideo} from '../models/interfaces/video.interface'
import {YouTubeService} from "./youTube.service";
import {SocketService} from "./socket.service";

@injectable()
export class Service {
    private videoList: IVideo[] = [];

    constructor(private youTubeService: YouTubeService, private socketService: SocketService) {

    }


    async add2List(video: string) {
        try {
            const videoData = await this.youTubeService.getVideoById(video)
            this.videoList.push(videoData);
            this.socketService.emit(videoData);
            return videoData;
        }catch (e) {
            console.log(e.message);

        }
    }

    async deleteFromList(id: string) {
        try {

            if (this.videoList.length>0 && this.videoList[0].id===id){
                return this.videoList.shift();
            }
        }catch (e) {
            console.log(e.message);

        }
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



