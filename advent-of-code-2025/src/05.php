<?php
    $fresh_start_ranges = [];
    $fresh_end_ranges = [];
    $line = readline();
    $longitud = 0;
    while ($line != "") {
        list($start, $end) = explode("-", $line);
        array_push($fresh_start_ranges, $start);
        array_push($fresh_end_ranges, $end);
        $longitud += $end - $start + 1;
        $line = readline();
    }
    $fresh_ingr_count = 0;
    $line = readline();
    while ($line != "") {
        for ($i = 0; $i < count($fresh_start_ranges); $i++) {
            if ($line >= $fresh_start_ranges[$i] && $line <= $fresh_end_ranges[$i]) {
                $fresh_ingr_count++;
                break;
            }
        }
        $line = readline();
    }
    echo "Fresh ingredients: ", $fresh_ingr_count, PHP_EOL;
    echo "Longituds: ", $longitud, PHP_EOL; //Cullons és molt gran. He de fer operacions d'interseccions suposo?

    $disjoint_split_start_ranges = [];
    $disjoint_split_end_ranges = [];
    $is_borrat = [];
    for ($i = 0; $i < count($fresh_start_ranges); $i++) {
        $start = $fresh_start_ranges[$i];
        $end = $fresh_end_ranges[$i];
        $discarded = false;
        for ($j = 0; $j < count($disjoint_split_start_ranges); $j++) {

            //Ho faré tot amb <= i < crec q sinó em liaré més
            if ($is_borrat[$j]) {
                continue;
            }
            $start_vell = $disjoint_split_start_ranges[$j];
            $end_vell = $disjoint_split_end_ranges[$j];

            //Em faltaven else if pq sembla q pot entrar en més d'un dels casos alhora i fer coses rares

            //1. Si està completament a dins d'un del vells el salto sense afegir-lo
            if ($start_vell <= $start  && $end <= $end_vell) {
                $discarded = true;
            }
            //2. Si engoleix completament un dels vells trec el vell
            else if ($start <= $start_vell  && $end_vell <= $end) {
                $is_borrat[$j] = true;
            }
            //3. Si es sobrecabalca amb un trosset d'un vell (principi) li trec aquest tros
            else if ($start_vell <= $start && $start <= $end_vell) {
                $start = $end_vell + 1; //Aquí és +1 o sense? Recorda q són inclusius. Li trec el +1? (pq ja l'incloia?)
            }
            //4. el mateix amb el final
            else if ($start_vell <= $end && $end <= $end_vell) { //Potser falta suma 1 per algun lloc. Recorda q són inclusius
                $end = $start_vell - 1; //trec el -1?  AQUÍ hi havia un error (DE VARIABLE ONLY!!!). Ara potser és lo de inclusiu
            }
            else {
                //throw new Exception("No hauria d'arribar aquí"); //Doncs sembla q sí q pot arribar aquí i no passa res
            }
        }
        if (!$discarded) {
            array_push($disjoint_split_start_ranges, $start);
            array_push($disjoint_split_end_ranges, $end);
            array_push($is_borrat, false);
        }
    }
    $fresh_longitudes = 0;
    for ($i = 0; $i < count($disjoint_split_start_ranges); $i++) {
        if (!$is_borrat[$i]) {
            $fresh_longitudes += $disjoint_split_end_ranges[$i] - $disjoint_split_start_ranges[$i] + 1;
        }
    }
    echo "Part2: ", $fresh_longitudes, PHP_EOL;
?>
