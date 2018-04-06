//Struktur eines Video-Elements
export class Video {
    mode: string;
    name: string;
    file: string;
    length: string;
    active: boolean;
}

//Proxy-URL
export const PROXY_URL = "http://localhost/WebPlayer/website/src/proxy/";
//export const PROXY_URL = "http://192.168.0.150/proxy/";

//Existierende Modes
//Fallback mode
//modefilter subject als bs?
//videomode bei vs start_playlist