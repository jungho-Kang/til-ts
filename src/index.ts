type Cat = { kind: "CAT"; sound: string; color: string };
type Dog = { kind: "DOG"; sound: string; food: string };
type Bird = { kind: "BIRD"; sound: string; fly: boolean };
type Animal = Cat | Dog | Bird;
// 동물의 소리를 출력하는 기능
function song(what: Animal) {
  switch (what.kind) {
    case "CAT":
      console.log(`고양이 울음소리 : ${what.sound}`);
      break;
    case "DOG":
      console.log(`강아지  울음소리 : ${what.sound}`);
      break;
    case "BIRD":
      console.log(`새  울음소리 : ${what.sound}`);
      break;
  }
}
