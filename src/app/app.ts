import { Component } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeService } from './services/youtube.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class App {

  query = '';
  videos: any[] = [];
  selectedVideoUrl!: SafeResourceUrl;

  constructor(
    private youtube: YoutubeService,
    private sanitizer: DomSanitizer
  ) { }

  search() {
    this.youtube.searchVideos(this.query).subscribe(res => {
      this.videos = res.items;
    });
  }

  play(videoId: string) {
    this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }

   playVideo(videoId: string) {
    // Safe embed URL
    const url = `https://www.youtube.com/embed/${videoId}?rel=0`;
    this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
