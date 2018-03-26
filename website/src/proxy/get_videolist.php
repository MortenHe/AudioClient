<?php
header("Access-Control-Allow-Origin: *");

//JSON-Config Array zurueckgeben
echo file_get_contents("videolist.json");