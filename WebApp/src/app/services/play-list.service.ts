import {BehaviorSubject} from "rxjs";
import {IVideo} from "../modules/video.interface";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PlayListService {
  private _playList = new BehaviorSubject<IVideo[]>([]);
  private baseUrl = 'http://localhost:8090/list';
  private dataStore: { playList: IVideo[] } = { playList: [] }; // store our data in memory
  readonly playList = this._playList.asObservable();

  constructor(private http: HttpClient) {

  }


  addVideo(videoID: string) {

    this.http.post<IVideo>(`${this.baseUrl}/video`, JSON.stringify({url: videoID})).subscribe(data => {
      this.dataStore.playList.push(data);
      this._playList.next(Object.assign({}, this.dataStore).playList);
    }, error => console.log('Could not add video.'));
  }

  remove(video: IVideo) {
    this.http.delete(`${this.baseUrl}/video/${video.url}`).subscribe(response => {
      if (this.dataStore.playList.length == 0){
        return;
      }
        if (this.dataStore.playList[0].url === video.url) {
          this.dataStore.playList.splice(0, 1);
        }


      this._playList.next(Object.assign({}, this.dataStore).playList);
    }, error => console.log('Video not exist.'));
  }
}
