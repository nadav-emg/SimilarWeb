import {BehaviorSubject, Subscription} from 'rxjs';
import {IVideo} from '../modules/video.interface';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebSocketService} from './websocket.service';

@Injectable()
export class PlayListService {
  private _playList = new BehaviorSubject<IVideo[]>([]);
  private baseUrl = 'http://localhost:8090/list';
  private dataStore: { playList: IVideo[] } = {playList: []}; // store our data in memory
  readonly playList = this._playList.asObservable();

  public currentPlay = new BehaviorSubject<IVideo | null >(null);
  private listener: Subscription;
  constructor(private http: HttpClient, private wsService: WebSocketService) {
    this.init();
  }

  init() {
    this.loadAll();
    this.listener = this.wsService.onMessage().subscribe(data => {
        this.addVideoToListLocaly(data);
    });
  }

  async addVideo(videoID: string) {
    this.http.post(`${this.baseUrl}/video`, {id: videoID}).toPromise().then( _ =>{}).catch(e => { console.log('not able to find video- ', e); } );
  }

  addVideoToListLocaly(vid: IVideo) {
      this.dataStore.playList.push(vid);
      this._playList.next(Object.assign({}, this.dataStore).playList);
      if (this.dataStore.playList.length === 1) {
        this.currentPlay.next(Object.assign({}, this.dataStore).playList[0]);
      }
    }

  remove(video: IVideo) {
    this.http.delete(`${this.baseUrl}/video/${video.id}`).subscribe(response => {
      if (this.dataStore.playList.length === 0) {
        return;
      }
      if (this.dataStore.playList[0].id === video.id) {
        this.dataStore.playList.shift();
      }
      this.currentPlay.next(Object.assign({}, this.dataStore).playList[0]);
      this._playList.next(Object.assign({}, this.dataStore).playList);
    }, error => console.log('Video not exist.'));
  }

  loadAll() {
    this.http.get<IVideo[]>(`${this.baseUrl}`).subscribe(data => {
      this.dataStore.playList = data;
      this._playList.next(Object.assign({}, this.dataStore).playList);
      this.currentPlay.next(Object.assign({}, this.dataStore).playList[0]);
    }, error => console.log('Could not load todos.'));
  }
}
