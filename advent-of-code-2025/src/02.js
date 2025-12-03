readline = require('readline');

//Pot ser q sigui millor posar ; pq si no ho posa automàtic i la pot liar? Això sembla, tot i q en casos normals les posa bé.

//2022: Couldn't even get the data with synchronous stdin: prompy-sync invented lines and fs.readFileSync(0) only read 4098 Bytes...
const reader = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});

part1 = 0;
part1_slow = 0;
part2 = 0;

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}
function is_invalid(i) {
    i_str = i.toString();
    for (pattern_length = 1; pattern_length <= i_str.length/2; pattern_length++) {
        if (i_str.length % pattern_length != 0) {
            continue;
        }
        pattern = i_str.substring(0, pattern_length);
        times = Math.floor(i_str.length / pattern_length); //fa divisió entera? Nope, js still sucks
        aquest_invalid = true;
        //Damn ha funcionat a la primera! Sense ni tant sols provar amb l'exemple 😎
        for (start_tros = pattern_length; start_tros < i_str.length; start_tros += pattern_length) {
            if (i_str.substring(start_tros, start_tros+pattern_length) != pattern) {
                aquest_invalid = false;
                break;
            }
        }
        if (aquest_invalid) {
            return true;
        }
    }
    return false;
}
//console.log(invalid1.difference(invalid2)) //LOL i am using legacy js i això no em funciona
// -> console.log(set_difference(invalid1, invalid2)); //Damn I missed el fucking 11!, due to the NaN...
const invalid1 = new Set(); //i .has(), .add()
function set_difference(set1, set2) {
    answer = new Array();
    for (let elem of set1) {
        if (!set2.has(elem)) {
            answer.push(elem);
        }
    }
    return answer;
}
//Provat però not needed: BigInt(numb)

//Maybe primer hauria de provar si brute funciona. Però és lleig fer codi així...
//Però si després m'he de comprovar el meu propi codi per intentar trobar errors impossibles de js és una merda

reader.on('line', line => {
    line.split(',').forEach(range => {
        [start, end] = range.split('-');
        assert(start.length == end.length || start.length+1 == end.length); //per no haver de fer un bucle si no cal
        start_half = parseInt(start.substring(0, start.length/2)); //Ole again m'havia deixat el parseInt i feia algo estrany amb strings...
        if (isNaN(start_half)) { //Of course it was a fucking NaN related error. Fuck JAVASCRIPT. IT'S FUCKING BULLSHIT
            start_half = 1; //He perdut ns quant temps per aquesta tonteria....
        }
        end_half = parseInt(end.substring(0, (end.length+1)/2)); //LOL lenth still gotta remember that errors in js suck and watchout a lot!!
        [start, end] = [start, end].map(numb => parseInt(numb)); //aquí no és un forEach si no un map!

        //part1 v1 faster
        //console.log('checking from', start_half, 'to', end_half, 'in the range', start, 'to', end);
        for (let i = start_half; i <= end_half; i++) {
            //numb = parseInt(i.toString()*2); //again js fent no el q vull i convertint-me coses com li dona la gana
            numb = parseInt(i.toString().repeat(2));
            if (numb >= start && numb <= end) {
                part1 += numb;
            }
        }
        //cal comprovar el primer i l'últim només. Els altres estaran tots
        //en xifres imparells no cal comprovar res
        //o hardcode it i a córrer? Ja he tret la "meitat" de la complexitat crec
        //De moment no sembla q es rewardi l'eficiència so far 2 dies en l'event, pq el brute force segueix servint

        for (let i = start; i <= end; i++) {
            i_str = i.toString(); //part1 la versió tonta i lenta
            if (i_str.length % 2 == 0 && i_str.substring(0, i_str.length/2) == i_str.substring(i_str.length/2)) {
                part1_slow += i;
            }
            if (is_invalid(i)) { //upsies el if només va sempre entre parèntesi
                part2 += i;
            }
        }
    });
});
reader.on('close', () => {
    console.log(part1);
    console.log(part1_slow);
    console.log(part2);
});

//Damn hard programmating it was the way to go. So ugly ngl. It suits Javascript perfectly ig. I lost quite a lot of time
//thinking about what I was doing bad in the problem and turned out that the answer was using Javascript

//I guess JavaScript really is a language that was created really fast to do the job it was supposed to and you can not
//expect much of it. It excels in ignoring errors and giving a false result for everything than raising any error at all.
