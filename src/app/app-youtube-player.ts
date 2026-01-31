import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-player',
  standalone:true,
  imports : [FormsModule, CommonModule],
  template: `
    <div *ngIf="videoUrl">
      <iframe
        width="560"
        height="315"
        [src]="videoUrl"
        frameborder="0"
        allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  `
})
export class YoutubePlayerComponent {
  videoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  playVideo(videoId: string) {
    const url = `https://www.youtube.com/embed/${videoId}?rel=0`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
