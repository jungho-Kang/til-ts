# Generic Type 변수 : 타입 결정을 나중에 하겠다는 선언

- 타입스크립트에서 오류 체크가 가장 많이 나는 곳
- 정말 중요한 문법적 사항
- 경우의 수가 많고, 유틸리티와 연동되는 케이스가 많음
- `어떤 타입이 올지 모르지만, 나중에 결정하겠다`

## 1. `타입 변수`를 함수에 정의하기

- 나중에 데이터 타입을 결정하겠다
- 관례상 대문자 T, U, V 등을 사용합니다
- 타입스크립트는 최종적으로 js가 만들어진다
- 아래 처럼 작성하면 number 형태의 함수가 만들어진다

```ts
function showValue<T>(value: T): T {
  return value;
}

let test = showValue(10);
let test2 = showValue("안녕");
let test3 = showValue(true);
let test4 = showValue([1, 2, 3]);
```
