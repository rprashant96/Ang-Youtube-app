import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class YoutubeService {

  private apiUrl = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: HttpClient) {}

  searchVideos(query: string) {
    return this.http.get<any>(this.apiUrl, {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: '10',
        key: environment.youtubeApiKey
      }
    });
  }
}
