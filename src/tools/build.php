<?php

//Video builden
echo exec("ng build --env=video-prod --base-href=/wvp/ --output-path=../../dist-video --prod");

//Audio builden
exec("ng build --env=audio-prod --base-href=/wap/ --output-path=../../dist-audio --prod");

//Dateien auf Server spielen fuer Video und Audio
include 'deploy.php';
