import {BehaviorSubject} from 'rxjs';
import {IVideo} from '../modules/video.interface';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PlayListService {
  private _playList = new BehaviorSubject<IVideo[]>([]);
  private baseUrl = 'http://localhost:8090/list';
  private dataStore: { playList: IVideo[] } = {playList: []}; // store our data in memory
  readonly playList = this._playList.asObservable();

  public currentPlay = new BehaviorSubject<IVideo | null >(null);
  constructor(private http: HttpClient) {
    this.init();
  }

  init() {
    this.loadAll();
  }

  addVideo(videoID: string) {

    this.http.post<IVideo>(`${this.baseUrl}/video`, {id: videoID}).subscribe(data => {
      if (!data) {
        return;
      }
      this.dataStore.playList.push(data);
      this._playList.next(Object.assign({}, this.dataStore).playList);
      if (this.dataStore.playList.length === 1) {
        this.currentPlay.next(Object.assign({}, this.dataStore).playList[0]);
      }
    }, error => console.log('Could not add video.'));
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
