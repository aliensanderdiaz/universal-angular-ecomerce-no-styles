import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // URL_BASE = 'http://localhost:3001/'
  URL_BASE = 'http://192.168.1.5:3001/'
  
  constructor(
    private httpClient: HttpClient
  ) { }

  peticionGet(url) {
    const url_total = this.URL_BASE + url;
    console.log(url_total);
    
    return this.httpClient.get( url_total );
  }
}
