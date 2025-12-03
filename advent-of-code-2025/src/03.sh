#!bin/bash

# - Aquí sí q s'ha de posar \n en l'última línia del fitxer d'input
# - Important no posar espais entre l'igual i les variables!
# - Doble parèntesi per avaluar sumes
# - Es pot posar ; per acabar una linia abans

# 2022: Bash functions can't return values!
# We need to echo the values and capture them in a variable

max_and_pos() {
    values=$1
    max=-1
    pos=-1
    for (( i=0; i<${#values}; i++ )); do
        numb="${values:$i:1}"
        if [ $numb -gt $max ]; then
            max=$numb
            pos=$i
        fi
    done
    echo $max $pos
}
part1=0
part2=0

while read line
do
    (( first_length=${#line}-2 )) # necessari el doble parèntesi per poder fer operacions
    read -r first_val first_pos <<<$(max_and_pos ${line:0:first_length}) # damn sh does the job but looks so weird
    second_start=$first_pos+1
    (( second_length = ${#line} - second_start - 1)) # YAY making these variables again looking at part2 fixed it directly ✌️
    second_val=$(max_and_pos ${line:second_start:second_length} | awk '{print $1}')
    (( part1+=$first_val*10 + $second_val ))

    # Damn cleaning it and starting kinda again and doing it simpler was much much faster and easier! Think before writing,
    # even more in a unfamiliar language where doing anything takes quite a considerable amount of time
    line_val=0
    line_start=0
    for ((i = 0; i < 12; i++)); do
        (( maximum_end = ${#line} - line_start - (12-$i) ))
        read -r next_val new_offset <<<$(max_and_pos ${line:line_start:maximum_end})
        (( line_start = $new_offset + $line_start + 1)) # en expressions matemàtiques sí q puc posar espais
        (( line_val = line_val*10 + next_val ))
    done
    (( part2+=$line_val ))
done

echo part1: $part1
echo part2: $part2
