import {Component} from '@angular/core';
import {PlayListService} from "../../services/play-list.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: [ './add-video.component.css' ]
})

export class AddVideoComponent {
  videoAddForm = new FormGroup({
    videoID: new FormControl('')
  });

  constructor(private playListService: PlayListService,
              private formBuilder: FormBuilder) {
    this.videoAddForm = this.formBuilder.group({
      'videoID': ['', Validators.required]
    });

  }

  onSubmit() {
    this.playListService.addVideo( this.videoAddForm.controls.videoID.value );
  }
}
