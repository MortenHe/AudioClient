//Struktur eines Video-Elements
export class Video {
    mode: string;
    name: string;
    file: string;
    length: string;
}

//Liste der Videos
export const VIDEOS: Video[] = [
    {
        'mode': 'Andi',
        'name': 'Andis Welt - Hier bin ich',
        'file': 'vid1.mp4',
        'length': '00:00:05'
    },
    {
        'mode': 'Andi',
        'name': 'Andis Welt - Wo bist du?',
        'file': 'vid2.mp4',
        'length': '00:00:07'
    },
    {
        'mode': 'Conni',
        'name': 'Conni lernt Rad fahren',
        'file': 'conni-rad.mp4',
        'length': '00:11:29'
    },
    {
        'mode': 'Conni',
        'name': 'Conni geht zelten',
        'file': 'conni-zelten.mp4',
        'length': '00:11:17'
    },
    {
        'mode': 'Bobo',
        'name': 'Bobo baut eine Höhle und Bobo geht in den Zoo',
        'file': 'bobo-hoehle-zoo.mp4',
        'length': '00:10:00'
    },
    {
        'mode': 'Bobo',
        'name': 'Bobo feiert Kindergeburtstag und Bobo auf dem Dachboden',
        'file': 'bobo-kindergeburtstag-dachboden.mp4',
        'length': '00:09:48'
    },
    {
        'mode': 'Bobo',
        'name': 'Bobo beim Kinderarzt und Bobo in der Badewanne',
        'file': 'bobo-kinderarzt-badewanne.mp4',
        'length': '00:09:52'
    },
    {
        'mode': 'Bobo',
        'name': 'Bobo putzt und Bobo kann nicht einschlafen',
        'file': 'bobo-putzt-einschlafen.mp4',
        'length': '00:10:07'
    },
    {
        'mode': 'Bobo',
        'name': 'Bobo auf dem Kinderbauernhof und Bobo am Meer',
        'file': 'bobo-kinderbauernhof-meer.mp4',
        'length': '00:10:04'
    },
    {
        'mode': 'Bobo',
        'name': 'Bobo geht ins Schwimmbad und Bobo und der Hund',
        'file': 'bobo-schwimmbad-hund.mp4',
        'length': '00:10:01'
    },
    {
        'mode': 'Bobo',
        'name': 'Bobo auf dem Spielplatz und Bobo am Bach',
        'file': 'bobo-spielplatz-bach.mp4',
        'length': '00:10:09'
    },
    {
        'mode': 'Bobo',
        'name': 'Bobo lässt einen Drachen steigen und Bobo auf der Kirmes',
        'file': 'bobo-drache-kirmes.mp4',
        'length': '00:09:51'
    },
    {
        'mode': 'Bobo',
        'name': 'Bobo steht früh auf und Bobo macht ein Picknick',
        'file': 'bobo-frueh-picknick.mp4',
        'length': '00:09:58'
    },
    {
        'mode': 'Bobo',
        'name': 'Bobo ist im Garten und Bobo fährt Zug',
        'file': 'bobo-garten-zug.mp4',
        'length': '00:10:01'
    },
    {
        'mode': 'Bobo',
        'name': 'Bobo frühstückt und Bobo geht zur Eisdiele',
        'file': 'bobo-fruehstueck-eisdiele.mp4',
        'length': '00:10:09'
    },
    {
        'mode': 'Bobo',
        'name': 'Bobo im Supermarkt und Bobo baut einen Turm',
        'file': 'bobo-supermarkt-turm.mp4',
        'length': '00:10:09'
    },
    {
        'mode': 'Bobo',
        'name': 'Bobo im Kinderturnen und Bobo und die Babysitterin',
        'file': 'bobo-kinderturnen-babysitterin.mp4',
        'length': '00:09:54'
    },
    {
        'mode': 'Bibi Tina',
        'name': 'Bibi und Tina - Der fremde Junge',
        'file': 'bibi-tina-junge.mp4',
        'length': '00:25:08'
    },
    {
        'mode': 'Bibi Tina',
        'name': 'Bibi und Tina - Rettung für den Wanderzirkus',
        'file': 'bibi-tina-wanderzirkus.mp4',
        'length': '00:25:08'
    },
    {
        'mode': 'Bibi Tina',
        'name': 'Bibi und Tina - Die Biber sind los',
        'file': 'bibi-tina-biber.mp4',
        'length': '00:25:08'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Lied: Der April macht was er will',
        'file': 'janosch-april.mp4',
        'length': '00:02:54'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Lied: Der Frosch ist krank',
        'file': 'janosch-frosch-krank.mp4',
        'length': '00:02:51'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Ich mach dich gesund',
        'file': 'janosch-gesund.mp4',
        'length': '00:17:10'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Hasenkinder sind nicht dumm',
        'file': 'janosch-hasenkinder.mp4',
        'length': '00:28:50'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Lied: Ein Loch ist im Eimer',
        'file': 'janosch-loch-eimer.mp4',
        'length': '00:02:52'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Oh wie schön ist Panama',
        'file': 'janosch-panama.mp4',
        'length': '00:12:40'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Popov und die Geschichte vom Schloss',
        'file': 'janosch-popov-schloss.mp4',
        'length': '00:13:03'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Drei Räuber und ein Rabenkönig',
        'file': 'janosch-rabenkoenig.mp4',
        'length': '00:13:39'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Das Regenauto',
        'file': 'janosch-regenauto.mp4',
        'length': '00:12:30'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Löwenzahn und Seidenpfote',
        'file': 'janosch-seidenpfote.mp4',
        'length': '00:28:16'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Lied: Ein Vogel wollte Hochzeit machen',
        'file': 'janosch-vogelhochzeit.mp4',
        'length': '00:02:57'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Wolkenzimmerhaus',
        'file': 'janosch-wolkenzimmerhaus.mp4',
        'length': '00:08:49'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Josa und die Zauberfiedel',
        'file': 'janosch-zauberfiedel.mp4',
        'length': '00:26:06'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Oh wie einsam ist die Luft',
        'file': 'janosch-einsam-luft.mp4',
        'length': '00:11:20'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Der Frosch ist ein Großmaul',
        'file': 'janosch-frosch-grossmaul.mp4',
        'length': '00:05:24'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Lied: Was haben wir Gänse für Kleider an',
        'file': 'janosch-gaense-kleider.mp4',
        'length': '00:02:52'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Die Grille und der Maulwurf',
        'file': 'janosch-fiedelgrille.mp4',
        'length': '00:06:36'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Zehn Gänse saßen im Haferstroh',
        'file': 'janosch-gaense-haferstroh.mp4',
        'length': '00:02:57'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Hasenmotor, Antrieb vorne',
        'file': 'janosch-hasenmotor.mp4',
        'length': '00:06:25'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Honigblumen schmecken süß',
        'file': 'janosch-honigblumen.mp4',
        'length': '00:14:46'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Komm nach Iglau, Krokodil',
        'file': 'janosch-iglau.mp4',
        'length': '00:11:00'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Der Kanarienvogelfederbaum',
        'file': 'janosch-kanarienvogelfederbaum.mp4',
        'length': '00:06:30'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Lied: Ich bin ein Musikante',
        'file': 'janosch-musikante.mp4',
        'length': '00:02:56'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Post für den Tiger',
        'file': 'janosch-post.mp4',
        'length': '00:16:06'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Komm wir finden einen Schatz',
        'file': 'janosch-schatz.mp4',
        'length': '00:19:21'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Kleines Schiff Pyjamahose',
        'file': 'janosch-schiff-pyjamahose.mp4',
        'length': '00:10:24'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Ade lieber Schneemann',
        'file': 'janosch-schneemann.mp4',
        'length': '00:17:25'
    },

    {
        'mode': 'Janosch',
        'name': 'Janosch - Schnuddel fängt einen Hasen',
        'file': 'janosch-schnuddel-hase.mp4',
        'length': '00:10:15'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Lied: Schnuddelpferd',
        'file': 'janosch-schnuddelpferd.mp4',
        'length': '00:02:45'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Das Seepferdrennen',
        'file': 'janosch-seepferdrennen.mp4',
        'length': '00:14:51'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Traumstunde für Siebenschläfer',
        'file': 'janosch-siebenschlaefer.mp4',
        'length': '00:10:10'
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Antek Pistole",
        "file": "janosch-antek-pistole.mp4",
        "length": "00:29:05"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Ein Fremder mit Sporen",
        "file": "janosch-fremder-sporen.mp4",
        "length": "00:28:46"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Lied: Morgens um 6",
        "file": "janosch-hex.mp4",
        "length": "00:02:50"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Der unsichtbare Indianer",
        "file": "janosch-indianer.mp4",
        "length": "00:26:07"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Lukas Kümmel",
        "file": "janosch-kuemmel.mp4",
        "length": "00:28:07"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Der Quasselkasper wird reich",
        "file": "janosch-quasselkasper-reich.mp4",
        "length": "00:28:43"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Rabe Josef",
        "file": "janosch-rabe-josef.mp4",
        "length": "00:28:29"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Riesenparty für den kleinen Tiger",
        "file": "janosch-riesenparty.mp4",
        "length": "00:16:50"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Der Wettlauf zwischen Hase und Igel",
        "file": "janosch-wettlauf.mp4",
        "length": "00:11:45"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Ade kleines Schweinchen",
        "file": "janosch-ade-schweinchen.mp4",
        "length": "00:17:07"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Der Frosch der fliegt",
        "file": "janosch-frosch-fliegt.mp4",
        "length": "00:06:40"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Der Frosch und die Tigerente",
        "file": "janosch-frosch-tigerente.mp4",
        "length": "00:06:57"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Der Froschkönig",
        "file": "janosch-froschkoenig.mp4",
        "length": "00:15:43"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Lied: Der Jäger",
        "file": "janosch-fuchs-jaeger.mp4",
        "length": "00:03:02"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Hase Baldrian",
        "file": "janosch-hase-baldrian.mp4",
        "length": "00:17:13"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Die fabelhafte Geschichte vom Hasen Robinson",
        "file": "janosch-hase-robinson.mp4",
        "length": "00:09:02"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Das Geheimnis des Herrn Schmidt",
        "file": "janosch-herr-schmidt.mp4",
        "length": "00:14:25"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Kasper Mütze",
        "file": "janosch-kasper-muetze.mp4",
        "length": "00:14:12"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Lied: Komm herein",
        "file": "janosch-komm-herein.mp4",
        "length": "00:02:58"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Lied: Lauf Jäger lauf",
        "file": "janosch-lauf-jaeger.mp4",
        "length": "00:02:55"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Das Lumpengesindel",
        "file": "janosch-lumpengesindel.mp4",
        "length": "00:10:24"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Der Quasselkasper",
        "file": "janosch-quasselkasper.mp4",
        "length": "00:26:11"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Die Schneckenbahn hat zwölf Stationen",
        "file": "janosch-schneckenbahn.mp4",
        "length": "00:14:28"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Tigerschweinchen",
        "file": "janosch-tigerschweinchen.mp4",
        "length": "00:08:07"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Lied: Zungenbrecher",
        "file": "janosch-zungenbrecher.mp4",
        "length": "00:02:56"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Der Esel und die Eule",
        "file": "janosch-esel-eule-youtube.mp4",
        "length": "00:05:05"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Der Frosch und die Ziege",
        "file": "janosch-frosch-ziege-youtube.mp4",
        "length": "00:05:48"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Herr Korbes will klein Hühnchen küssen",
        "file": "janosch-herr-korbes-youtube.mp4",
        "length": "00:07:35"
    },
    {
        "mode": "Janosch",
        "name": "Janosch - Das Schnweinchen und der Wolf",
        "file": "janosch-schweinchen-wolf-youtube.mp4",
        "length": "00:05:57"
    }
];

//Filter-Modi
export const MODES = [
    {
        "label": "Alle",
        "value": "*",
        "icon": "all"
    },
    {
        "label": "Bibi & Tina",
        "value": "Bibi Tina",
        "icon": "bibi-tina"
    },
    {
        "label": "Bobo",
        "value": "Bobo",
        "icon": "bobo"
    },
    {
        "label": "Conni",
        "value": "Conni",
        "icon": "conni"
    },
    {
        "label": "Janosch",
        "value": "Janosch",
        "icon": "janosch"
    }
];

//Proxy-URL
export const PROXY_URL = "http://localhost/WebPlayer/website/src/app/proxy/";
//export const PROXY_URL = "http://192.168.0.150/proxy/";