//Struktur eines Multimedia-Items (Video, Audio)
export class Item {
    mode: string;
    name: string;
    file: string;
    length: string;
    active: boolean;
    tracks: string[];
}

//subscribe innerhalb von subscribe
//serach weiter aufteilen (2. Inspektor, 2. Suchfeld)
//Pagination
//Playlist-Generator mit nur einem Container
//Items um track (optional) erweitern oder single vs. typeplaylist, Trackinfos ein / ausblenden
//Lautstaerke CEC
//unsubscribe
//Standardwerte für BS (z.B: backendservice)
//Bessere Loesung fuer doppelte Async-Pipe bei show-Tracks vs. FormControl