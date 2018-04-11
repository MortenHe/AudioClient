<?php
header("Access-Control-Allow-Origin: *");

//Sollen alle Items geliefert werden, z.B. fuer Admin?
$get_all = (isset($_GET["all"]) && $_GET["all"] === "true") ? true : false;

//App-Mode laden (video vs. audio)
$app_mode = $_GET["app_mode"];

//Main-JSON laden, wo festgelegt ist, welche Modi geladen werden
$main_json = json_decode(file_get_contents("json/" . $app_mode . "/" . $app_mode . "list.json"), true);

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

                //Items aus diesem Modus laden (z.B. alle Conni-Videos)
                $mode_json = json_decode(file_get_contents("json/" . $app_mode . "/" . $key . "/" . $mode["id"] . ".json"), true);
          
            //Ueber Items dieses Modus gehen
            foreach($mode_json as $item) {

                //Wenn das Item aktiv ist oder alle Infos geladen werden sollen
                if ($item["active"] || $get_all) {

                      //aktiv Status kann entfernt werden (wird in Oberflaeche nicht benoetigt)
                    unset($item["active"]);
                
                    //Modus-Merkmal setzen (fuer Filterung ueber Buttons)
                    $item["mode"] = $mode["id"];

                    //Item-Infos in Array dieses Modus sammeln
                    $main_json[$key]["items"][] = $item;
                }
            }
        }

        //Modus ist nicht aktiv (z.B. kein Bobo-Folgen laden)
        else {

            //Modus aus Liste entfernen, Items wurden eh nicht geladen
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

//Liste der Filter und Items als JSON zurueckgeben
echo json_encode($main_json, true);