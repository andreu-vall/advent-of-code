// +build none
// per si calgués ignorar el warning vermell del .c però encara surt un de groc amb això amb l'extensió de VSCode de Go fsr

package main

//He desinstal·lat l'extensió del VSCode però no borro el Go de moment, està en C:\Program Files\Go\ 200MB teòricament
//Experiència millor q l'any passat suposo, però l'he hagut de tornar a instal·lar pq sembla q el vaig borrar fsr

import ( //LOL això se m'ha posat sol amb l'extensió quan guardo
	"bufio"
	"fmt"
	"os"
	"slices"
	"sort"
	"strconv"
	"strings"
)

func euclid_sq_dist(p1 [3]int, p2 [3]int) int {
	return (p2[0]-p1[0])*(p2[0]-p1[0]) + (p2[1]-p1[1])*(p2[1]-p1[1]) + (p2[2]-p1[2])*(p2[2]-p1[2]) //a bit ugly ngl
}

// yikes no calia aquest mètode però ara ja no el borraré suposo
func make_sorted_grups(grups []int) []int {

	dict := make(map[int]int)
	for _, num := range grups {
		dict[num] += 1
	}
	sizes := make([]int, len(dict))
	var i = 0
	for _, value := range dict {
		sizes[i] = value
		i += 1
	}
	slices.Sort(sizes)
	slices.Reverse(sizes)
	return sizes
}

func main() {
	var MAX_SIZE = 2000
	scanner := bufio.NewScanner(os.Stdin)
	matrix := make([][3]int, MAX_SIZE)
	var n = 0
	for scanner.Scan() {
		res := strings.Split(scanner.Text(), ",")
		for i := 0; i < 3; i++ {
			matrix[n][i], _ = strconv.Atoi(res[i]) //ignore error
		}
		n += 1
		if n == MAX_SIZE {
			panic("too few space")
		}
	}
	distances := make([][3]int, n*(n-1)/2)
	var pos = 0
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			distances[pos] = [3]int{euclid_sq_dist(matrix[i], matrix[j]), i, j}
			pos += 1
		}
	}
	sort.Slice(distances, func(i, j int) bool {
		return distances[i][0] < distances[j][0]
	})

	grups := make([]int, n)
	for i := 0; i < n; i++ {
		grups[i] = i
	}
	var stop = false
	var connect = 0
	for stop != true { //el while loop s'ha de fer amb un for tot i ser el mateix...
		var i = distances[connect][1]
		var j = distances[connect][2]
		if grups[i] != grups[j] {
			var renamedGroupd = grups[j]
			for g := 0; g < n; g++ {
				if grups[g] == renamedGroupd {
					grups[g] = grups[i]
				}
			}
			var allGroupsAreSame = true
			for g := 0; g < n; g++ {
				if grups[g] != grups[grups[i]] {
					allGroupsAreSame = false
					break
				}
			}
			if allGroupsAreSame {
				stop = true
				fmt.Println("Part2:", matrix[i][0]*matrix[j][0]) //LOL no m'ho crec q l'exemple funcioni a la 1a xD
				//Damn also ha funcionat el problema a la 1a 😎😎😎😎😎
			}

		} else { //damn el else és required a la mateixa línia on es tanca el clauàtor del if!!!
			//fmt.Println("already connected", matrix[i], "and", matrix[j])
		}
		connect += 1
		if connect == 1000 { //part1
			var sizes = make_sorted_grups(grups) //ups no calia aquest mètode LOL
			fmt.Println("Part1:", sizes[0]*sizes[1]*sizes[2])
		}
	}
}
