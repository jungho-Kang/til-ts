# 함수

- 매개변수의 데이터 타입 정의
- 함수 실행 후 결과 값의 데이터 타입 정의

```ts
// 일반 js로 함수를 설명하는 경우
// 어떤 매개변수를 받고, 연산을 거치고, 최종 결과를 반환

// ts로 함수를 설명하는 경우
// `매개변수의 타입`은 어떤 것이고
// 연산을 거치고
// `어떤 타입의 결과 값`을 리턴
function add(a: number, b: number): number {
  return a + b;
}

const add2 = (a: number, b: number): number => a + b;
```

## 함수의 매개변수 정의

### 1. 매개변수 기본 값 정의

- 기본 값이 있으면 타입 추론함

```ts
// ts에서는 매개변수의 타입을 추론 못함
// 아래처럼 기본 값을 통해서 타입 추론
function add(a = 1, b = 2) {
  return a + b;
}
```

### 2. 선택적 매개변수

- 매개변수를 생략하고 싶다
- 즉, 있을 수도 있고 없을 수도 있는 경우
- 매개변수명 뒤에 `?`을 붙여서 옵션으로 처리가능

```ts
function add(a: number, b?: number) {
  if (b) {
    return a + b;
  }
  return a;
}
add(5);
```

### 3. 선택적 매개변수와 기본 값을 혼용할 수 없다

### 4. 선택적 매개변수와 객체 사용

```ts
type OrderOptions = {
  name: string;
  topping?: string;
  size?: string;
};

function makeOrder(option: OrderOptions) {
  // 객체 구조 분해 할당
  const { name, topping, size } = option;
  console.log(`${name} ${topping ? topping : ""} ${size ? size : ""}`);
}

makeOrder({ name: "딸기", topping: "땅콩", size: "big" });
makeOrder({ name: "딸기", topping: "땅콩" });
makeOrder({ name: "딸기" });
```

### 5. 선택적 매개변수와 콜백 함수

```ts
type OrderOptions = {
  name: string;
  // 함수 정의
  callback?: (message: string) => void;
};

function makeOrder(option: OrderOptions) {
  const { name, callback } = option;
  const say = `${name}을 구매했어요`;
  if (callback) {
    callback(say);
  }
}
makeOrder({ name: "책", callback: (go) => console.log(go) });
makeOrder({ name: "딸기" });
```

### 6. rest 매개변수

- 일반적 상황

```ts
function add(a: number, b: number, ...res: number[]) {
  console.log(res);
}
add(1, 2, 3, 4, 5);
```

- 만약 tuple을 이용한다

```ts
function add(a: number, b: number, ...res: [number, number, number]) {
  console.log(res);
}
add(1, 2, 3, 4, 5);
```

## 함수의 타입 표현식

```ts
// 일반적 화살표 함수
const add = (a: number, b: number) => a + b;

// 타입 추론으로 정의된 함수의 타입 어노테이션
const add2: (a: number, b: number) => number = (a: number, b: number) => a + b;
```

### 1. type으로 정의해보자

- type이란? 사용자가 이름을 정한 타입 별칭
- 개발자가 마음대로 이름 정한 타입 별칭

```ts
// 타입 추론으로 정의된 함수의 타입 어노테이션
const add2: (a: number, b: number) => number = (a: number, b: number) => a + b;

// 함수 타입정의
type Add = (a: number, b: number) => number;
const add2: Add = (a: number, b: number) => a + b;

// 실 활용에서 매개변수 타입 지정 필요없음
const add3: Add = (a, b) => a + b;
```

### 2. Call Signature

- 함수의 타입을 별도로 지정하는 또다른 방법
- type을 객체 형태로 생성합니다

```ts
// 타입 추론으로 정의된 함수의 타입 어노테이션
type Add = (a: number, b: number) => number;

// Call Signature로 타입 정의하기
type AddSignature = {
  // 이름 : 결과 값 데이터형
  (a: number, b: number): number;
};
const add3: AddSignature = (a, b) => a + b;
```

## 함수 타입의 호환

### 1. `매개변수 개수` 기준

#### 1.1. 매개변수 개수가 `작은 경우 호환 가능`

```ts
type Add = (a: number, b: number) => number;
const add: Add = (a, b) => a + b;
add(2, 3); // 정상 실행

type Add2 = (a: number, b: number) => number;
// 함수 타입 정의에서 매개변수 개수 보다 적어도 호환된다
// 넘치는 매개변수는 버린다
const add2: Add2 = (a) => 10;
add2(5, 10); // 어? 오류아니네?
```

#### 1.2. 매개변수 개수가 `크면 호환 안됨`

```ts
// 함수 타입 정의에서 매개변수 개수 보다 많으면 호환안된다
const add3: Add2 = (a, b, c) => 10; // 오류
```

### 2. `매개변수 타입` 기준으로 다르면 호환안됨

```ts
type Add = (a: number, b: number) => number;
const add: Add = (a, b) => a + b;
add(2, 3); // 정상 실행
add("A", "B"); // 오류
```

### 3. 반환 값의 타입을 체크한다

```ts
type Add = (a: number, b: number) => number;
// 함수 타입 정의에서 매개변수 개수 보다 적어도 호환된다
const add: Add = (a, b) => 10;

// 개수가 적으면 OK
// 넘치는 매개변수는 버린다
const add1: Add = (a) => 10;

// 개수가 많으면 Error
const add2: Add = (a, b, c) => 10; // 오류

// 매개변수 타입이 맞지 않으면 Error
const add3: Add = (a = "", b) => 10; // 오류

// 반환값의 타입이 맞지 않으면 Error
const add4: Add = (a, b) => "";

type Add_10 = (a: number, b: number) => 10;
// 함수 리턴 값의 차이로 Error
const add5: Add_10 = (a, b) => 100; // 오류
```

## 매개 변수 타입이 `만약 호환되는 타입`이라면 어떻게 될까?

- 매개변수 타입을 기준으로 호환성을 체크한다
- 그런데 우리가 아는 것과 `반대로 생각해야 한다` (매개변수 타입의 경우)
  - Super타입과 Sub타입이 있으면 Sub타입은 Super타입에 호환된다고 배웠다
  - 함수를 호환하는 경우는 반대로 생각하면 된다
- 호환 안되는 경우

```ts
// number는 수퍼타입이고, 10은 서브타입이다
type A = (value: number) => void;
type B = (value: 10) => void;

// 여기서는 매개변수 타입이 다르다
let a: A = (value) => console.log(value);
let b: B = (value) => console.log(value);

a = b; // 오류?
```

- 호환 되는 경우

```ts
type A = (value: number) => void;
type B = (value: 10) => void;
let a: A = (value) => console.log(value);
let b: B = (value) => console.log(value);

// 안되는 이유는 서브타입으로 변경되므로
a = b;
// 되는 이유는 수퍼타입으로 변경되므로
b = a;
```

```ts
type Animal = {
  name: string;
};
type Dog = {
  name: string;
  color: string;
};
let a: Animal = { name: "hong" };
let b: Dog = { name: "hong", color: "yellow" };

// Animal은 Dog의 수퍼타입이다
// Dog는 Animal의 필수 프로퍼티를 모두 가지고 있는 서브타입이다
// a = b; // OK
// b = a; // 오류

let animalFunction = (ani: Animal): void => {};
let dogFunction = (dog: Dog): void => {};

// 함수 매개변수의 타입 호환은 일반적인 타입간의 호환과 반대로 생각해야 합니다
// 아래 코드는 다음처럼 시도한 것과 같습니다
// 함수명 (ani:Animal) {
//   ani.name // 성공
//   ani.color로 접근하려고 하는 코드로 진행됨 => 그래서 오류 발생
// }
animalFunction = dogFunction;

// 함수명 (dog:Dog) {
//   dog.name // 성공
//   dog.color // 성공
// }
dogFunction = animalFunction;
```

## 리턴 타입이 `만약 호환되는 타입`이라면 어떻게 될까?

```ts
type A = (value: number) => 10;
type B = (value: number) => number;
let a: A = (value) => 10;
let b: B = (value) => value;

// 우리가 생각하는 Super타입과 Sub타입의 호환이 유지된다
a = b; // 오류
b = a; // OK
```

## 함수 오버로딩

- 우리는 ts 작업에서 외부 라이브러리 (모듈) 활용 많이함
- 많은 라이브러리들이 함수 사용하는 여러가지 형태를 제공합니다
- 직접 `함수 오버로딩`을 제작하기 보다는 라이브러리 이해를 위해서 알아야 함
- 동일한 이름의 함수이고, 구분은 매개변수 갯수 차이, 매개변수 타입 차이를 활용
- 타입스크립트, java, c#, c++에 있는 문법 (js 기준)

```ts
function go() {}
function go(a: number) {}
function go(a: number, b: number) {}

go();
go(1);
go(1, 2);
```

### 1. 함수 오버로딩 작성법

- 오버로딩 시그니처 정의 (함수몸체 없음)
- 함수몸체를 별도로 정의
  - 함수 이름은 동일함
  - 매개변수는 ?를 적용한 가변 매개변수
  - 함수몸체에 타입좁히기로 마무리한다

```ts
// 오버로딩 시그니처를 먼저 생성
// 함수 몸체가 없다
function go(a: number): void;
function go(a: number, b: number): void;
function go(a: number, b: number, c: number): void;
// 함수 몸체를 작성하는 문법 (구현 시그니처)
// 오버로딩을 구현하는 문법은 매개변수에 옵션을 적용함
// 함수 몸체에서 타입좁히기를 작성한다
function go(a: number, b?: number, c?: number): void {
  if (typeof b === "number" && typeof c === "number") {
    console.log(a + b + c);
  } else if (typeof b === "number") {
    console.log(a + b);
  } else {
    console.log(a);
  }
}
// go(); // 오류 발생 (매개변수가 없어서)
go(1); // 매개변수 1개 처리
go(1, 2); // 매개변수 2개 처리
go(1, 2, 3); // 매개변수 3개 처리
// go(1, 2, 3, 4); // 오류 발생 (매개변수 4개짜리가 없다)
```

## Custom Type Guard

- 사용자정의 타입가드 (타입을 명확히함)
- 외부 개발자 또는 라이브러리에서 만들어둔 타입을 활용하는 경우
- 정확한 타입을 지정하는 경우 활용

```ts
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
```
