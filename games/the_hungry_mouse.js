/*
@title: the_hungry_mouse
@author: KaiEtkin
*/

const player = "p";
const cheese = "c";
const cheese2 = "v";
const cheese3 = "b";
const cheese4 = "n";
const trap = "t";

setLegend(
  [ player, bitmap`
................
................
..........11....
..........11....
..........11.1..
....LLLLLLLL.11.
8..LLLLLLLLL11..
88.LLLLLLLLL1L..
.88LLLLLLLLLLL..
...LLLLLLLLLLL..
...LLLLLLLLLLL..
....LLLLLLLLL...
....LLLLLL......
................
................
................`],
  [ cheese, bitmap`
................
................
...............6
..............66
............6666
..........666666
........66666666
.....66666666666
...6666666666666
.666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
............6...
................`],
  [ cheese2, bitmap`
................
................
......666.......
.....666666.....
....666666666...
....666666666...
...66FF666666...
...66FF666666...
...66666666FF...
...666F6666FF...
...66FF66666F...
...66FF666666...
....6666666.....
................
................
................`],
  [cheese3, bitmap`
................
................
................
...6666.........
..666666........
..6FF6666.......
..66F66666......
..6666666666....
...6666F66666...
...6666FF6666...
....666FF666666.
.....6666666666.
................
................
................
................`],
  [cheese4, bitmap`
....66..........
....666.........
....6F66........
....6FF66.......
.....FF6666.....
...66666666.....
...666666666....
....6666666.....
....6FF6666.....
....6FF6FF6.....
....6666FF6.....
....6666666.....
....666666......
......6.........
................
................`],
  [trap, bitmap`
................
................
................
....CCCCCC......
....C1CCC1......
....C1CC11......
....C11C1C......
....CC1C1C......
....CC111C......
....CCCCCC......
....CC66CC......
....CC66CC......
....CCCCCC......
....CCCCCC......
....CCCCCC......
................`],
);

setSolids([]);

let level = 0;
let cheeses = 0;
let dead = false;
const levels = [
  map`
p...t..
...t.v.
.t.t..t
.c...t.
...t.n.
.t.b...
.t..t.t`,
];

setMap(levels[level]);

setPushables({
  [ player ]: [],
});

onInput("w", () => {
  getFirst(player).y -= 1
});

onInput("a", () => {
  getFirst(player).x -= 1
});

onInput("s", () => {
  getFirst(player).y += 1
});

onInput("d", () => {
  getFirst(player).x += 1
});

const constantCheck = () => {
  const { y: playerY, x: playerX } = getFirst(player);
 
  const gotCheese = tilesWith(cheese, player).length;
  const gotTrapped = tilesWith(trap, player).length;
  const gotCheese2 = tilesWith(cheese2, player).length;
  const gotCheese3 = tilesWith(cheese3, player).length;
  const gotCheese4 = tilesWith(cheese4, player).length;
  
  if (gotCheese) {
    cheeses = cheeses +1;
    addText(cheeses.toString(), { y: 1, color: color`7` });
    getFirst(cheese).remove()
  }
  if (gotTrapped) {
    dead = true;
    setMap(map`
tttttttt
tttttttt
tt....tt
tttttttt
tttttttt
tttttttt
tttttttt
tttttttt`);
    clearText();
    addText('You Lost!', {y: 4, color: color`7`});
    
  }

  if(gotCheese2){
    cheeses = cheeses +1;
        addText(cheeses.toString(), { y: 1, color: color`7` });

        getFirst(cheese2).remove()

  }
  if(gotCheese3){
    cheeses = cheeses +1;
        addText(cheeses.toString(), { y: 1, color: color`7` });

        getFirst(cheese3).remove()

  }
  if(gotCheese4){
    cheeses = cheeses +1;
        addText(cheeses.toString(), { y: 1, color: color`7` });

        getFirst(cheese4).remove()

  }
  
if(cheeses >= 4){
  setMap(map`
bbbbbbbb
bbbbbbbb
b......b
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb`);
    clearText();
    addText('You Won!!!!', {y: 4, color: color`7`});
}
};
afterInput(() => {
  constantCheck();
});
