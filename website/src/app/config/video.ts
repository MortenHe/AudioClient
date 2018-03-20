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
        'name': 'Bibi und Tina - Die Biber sind los',
        'file': 'bibi-tina-biber.mp4',
        'length': '00:25:08'
    },
    {
        'mode': 'Bibi Tina',
        'name': 'Bibi und Tina - Rettung für den Wanderzirkus',
        'file': 'bibi-tina-wanderzirkus.mp4',
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
        'file': 'janosch-einsam.mp4',
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
        'file': 'janosch-grille.mp4',
        'length': '00:06:36'
    },
    {
        'mode': 'Janosch',
        'name': 'Janosch - Zehn Gänse saßen im Haberstroh',
        'file': 'janosch-gaense-haberstroh.mp4',
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

];