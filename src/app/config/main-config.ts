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
//Lautstaerke CEC
//unsubscribe
//Bessere Loesung fuer doppelte Async-Pipe bei show-Tracks vs. FormControl
//Tracks durchsuchen