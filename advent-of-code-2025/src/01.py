import sys

dial = 50
cops_per_0 = 0
cops_per_0_dumb = 0

# Crec q la meva interpretació primera ja era la de la part 2...
# Però ho tenia slightly malament per quan acaba al 0 (ho comptava més d'un cop)

for line in sys.stdin:
    direction = line[0] # left -> lower numbers; right -> bigger ones (al revés del q em semblaria...)
    times = int(line[1:])
    assert times >= 1
    if times >= 100:
        cops_per_0 += times // 100
    nou_dial = dial + (times % 100) * (-1 if direction=='L' else 1)
    if nou_dial >= 100 or nou_dial <= 0 and dial > 0:
        cops_per_0 += 1
    dial = nou_dial % 100
    if dial == 0:
        cops_per_0_dumb += 1

print(cops_per_0_dumb)
print(cops_per_0)
