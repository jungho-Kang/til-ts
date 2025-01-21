# tsconfig.json의 세팅은 회사기준 별도

# package.json : npm 명세서

# 타입스크립트란

- `변수, 매개변수, 함수 리턴값의 타입(데이터 종류)를 작성`해주는 것

## 어노테이션(Annotation)

- 주석, 부가정보
- 코드 설명과 추가적인 정보를 제공하는 것을 말함

### typescript 어노테이션

```ts
const 변수명 : 데이터 타입;
function 함수명(매개변수 : 데이터타입) : 리턴타입 {
}
```

### 메타데이터 어노테이션

- 일반적인 자바스크립트와 달리 Node.js 또는 Spring에서 자주 봅니다
- `@`기호를 어노테이션이라고 한다
- 추가적인 정보를 제공하고 기능도 부여한다

```java
@어노테이션
@Entity
@Table(name = "테이블명")
public void 함수명() {
}
```

## ts 어노테이션을 이용한 기본 데이터(Primitive) 종류 명시

### 1. 변수 어노테이션

- `const 변수명: 데이터종류 = 값;`

```ts
const num: number = 1;
```

```ts
let num: number = 1;
let num1: number = 1.5;
let num2: number = 0x10;
let num3: number = Infinity;
let num4: number = -Infinity;
let num5: number = 1.5e10;
let num6: number = 1.5e-10;
let str: string = "안녕";
let bool: boolean = true;
let un: undefined = undefined;
let nu: null = null;

let hi: "안녕" = "안녕";
hi = "반가워"; // 오류

const age: 5 = 10;
```

### 2. 타입추론을 확인하고 잘못된 추론이면 직접 관여한다

- 일단 타입추론을 적극적으로 반영한다
- 필요 시에 어노테이션을 변경한다

```ts
let num: number | string = 1;
const go = "안녕";
num = "hello";
```

### 3. ts의 데이터 종류

- unknown
- any
- null
- void
- undefined
- never
- number
- Number Enum
- bigint
- string
- String Enum
- symbol
- unique symbol
- object
- array
- tuple
- function
- constructor

## 객체 중 배열과 튜플

### 1. 배열

- 배열을 만드는 법 1

  - `const arr = [1, 2, 3]`

- 배열을 만드는 법 2 (어노테이션 정의하기)

  - `const arr2: number[] = [1, 2, 3]`

- 배열을 만드는 법 3 (어노테이션 정의하기)

  - `const arr3: Array<number> = [1, 2, 3]`

```ts
// 배열
const arr: number[] = [1, 2, 3];
const arr2: number[] = [1, 2, 3];
// 제네릭이라는 문법 활용 시 < 데이터종류 >
const arr3: Array<number> = [1, 2, 3];
arr3[0] = "반가워"; // 요소 타입 오류

// 배열
const arr4 = ["안녕", "반가워"];
const arr5: string[] = ["안녕", "반가워"];
// 제네릭이라는 문법 활용 시 < 데이터종류 >
const arr6: Array<string> = ["안녕", "반가워"];
arr6[1] = 5000; // 요소 타입 오류

// 배열
const arr7 = [1000, "사과"];
const arr8: (number | string)[] = [1000, "사과"];
const arr9: Array<number | string> = [1000, "사과"];

arr9[1] = false; // 요소 타입 오류

// 배열
const todos = [
  { id: 1, title: "안녕", complete: false },
  { id: 2, title: "리액트", complete: true },
  { id: 3, title: "타입스크립트", complete: false },
];
const todos2: {
  id: number;
  title: string;
  complete: boolean;
}[] = [
  { id: 1, title: "안녕", complete: false },
  { id: 2, title: "리액트", complete: true },
  { id: 3, title: "타입스크립트", complete: false },
];

const todos3: Array<{
  id: number;
  title: string;
  complete: boolean;
}> = [
  { id: 1, title: "안녕", complete: false },
  { id: 2, title: "리액트", complete: true },
  { id: 3, title: "타입스크립트", complete: false },
];
```

### 2. 튜플

- Tuple은 ts에만 있습니다
- Tuple은 배열의 어노테이션입니다
- Tuple은 배열의 길이와 데이터 종류를 고정한다
- Tuple은 배열의 요소를 추가, 삭제 못한다

```ts
// 튜플
let arr: [number, number, number] = [1, 2, 3];
arr = [5, 6, 7];
arr = [3, 4, 5, 6, 7]; // 길이 초과 오류
arr = [1, 3, "안녕"]; // 데이터 종류 오류
arr.push(7); // 메서드로는 추가 가능
const arr2: [number, number, number] = [1, 2, 3];
// 제네릭이라는 문법 활용 시 < 데이터종류 >
const arr3: [number, number, number] = [1, 2, 3];
arr3[0] = "반가워"; // 요소 타입 오류

// 배열
const arr4: [string, string] = ["안녕", "반가워"];
const arr5: [string, string] = ["안녕", "반가워"];
// 제네릭이라는 문법 활용 시 < 데이터종류 >
const arr6: [string, string] = ["안녕", "반가워"];
arr6[1] = 5000; // 요소 타입 오류

// 배열
const arr7: [number, string] = [1000, "사과"];
const arr8: [number, string] = [1000, "사과"];
const arr9: [number, string | boolean] = [1000, "사과"];

arr9[1] = false; // 요소 타입 오류해결

// 배열
const todos: [
  { id: number; title: string; complete: boolean },
  { id: number; title: string; complete: boolean },
  { id: number; title: string; complete: boolean }
] = [
  { id: 1, title: "안녕", complete: false },
  { id: 2, title: "리액트", complete: true },
  { id: 3, title: "타입스크립트", complete: false },
];
const todos2: [
  { id: number; title: string; complete: boolean },
  { id: number; title: string; complete: boolean },
  { id: number; title: string; complete: boolean }
] = [
  { id: 1, title: "안녕", complete: false },
  { id: 2, title: "리액트", complete: true },
  { id: 3, title: "타입스크립트", complete: false },
];

const todos3: [
  { id: number; title: string; complete: boolean },
  { id: number; title: string; complete: boolean },
  { id: number; title: string; complete: boolean }
] = [
  { id: 1, title: "안녕", complete: false },
  { id: 2, title: "리액트", complete: true },
  { id: 3, title: "타입스크립트", complete: false },
];
```

### 3. 배열과 튜플의 메소드는 동일함

- 어차피 배열이다
- pop, push는 정상 작동 되어버린다
- 그래서 튜플을 안쓰게 되더라 (튜플 사용 경험이 적어짐)

## 객체 리터럴

```ts
let user = {
  name: "hong",
  age: 10,
};

let user2: {
  name: string;
  age: number;
} = {
  name: "hong",
  age: 10,
};

// 문제발생
// 옵션을 제공한다
let user3: {
  name: string;
  age: number;
  job?: string; // 옵션 적용("?")
} = {
  name: "hong",
  age: 10,
};
user3.job = "학생"; // 오류해결

// 문제발생
let user4: {
  readonly name: string; // 코딩중 변경 금지
  age: number;
} = {
  name: "hong",
  age: 10,
};
user4.name = "배신자"; // 오류
```

## 타입 별칭 (Type Alias)

- 기존의 데이터 종류에 `새로운 이름으로 타입 만드는 문법`
- 작성법 : `type 타입명(파스칼케이스) = 데이터형`로 선언

```ts
export type Member = {
  id: number;
  name: string;
  age: number;
  email: string;
  role: string;
  isAdmin: boolean;
  createdAt: string;
  phone?: string;
};

const user_hong: Member = {
  id: 1,
  name: "홍길동",
  age: 10,
  email: "a@a.net",
  role: "guest",
  isAdmin: false,
  createdAt: "2024-12-24",
};

user_hong.phone = "12345246";

const user_park: Member = {
  id: 2,
  name: "둘리",
  age: 10000,
  email: "b@b.net",
  role: "member",
  isAdmin: false,
  createdAt: "0000-12-24",
};
```

- 타입 별칭 주의사항 : 동일한 이름으로 type을 재정의할 수 없다

```ts
type User = {};

// 오류 아래처럼 재정의 하면 오류 발생
type User = {};
```

- 인덱스 시그니처의 이해

```ts
type City = {
  daegu: string;
  busan: string;
  jeju: string;
  seoul: string;
};

// 인덱스 시그니처로 변경해 봄
type CityS = {
  [key: string]: string;
};

const city: CityS = {
  daegu: "대구",
  busan: "부산",
  jeju: "제주",
  seoul: "서울",
};

type AreaNumber = {
  daegu: number;
  busan: number;
  seoul: number;
};

// 인덱스 시그니처로 변경해 봄
type AreaNumberS = {
  [key: string]: number;
};

const areaNumber: AreaNumberS = {
  daegu: 53,
  busan: 51,
  seoul: 2,
};
```

### type의 내용 정리

- `/src/types 폴더`를 통상 생성합니다
- 폴더 내에 type만 정의한 ts파일들이 다수 존재합니다

```ts
export type Todo = {
  id: number;
  title: string;
  content: string;
  completed: bool;
  date: Date;
};
export type User = {
  nickName: string;
  role: string;
  follow: string[];
};
export type Cart = {
  goodId: string[];
  total: number;
  count: number;
};
```

## Enum

- `/src/constants 폴더` 생성
- 프로젝트 내에서 공통으로 사용하는 변수들의 관련 문서
  - colors.ts, values.ts, countries.ts ..

```ts
// 회원의 등급을 설정하려고 합니다
// 특정 사항에 대해서 상수화 시켜서 코드를 관리하려는 의도

// 3 : 관리자
// 2 : 사장님
// 1 : 회원
// 0 : 방문객

// "admin" : 관리자
// "owner" : 사장님
// "member" : 회원
// "guest" : 방문객

const Admin = 3;
const Owner = 2;
const Member = 1;
const Guest = 0;

const user_hong = {
  nickName: "홍길동",
  role: Admin,
};

const user_park = {
  nickName: "둘리",
  role: Owner,
};
// 위의 상수 정의는 관리가 모호하다 라고 판단합니다
// 주석을 보지않으면 의미가 좀 모호하다

// enum을 도입해서 상수를 묶어서 관리해보자
// 같은 용도를 모아서 상수의 집합을 만들어서 활용해보자
// 특정한 값 지정이 없다면 0 부터 대입 후 증가
export enum MemberRole {
  Admin,
  Owner,
  Member,
  Guest,
}

const user_go = {
  nickName: "또치",
  role: MemberRole.Guest,
};

// enum을 이용하여 다국어 서비스를 관리하겠다
export enum Language {
  KOREAN = "ko",
  JAPAN = "jp",
  US = "en",
  CHINESE = "cn",
}

const user_jone = {
  nickName: "존",
  role: MemberRole.Guest,
  lang: Language.US,
};
```

## any

- ts 안 쓰려고 합니다
- `어노테이션 안 합니다` 라고 선언함
- 가능하면 any를 안 쓰려고 노력합니다
- js버전을 마이그레이션 하는 경우
- 해결이 안되는 경우의 어노테이션을 회피할 때 사용

```ts
let age: any = 15;
age = 100;
age = "안녕";
```

## unknown

- any와 흡사합니다
- 하지만 큰 차이가 있습니다
- 타입을 `if문`과 `typeof` 등으로 좁혀가면서 검사를 개발자가 해주어야 함
  - 타입 좁히기, 타입가드
- `타입 단언`(type assertion)
  - `믿어줘 이 타입 맞거든`이라고 알려주는 문법

```ts
let age: unknown = "hello";
if (typeof age === "string") {
  console.log(age.toUpperCase());
}
console.log((age as string).toUpperCase());
```

## any와 unknown 차이를 확실히 구분하기

```ts
let age: any = 15;
age = 100;
age = "안녕";

let ageUnknown: unknown = 15;
ageUnknown = 100;
ageUnknown = "안녕";

// any와 unknown의 차이를 이해하자
// js 데이터처리와 가장 흡사
let anything: any = "Hello, world";
anything = 123;
anything.toUpperCase(); // 오류 (문자 적용)
anything.toFixed(2); // 숫자 적용

let anythingUn: unknown = "Hello, world";
anythingUn = 123;
// any 보다는 unknown을 사용하세요
// 단 타입을 검사하는 조건을 넣어서 안전하게 사용하세요
if (typeof anythingUn === "string") {
  anythingUn.toUpperCase(); // 문자 적용
}
if (typeof anythingUn === "number") {
  anythingUn.toFixed(2); // 숫자 적용
}
```

```ts
// 변수 타입
// 매개 변수 타입 (학습 안함)
// 매개 변수는 VSCode가 자동으로 타입추론을 못함
// 함수 리턴 타입 (학습 안함)
function processAny(word: any) {
  console.log(word.toUpperCase());
}
processAny("hello");
processAny(123);

function processUnknown(word: unknown) {
  // unknown은 type guard를 활용하라
  // 타입 좁히기
  if (typeof word === "string") {
    console.log(word.toUpperCase());
  } else {
    console.log("글자를 전달하세요");
  }
}
processUnknown("hello");
processUnknown(123);
```

```ts
function processAny(person: any) {
  console.log(person.nickName.toUpperCase());
}
processAny({ nickName: "홍", age: 10 });
processAny({ age: 10 });

function processUnknown(person: unknown) {
  // unknown은 type guard 를 활용하라.
  //  타입 좁히기
  if (
    typeof person === "object" && // person이 객체인지 확인
    person !== null && // null인지 확인
    "nickName" in person && // nickName 속성이 있는지 확인
    typeof person.nickName === "string" // nickName이 문자열인지 확인
  ) {
    console.log(person.nickName.toUpperCase());
  } else {
    console.log("nickName 속성이 없거나 유효하지 않습니다.");
  }

  if (
    typeof person === "object" && // person이 객체인지 확인
    person !== null && // null인지 확인
    "age" in person && // age 속성이 있는지 확인
    typeof person.age === "number" // age가 숫자인지 확인
  ) {
    console.log(person.age.toFixed(2));
  } else {
    console.log("age 속성이 없거나 유효하지 않습니다.");
  }
}
processUnknown({ nickName: "홍", age: 10 });
processUnknown({ age: 10 });
```

```ts
function processAny(person: any) {
  console.log(person[0].toUpperCase());
}
processAny(["hong", "doolri"]);
processAny([123, 456]);

function processUnknown(person: unknown) {
  if (Array.isArray(person) && typeof person[0] === "string") {
    console.log(person[0].toUpperCase());
  } else {
    console.log("잘못된 배열입니다.");
  }
}
processUnknown(["hong", "doolri"]);
processUnknown([123, 456]);
```

```ts
const user = { id: 1, name: "" };
type User = { id: number; name: string };

function processAny(person: any): string {
  return person.name;
}
const result1 = processAny({ id: 1, name: "hong" });
const result2 = processAny({ id: 2 });

function processUnknown(person: unknown) {
  if (typeof person === "object" && person !== null && "name" in person) {
    return (person as User).name;
  }
  return null;
}
const result3 = processUnknown({ id: 1, name: "hong" });
const result4 = processUnknown({ id: 2 });
```

## never

- "절대로 일어나면 안됩니다" 라는 표현입니다 (불가능한 상황)
- "절대로 끝나지 않을 거야" 라는 표현입니다 (무한루프)
- 절대 발생하지 않는 상태를 표현할 때
- 항상 에러를 던지는 함수 표현
- 끝나지 않는 함수
- 불가능한 상태처리 등에 활용
- 타입 안정성을 높이고, 예외처리를 명확하게 하기 위한 용도

```ts
function go(): never {
  while (true) {}
}

function say(): never {
  throw new Error("error");
}
```

```ts
type Animal = "cat" | "dog" | "fish";
let a: Animal = "cat";
a = "dog";
a = "fish";
a = "horse"; // 오류

// Animal에 타입으로 정의한 것 이외에는 절대로 값이 존재하면 안됨
// 위의 문장을 어노테이션으로 타입을 표현하고 싶다
function say(who: Animal): string {
  if (who === "cat") {
    return "고양이";
  } else if (who === "dog") {
    return "강아지";
  } else if (who === "fish") {
    return "물고기";
  } else {
    // 이곳까지 코드가 흘러오면 안됩니다
    const no: never = who;
    throw new Error(`타입에 정의 안되었어요 ${no}`);
  }
}

say("horse"); // 오류가 있어도 js는 만들어 집니다
```

- 아무 값도 반환하지 않아요를 정확히 명시하고 싶은 경우

```ts
function throwError(message: string): never {
  throw new Error(message);
}
throwError("프로그램 중지");
```

- 무한루프 함수
  - 절대 끝나지 않는 함수의 리턴을 명확히 표현하고 싶다

```ts
function loop(): never {
  while (true) {
    console.log("안끝난다. 영원히");
  }
}
loop();
```

- 언제 사용할까?
  - switch, if~else 등 모든 경우를 처리한 이후
  - 항상 에러를 던져야 하는 함수
  - 무한 루프로 절대 종료되지 않는 함수
  - 명확한 코드 흐름 안내

## void

- `아무것도 없어요` 라는 의미
- 주로 `함수의 리턴 타입`으로 사용합니다

```ts
function func1(): string {
  return "hello";
}

// 함수에서 리턴하는 값의 종류는 비어있어요
function func2(): void {
  console.log("안녕");
}

// 값이 없다는 표현은 어떤게 있나요?
// 함수 반환(return)이 없으면 기본이 void 입니다
function func3(): void {}

// 아래 함수는 return undefined 작성
// 명시적으로 undefined를 리턴해야 한다면 작성해줘야 함
function func4() {
  return undefined;
}

// 명시적으로 return 후 값이 없는 함수라면
// void를 리턴합니다
function func5(): void {
  return;
}

// 명시적으로 null을 리턴하고 싶다면
// null을 리턴해야 한다
function func6(): null {}
function func7() {
  return null;
}
```

- void를 사용하는 곳
  - 아무것도 반환하지 않을 때
  - 반환값이 필요없는 콜백 함수
  - 비동기 함수에 리턴되는 값이 없음을 나타낼 때

```ts
// 비동기 함수
async function fetchGetTodo(): Promise<void> {
  const res = await fetch("주소");
}
async function fetchGetTodoOne(): Promise<string> {
  const res = await fetch("주소");
  return "hello";
}
async function fetchPostTodo(): Promise<boolean> {
  const res = await fetch("주소");
  return true;
}
type Todo = {
  id: number;
  title: string;
};
async function fetchSortTodo(): Promise<Todo> {
  const res = await fetch("주소");
  return { id: 1, title: "안녕" };
}
```
