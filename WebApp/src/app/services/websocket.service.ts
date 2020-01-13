import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable ,  BehaviorSubject } from 'rxjs';
import {IVideo} from "../modules/video.interface";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket;
  private socketConnected: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.initSocket();
  }

  private initSocket(): void {
    this.socket = socketIo('http://localhost:8090');
    this.socket.on('connect', () => {
      this.socketConnected.next(true);
    });
    this.socket.on('disconnect', () => {
      this.socketConnected.next(false);
    });
  }

  public onMessage(): Observable<IVideo> {
    return new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
  }

}