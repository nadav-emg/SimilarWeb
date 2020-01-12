import {Component, OnInit} from '@angular/core';
import {PlayListService} from '../../services/play-list.service';
import {Observable} from 'rxjs';
import {IVideo} from '../../modules/video.interface';


@Component({
  selector: 'app-play-list-video',
  templateUrl: './play-list.component.html',
  styleUrls: [ './play-list.component.css' ]
})

export class PlayListComponent implements OnInit {
  playList: Observable<IVideo[]>;


  constructor(private playListService: PlayListService) {

  }

  ngOnInit() {
    this.playList = this.playListService.playList;

  }
}

