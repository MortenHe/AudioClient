import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PicontrolService {

  //Wo liegt das PHP-Proxy-Skript
  proxyUrl = environment.proxyUrl;

  //Service injecten
  constructor(private http: Http) { }

  //Anfrage an Proxy schicken, damit Lautstaerke gemutet, unmutet, lauter / leiser wird, oder auf gewissen Wert wie 50% setzen
  sendControlVolumeRequest(command, params): any {
    this.http.post(this.proxyUrl + "control_volume.php", JSON.stringify({ command: command, params: params })).subscribe();
  }

  //Anfrage an Proxy schicken, damit der Pi heruntergefahren wird
  sendShutdownRequest(): any {
    this.http.get(this.proxyUrl + "shutdown_pi.php").subscribe();
  }
}