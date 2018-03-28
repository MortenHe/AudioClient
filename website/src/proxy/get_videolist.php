<?php
header("Access-Control-Allow-Origin: *");

//Sollen alle Videos geliefert werden, z.B. fuer Admin?
$get_all = (isset($_GET["all"]) && $_GET["all"] === "true") ? true : false;

//Main-JSON laden, wo festgelegt ist, welche Video-Modi geladen werden
$main_json = json_decode(file_get_contents("json/videolist.json"), true);

//Ueber Main-JSON gehen
foreach($main_json as $key => $mode) {
    
    //Im Filterbereich ist festgelegt, welche Modi (Conni, Bobo,...) geladen werden sollen
    for($i = count($main_json[$key]["filter"]) -1;  $i >= 0; $i--) {

        //Kurzzugriff auf Array-Element
        $mode = $main_json[$key]["filter"][$i];

        //All-Filter wird immer angezeigt
        if($mode["id"] !== "all")  {
        
            //Wenn der Modus aktiv ist oder alle Infos geliefert werden sollen
            if ($mode["active"] || $get_all) {

                //aktiv Status kann entfernt werden (wird in Oberflaeche nicht benoetigt)
                unset($main_json[$key]["filter"][$i]["active"]);

                //Videos aus diesem Modus laden (z.B. alle Conni-Videos)
                $mode_json = json_decode(file_get_contents("json/" . $key . "/" . $mode["id"] . ".json"), true);
          
                //Ueber Videos dieses Modus gehen
            foreach($mode_json as $video) {

                //Wenn das Video aktiv ist oder alle Infos geladen werden sollen
                if ($video["active"] || $get_all) {

                      //aktiv Status kann entfernt werden (wird in Oberflaeche nicht benoetigt)
                    unset($video["active"]);
                
                //Modus-Merkmal setzen (fuer Filterung ueber Buttons)
                    $video["mode"] = $mode["id"];

                    //Video-Infos in Array dieses Video-Modus sammeln
                $main_json[$key]["videos"][] = $video;
                }
            }
        }

        //Modus ist nicht aktiv (z.B. kein Bobo-Folgen laden)
        else {

            //Modus aus Liste entfernen, Videos wurden eh nicht geladen
            array_splice($main_json[$key]["filter"], $i, 1);
        }
    }

    //beim Modus all
    else {
    
            //aktiv Status kann entfernt werden (wird in Oberflaeche nicht benoetigt)
        unset($main_json[$key]["filter"][$i]["active"]);
    }
    }
}

//Liste der Filter und Videos als JSON zurueckgeben
echo json_encode($main_json, true);