import { Component, OnInit } from '@angular/core';
import YouTubePlayer from 'youtube-player';
import YT from 'youtube-player';
import {PlayListService} from '../../services/play-list.service';
import {Observable} from 'rxjs';
import {IVideo} from '../../modules/video.interface';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  private player;
  private currentPlay: Observable<IVideo>;
  private currentVideo: IVideo;
  constructor(private playListService: PlayListService) {

  }

  playVideo(video: IVideo) {
    if (video) {
      this.currentVideo = video;
      this.player.loadVideoById(video.id);
      this.player.playVideo();

    }
  }
  ngOnInit() {
    this.player = YouTubePlayer('player');
    this.currentPlay = this.playListService.currentPlay;
    this.currentPlay.subscribe(this.playVideo.bind(this));
    this.player.on('stateChange', (event) => {
      // event.data
      if (event.data === 0) {
        this.playListService.remove(this.currentVideo);
      }
    });
  }

}
