// 안타깝게도 팀장님이 작성한 타입이라서
// 우리가 고쳐서 활용하기는 어렵다
// 원본을 수정할 수 없는데, 우리는 타입을 구분해야 하는 경우다
type Dog = {
  name: string; // 이름
  isBark: boolean; // 짖는다
};
type Cat = {
  name: string; //이름
  isScratch: boolean; // 할퀸다
};

// 정의되어진 타입을 활용한다 (타입을 사용하려는 개발자)
type Animal = Dog | Cat;
function go(ani: Animal) {
  // 타입가드
  if ("isBark" in ani) {
    console.log(ani + "는 강아지구나");
  } else if ("isScratch" in ani) {
    console.log(ani + "는 고양이구나");
  }
}

// 우리가 타입가드를 적용한 함수생성
// 참인지 아닌지에 따라서 타입의 종류를 리턴하여 타입좁히기 적용
function isDog(ani: Animal): ani is Dog {
  return (ani as Dog).isBark !== undefined;
}
function isCat(ani: Animal): ani is Cat {
  return (ani as Cat).isScratch !== undefined;
}

function goType(ani: Animal) {
  // 타입가드
  if (isDog(ani)) {
    console.log(ani + "는 강아지구나");
  } else if (isCat(ani)) {
    console.log(ani + "는 고양이구나");
  }
}
