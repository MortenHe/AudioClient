//Rechenaufgaben fuer Lernspiel "numbers" erstellen

//libraries laden fuer Dateizugriff
const execSync = require('child_process').execSync;

//Wo liegen die Dateien zur Erzeugung der Rechenabfragen
const soundquizDir = require("./config.js").soundquizDir

//Audiofiles von Rechnungen erstellen
for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 10; j++) {
        const questionName = i + "+" + j;
        const sum = i + j;
        if (sum <= 10) {
            const outputName = soundquizDir + "/numbers/" + questionName + ".mp3"
            execSync('cd ' + soundquizDir + "/rawnumbers" + ' && ffmpeg -y -i "concat:' + i + '.mp3|plus.mp3|' + j + '.mp3" -acodec copy "' + outputName + '"')
        }
    }
}