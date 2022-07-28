import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable()
export class SettingsService {

  public snippet;

  constructor(private config: ConfigService) { }

  ngOnInit() {
    this.config.getData()
      .subscribe(data => {
        console.log(data);
        this.snippet = data;
      });
  }

}