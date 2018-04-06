//Struktur eines Video-Elements
export class Video {
    mode: string;
    name: string;
    file: string;
    length: string;
    active: boolean;
}

//Proxy-URL
//export const PROXY_URL = "http://localhost/WebPlayer/website/src/proxy/";
export const PROXY_URL = "http://192.168.0.150/proxy/";

//Verfuegbare Video-Modes
export const VIDEO_MODES = [
    {
        "id": "kinder",
        "label": "Kindervideos"
    }, 
    {
        "id": "jahresvideo",
        "label": "Jahresvideos"
    }
];

//subscribe innerhalb von subscribe
//serach weiter aufteilen (2. Inspektor, 2. Suchfeld)
//Pagination