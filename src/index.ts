// 함수 리턴타입에서 리턴 종류를 모르면
// any 또는 void를 리턴한다
// 만약 원하는 것이 있다면 정확히 작성해야 한다
function showValue<T>(value: T): T {
  return value;
}

let test = showValue(10);
let test2 = showValue("안녕");
let test3 = showValue(true);
let test4 = showValue([1, 2, 3]);
