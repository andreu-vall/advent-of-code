#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

#define BIG_NUMBER 150

typedef struct {
    int x, y;
} Coord;

int getRemovablePapers(char **lines, int numLines, int lineLength, Coord *output) {
    int removablePapersCount = 0;
    for (int i = 0; i < numLines; i++) {
        for (int j = 0; j < lineLength; j++) {
            if (lines[i][j] == '@') {
                int adjacentPapers = 0;
                for (int k = i-1; k <= i+1; k++) {
                    for (int l = j-1; l <= j+1; l++) {
                        if (!(k==i && l==j) && k>=0 && k<numLines && l>=0 && l<lineLength && lines[k][l]=='@') {
                            adjacentPapers += 1;
                        }
                    }
                }
                if (adjacentPapers < 4) {
                    if (output != NULL) {
                        output[removablePapersCount] =  (Coord) {i, j};
                    }
                    removablePapersCount += 1;
                }
            }
        }
    }
    return removablePapersCount;
}

int main() {
    int numLines = 0;
    char **lines = malloc(sizeof(char*) * BIG_NUMBER);
    size_t size;
    int lineLength = getline(&lines[0], &size, stdin) - 2, newLineLength;
    while (1) {
        numLines += 1;
        newLineLength = getline(&lines[numLines], &size, stdin) - 2;
        if (newLineLength >= 0) {
            assert(newLineLength == lineLength);
        }
        else {
            break;
        }
    }
    printf("part1: %d\n", getRemovablePapers(lines, numLines, lineLength, NULL));

    //He de guardar les posicions q puc borrar per borrar-los tots alhora. Sinó hauria de fer una còpia del mapa
    int totalRemoved = 0;
    Coord *toRemove = malloc(sizeof(Coord) * BIG_NUMBER * BIG_NUMBER);
    while (1) {
        int newRemoved = getRemovablePapers(lines, numLines, lineLength, toRemove);
        if (newRemoved == 0) {
            break;
        }
        for (int i = 0; i < newRemoved; i++) {
            lines[toRemove[i].x][toRemove[i].y] = '.';
        }
        totalRemoved += newRemoved;
    }
    printf("part2: %d\n", totalRemoved); //Once again part2 without trying the example 😎😎
    return 0;
}
