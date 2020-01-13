import { injectable } from 'inversify';
import * as http from 'http';
import * as https from 'https';
import * as socketIo from 'socket.io';
import {IVideo} from "../models/interfaces/video.interface";


@injectable()
export class SocketService {

    private io;

    createSocket(server: http.Server) {
        this.io = this.io=require('socket.io')(server);
        this.io.on('connect', (socket: any) => {
            console.log('Connection started');
            socket.on('message', (video: IVideo) => {
                console.log('[server](message): %s', JSON.stringify(video));
                this.io.emit('message', video);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    emit(msg: IVideo) {
        this.io.emit('message', msg);
    }

}
