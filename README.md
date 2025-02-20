# Primitive (기본 데이터형)

- js와 ts에 모두 있는 데이터형

```ts
// Primitive (기본데이터 형)
/**
 * 6개의 타입 (js와 ts 공용으로 사용함)
 */
const stringVar: string = "hello";
const numberVar: number = 123;
const boolVar: boolean = true;
const nullVar: null = null;
const undefinedVar: undefined = undefined;
const symbolVar: Symbol = Symbol("hello");
// const bigIntVar: bigint = BigInt(9999999999);
```

- ts에만 존재하는 타입
- `any`와 `unknown`은 모든 값을 할당받을 수 있다
- `any`는 어디든 할당할 수 있다
- `unknown`은 어디에도 할당할 수 없다

```ts
// any는 아무 타입이나 할당할 수 있습니다
// type 체크 안합니다
// 과도하게 사용하시면 곤란합니다
let anyVar: any;
anyVar = stringVar;
anyVar = numberVar;
anyVar = boolVar;
anyVar = nullVar;
anyVar = undefinedVar;
anyVar = symbolVar;

// any라는 타입을 string, number에 대입함
let newStringVar: string = anyVar; // OK
let newNumberVar: number = anyVar; // OK

// unknown - 타입을 알 수 없다
let unknownVar: unknown;
unknownVar = stringVar;
unknownVar = numberVar;
unknownVar = boolVar;
unknownVar = nullVar;
unknownVar = undefinedVar;
unknownVar = symbolVar;

// unknown라는 타입을 string, number에 대입함
let newStringVar2: string = unknownVar; // Error
let newNumberVar2: number = unknownVar; // Error

// any 와 unknown 은 값을 대입할 때 다르다
```

# Object (배열, 객체)

## 배열(Array)

- 리스트(List)라고도 함

```ts
// Object (객체 형)
/**
 * Array
 */
const numberArr: number[] = [1, 2, 3];
const stringArr: string[] = ["a", "b", "c"];
const booleanArr: boolean[] = [true, false];
const stringNumberArr: (string | number)[] = ["a", 1, "b", 5];
const stringNumberBoolenaArr: (string | number | boolean)[] = [
  "a",
  1,
  true,
  "b",
  5,
];
// 제네릭 이용한다면?
const numberArrG: Array<number> = [1, 2, 3];
const stringArrG: Array<string> = ["a", "b", "c"];
const booleanArrG: Array<boolean> = [true, false];
const stringNumberArrG: Array<string | number> = ["a", 1, "b", 5];
const stringNumberBoolenaArrG: Array<string | number | boolean> = [
  "a",
  1,
  true,
  "b",
  5,
];
```

## 오브젝트

```ts
const obj: object = {};
const personObject: { name: string; age: number } = { name: "홍", age: 10 };
```

# type

- 개발자가 이름을 만들어서 정의하는 데이터타입
- ts에만 존재

```ts
/**
 * type
 */
type StringType = string;
const stringT: StringType = "hello";

type NumberType = number;
const numberT: NumberType = 100;

type NullType = null;
const nullT: NullType = null;

// 유니온을 이용한다면?
type StringNumberType = string | number;
let stringNumberType: StringNumberType = 1;
stringNumberType = "hello";
// stringNumberType = false; // Error

type GenderType = "male" | "female";

let genderType: GenderType = "female";
genderType = "male";
// genderType = "제3의"; // Error

// 객체를 타입으로 만들기
type TIdolType = { name: string; age: number };
```

# interface

- 개발자가 만드는 객체 모양의 데이터 타입

```ts
/**
 * interface
 * type은 기본형 데이터를 사용할 수 있지만
 * interface는 무조건 객체리터럴 형이어야 한다
 */
type TIdolType = { name: string; age: number };
interface IdolType {
  name: string;
  age: number;
}
// 현재까지는 type과 interface는 차이가 없다
// 차이점은 `=`을 사용하는지 아닌지의 차이

const bts: { name: string; age: number } = { name: "BTS", age: 10 };
const iu: { name: string; age: number } = { name: "아이유", age: 30 };
const blackPink: { name: string; age: number } = { name: "블랙핑크", age: 25 };

// 타입
const bts1: TIdolType = { name: "BTS", age: 10 };
const iu1: TIdolType = { name: "아이유", age: 30 };
const blackPink1: TIdolType = { name: "블랙핑크", age: 25 };

// 인터페이스
const bts2: IdolType = { name: "BTS", age: 10 };
const iu2: IdolType = { name: "아이유", age: 30 };
const blackPink2: IdolType = { name: "블랙핑크", age: 25 };

// 객체 속성의 옵션 `?`을 살펴보자
type OptionalIdol_Type = {
  name: string;
  age: number;
  year?: number;
};
interface OptionalIdol_Interface {
  name: string;
  age: number;
  year?: number;
}

const iuT: OptionalIdol_Type = { name: "아이유", age: 30 };
iuT.year = 100; // 좋지 않아요
const btsI: OptionalIdol_Interface = { name: "BTS", age: 35 };
btsI.year = 2025; // 좋지 않아요
```

- type과는 다르게 interface는 무조건 객체 리터럴 타입만 들어감
- interface는 Primitive를 할당할 수 없다

# Enum

- 여러 개의 상수를 정의하고 사용할 때 편리
- 외부 연동 시 활용 추천

```ts
// 외부 연결 상태
function runNetwork() {
  let status: string = "INITIAL";
  try {
    status = "LOADING";
    // 중간 처리...
    status = "DONE";
  } catch (error) {
    status = "ERROR";
  } finally {
    return status;
  }
}

// 오타 발생 위험
if (runNetwork() === "DONE") {
  console.log("성공");
} else {
  console.log("실패");
}

// 오타 발생 위험 회피
const initState = "INITIAL";
const loadingState = "LOADING";
const doneState = "DONE";
const errorState = "ERROR";

// 외부 연결 상태
function runNetwork2() {
  let status: string = initState;
  try {
    status = loadingState;
    // 중간 처리...
    status = doneState;
  } catch (error) {
    status = errorState;
  } finally {
    return status;
  }
}

// 오타 발생 위험
if (runNetwork2() === doneState) {
  console.log("성공");
} else {
  console.log("실패");
}

// enum을 이용한 상수로 처리
// 관례상 속성은 대문자를 사용함
enum Status {
  INITIAL = "init", // 기본값 0
  LOADING = "loading",
  DONE = "done",
  ERROR = "error",
}
// 외부 연결 상태
function runNetwork3() {
  let status: string = Status.INITIAL;
  try {
    status = Status.LOADING;
    // 중간 처리...
    status = Status.DONE;
  } catch (error) {
    status = Status.ERROR;
  } finally {
    return status;
  }
}

// 오타 발생 위험
if (runNetwork3() === Status.DONE) {
  console.log("성공");
} else {
  console.log("실패");
}
```

# 타입 추론

- 타입 어노테이션 없이 타입 추론

```ts
/**
 * Type Inference (타입추론)
 */

// let str: string
let str = "hello";
// let num: number
let num = 100;

// const strConst: "hello"
const strConst = "hello";
// const numConst: 100
const numConst = 100;

// let bts: { name: string; age: number }
let bts = {
  name: "bts",
  age: 30,
};
bts.name = "비티에스";

// const iu: { name: string; age: number }
const iu = {
  name: "아이유",
  age: 30,
};
iu.name = "IU";

// 객체를 const화 하자
// const blackPink: { readonly name: "블랙핑크"; readonly age: 30 }
const blackPink = { name: "블랙핑크", age: 30 } as const;
blackPink.name = "HAHA";
```

```ts
/**
 * Type Inference (타입추론)
 */
// Array
// let numberArr: number[]
let numberArr = [1, 2, 3];
numberArr[0] = 100; // 가능
numberArr.push(2500); // 가능
// numberArr.push("300"); // Type Error
// let numberOrStringArr: (string | number)[]
let numberOrStringArr = [1, "2", 3, "4"];
numberOrStringArr[0] = "안녕하세요"; // 가능
numberOrStringArr.push("반가워요"); // 가능
// numberOrStringArr.push(false); // Type Error

// Tuple
// 배열의 요소의 개수와 각 요소의 데이터 타입을 미리 정의
// type const = readonly [1, 2]
const twoNumberArr = [1, 2] as const;
// twoNumberArr.push(5); // Error
// twoNumberArr[500] = 100; // Error

// let twoNumberArr2: readonly [1, 2]
let twoNumberArr2 = [1, 2] as const;
// twoNumberArr2[0] = 100; // Error
```

# Casting (캐스팅)

- 타입 추론을 조금 더 개발자가 구체화하는 것
- 특정 타입으로 지정하는 것
- js에는 없는 개념 (ts에만 존재)
- as는 타입을 강제로 변환하는데 정말 조심하자
- ts에서는 오류가 아닌데, 런타임에는 오류가 발생할 수 있다

```ts
/**
 * Casting (캐스팅)
 */
const numberVar = 20;
// const numberVar: 20으로 추론
// 아래는 `문자열`을 모두 대문자로 변경하는 함수
// numberVar.toUpperCase(); // Error

const sampleNumber: any = 5;
// ts에서 타입체크 못하고 런타임에 오류가 발생함
sampleNumber.toUpperCase(); // runtime Error

const count = 20;

// 무수한 코드 진행 후 필요에 의해서 아래 코드 진행
// 아래 코드는 개발자가 이건 반드시 string이니까 믿어줘
// let num: string
let num = count as unknown as string;

// 오류는 해결했지만, 런타입에는 오류가 발생
num.toUpperCase(); // 대문자로 고치기
```

# Union 기초

- 타입들을 합칠(병합할) 수 있는 여러 방법 중 하나이다
- `타입 | 타입` 형태로 사용

```ts
/**
 * Union 기본
 */
type StringOrBool = string | boolean;
let sb: StringOrBool = "안녕";
sb = false;

type StringOrBoolOrNull = string | boolean | null;
let sbn: StringOrBoolOrNull = "안녕";
sbn = false;
sbn = null;

type StateType = "LOADING" | "DONE" | "ERROR" | "INIT";

let state: StateType = "DONE";
// state = "GO"; // Type Error

// 배열(리스트)의 Union
type StringArrOrBoolArr = string[] | boolean[];
let saoba: StringArrOrBoolArr = ["아이유", "블랙핑크"];
saoba = [true, false, true];
// saoba = ["아이유", false]; // Type Error

type StringBoolArr = (string | boolean)[];
let sba: StringBoolArr = ["아이유", false];

// 인터페이스 Union
interface Animal {
  name: string;
  age: number;
}
interface Human {
  name: string;
  age: number;
  address: string;
}

type AnimalOrHuman = Animal | Human;

let aoh: AnimalOrHuman = {
  name: "아이유",
  age: 30,
  address: "서울",
};

// let aoh: Human
aoh;
// (property) Human.address: string
aoh.address;
// (property) Human.name: string
aoh.name;
// (property) Human.age: number
aoh.age;

aoh = { name: "댕댕이", age: 5 };
// let aoh: Animal
aoh;
// (property) Animal.age: number
aoh.age;
// (property) Animal.name: string
aoh.name;
// Property 'address' does not exist on type 'Animal'
// `Animal` 형식에 `address` 속성이 없습니다
// aoh.address; // Error
// (aoh as Human).address; // runtime Error. 반드시 확인하고 `as` 사용하는 것을 추천

// 위의 내용과는 완전 다르게 곂치는 속성이 없는 경우
// 위에서는 name과 age가 곂쳐 있었다
type Person = {
  name: string;
  age: number;
};
type Cat = {
  breed: string;
  country: string;
};
type PersonOrCat = Person | Cat;
let iu: PersonOrCat = {
  name: "아이유",
  age: 30,
};
let cat: PersonOrCat = {
  breed: "스핑크스",
  country: "이집트",
};

let who: PersonOrCat = {
  name: "아이유",
  age: 30,
  breed: "스핑크스",
  country: "이집트",
};
let who2: PersonOrCat = {
  name: "아이유",
  age: 30,
  breed: "스핑크스",
  // country: "이집트",
};

// 아래는 오류가 발생한다
// 병합된 타입중 적어도 하나의 타입에 대한 내용이 모두 있어야 한다
// 즉, Person 타입이나 Cat 타입 둘 중 하나의 타입에 일치하는 데이터가 존재해야 한다
let who3: PersonOrCat = {
  name: "아이유",
  // age: 30,
  // breed: "스핑크스",
  country: "이집트",
};
```

# Intersection Type

- 모든 타입을 만족하는 타입
- `타입 & 타입` 형태로 사용

```ts
/**
 * Intersection Type
 * Union은 하나는 만족해야 돼, 즉 OR 조건
 * Intersection은 모두 만족해야 돼, 즉 AND 조건
 */

// interface
interface Human {
  name: string;
  age: number;
}
interface Contact {
  phone: string;
  address: string;
}

type HumanAndContact = Human & Contact;
let iu: HumanAndContact = {
  name: "아이유",
  age: 30,
  address: "서울",
  phone: "000",
};

// 예외사항 (기본형에서는 관례상 사용하지 않는다)
// 절대로 존재할 수 없다는 표현이 never
// type StringAndNumber = never
type StringAndNumber = string & number;
// let iu2: StringAndNumber = never; // Error
```

# Narrowing (타입 좁히기)

- Union을 이용해서 만들어진 타입

```ts
/**
 * Narrowing
 */

let numberOrString: number | string;
// let numberOrString: string | number
numberOrString = "아이유";

// 타입 좁히기가 일어났다
// let numberOrString: string
numberOrString;

// 특정 값을 할당해서 타입 좁히기
let numberOrString2: number | string = "아이유";
// let numberOrString2: string
numberOrString2;

// typeof 연산자를 사용해서 타입 좁히기
// js가 런타임 중에 값이 결정되는 상황을 만들어 봄
let numberOrString3: number | string = Math.random() > 0.5 ? 123 : "아이유";

if (typeof numberOrString3 === "string") {
  // let numberOrString3: string
  numberOrString3;
} else if (typeof numberOrString3 === "number") {
  // let numberOrString3: number
  numberOrString3;
}

// 조건문에서 특정 값을 할당해서 타입 좁히기
let nullOrString: null | string[] =
  Math.random() > 0.5 ? null : ["아이유", "블랙핑크"];

if (nullOrString) {
  // let nullOrString: string[]
  nullOrString;
} else {
  // let nullOrString: null
  nullOrString;
}

// 비교문을 이용해서 타입 좁히기
// js에서는 불가능하지만 ts에서는 타입 비교를 사용할 수 있다
let numberOrString5: number | string = Math.random() > 0.5 ? 123 : "아이유";
let stringOrBool: string | boolean = Math.random() > 0.5 ? "아이유" : true;
if (numberOrString5 === stringOrBool) {
  // let numberOrString5: string
  numberOrString5;
  // let stringOrBool: string
  stringOrBool;
} else {
  // let numberOrString5: string | number
  numberOrString5;
  // let stringOrBool: string | true
  stringOrBool;
}

let numberOrStringOrNull: number | string | null =
  Math.random() > 0.5 ? 123 : Math.random() > 0.5 ? "아이유" : null;
if (typeof numberOrStringOrNull === "number") {
  // let numberOrStringOrNull: number
  numberOrStringOrNull;
} else if (typeof numberOrStringOrNull === "string") {
  // let numberOrStringOrNull: string
  numberOrStringOrNull;
} else {
  // let numberOrStringOrNull: null
  numberOrStringOrNull;
}

// in 연산자로 타입 좁히기
interface Human {
  name: string;
  age: number;
}
interface Dog {
  name: string;
  type: string;
}
let human: Human = { name: "아이유", age: 30 };
let dog: Dog = { name: "뽀삐", type: "강아지" };
let humanOrDog: Human | Dog = Math.random() > 0.5 ? human : dog;

// "age"라는 프로퍼티가 있는지 확인
if ("age" in humanOrDog) {
  // let humanOrDog: Human
  humanOrDog;
} else {
  // let humanOrDog: Dog
  humanOrDog;
}

// instanceof 연산자로 타입 좁히기
let dateOrString: Date | string = Math.random() > 0.5 ? new Date() : "아이유";

// Date라는 class로 만들어진 객체인지 확인
if (dateOrString instanceof Date) {
  // let dateOrString: Date
  dateOrString;
} else {
  // let dateOrString: string
  dateOrString;
}

// Discriminated Union
// 특정 속성에 상수로 문자열을 배치해서 비교하는 타입 좁히기
interface Animal {
  type: "dog" | "human";
  height?: number;
  breed?: string;
}

let animal: Animal =
  Math.random() > 0.5
    ? { type: "human", height: 180 }
    : { type: "dog", breed: "스핑크스" };

if (animal.type === "human") {
  animal.height;
} else {
  animal.breed;
}

// 위의 사항은 정확한 타입을 좁혀준 상황이 아니다
interface Human2 {
  type: "human";
  height: number;
}
interface Dog2 {
  type: "dog";
  breed: string;
}
type HumanOrDog2 = Human2 | Dog2;
let animal2: HumanOrDog2 =
  Math.random() > 0.5
    ? { type: "human", height: 180 }
    : { type: "dog", breed: "스핑크스" };
if (animal2.type === "human") {
  // let animal2: Human2
  animal2;
} else {
  // let animal2: Dog2
  animal2;
}

switch (animal2.type) {
  case "human":
    // let animal2: Human2
    animal2;
    break;
  case "dog":
    // let animal2: Dog2
    animal2;
    break;
}
```

# 함수

```ts
/**
 * 함수
 */
// 기본적으로 함수 파라메터는 any로 생각합니다
// 가능 하면 배제하고, 그래도 모르겠으면 차라리 unknown
function showName(name: any) {
  console.log(name);
}

function showName2(name: string) {
  console.log(name);
}

// `?` 옵션 파라메터
function showMember(name: string, age?: number) {
  console.log(name, age);
}

showMember("홍", 12);
showMember("홍");

// Rest 파라메터
// ...rest 는 배열타입이다
function showInfo(...args: string[]) {
  console.log(args);
}

function showInfo2(age: number = 0, ...args: string[]) {
  console.log(args);
}

// 함수의 리턴타입
// function add(a: number, b: number): number로 추론됨
function add(a: number, b: number) {
  return a + b;
}
function add2(a: number, b: number): number {
  return a + b;
}

// function ran(): "아이유" | 123로 추론됨
function ran() {
  return Math.random() > 0.5 ? "아이유" : 123;
}
function ran2(): "아이유" | 123 {
  return Math.random() > 0.5 ? "아이유" : 123;
}

// void 반환타입
// 아무것도 돌려주지 않아요
function notReturn() {
  //  ...
}

// never 반환타입
// 존재할 수 없다
function throwError(): never {
  throw new Error("내가 던지는 에러");
}

// 무한반복 (절대로 결과값이 안나오는 케이스)
function loop(): never {
  while (true) {
    // 실행
  }
}
```

# 함수 시그니처로 타입선언

- `시그니처란?` 어떤 것의 구조나 형태를 정의한 것

```ts
/**
 * 함수 시그니처로 타입 구성
 */

// type으로 함수의 타입 정의하기
const runner = () => {
  return ["아이유", "블랙핑크"].map((x) => x);
};

type Mapper = (x: string) => string;

const runner2 = (callback: Mapper) => {
  return ["아이유", "블랙핑크"].map(callback);
};

runner2((x) => `${x} 입니다`);

type TwoMembers = (a: number, b: number) => number;

// const twoFun: (a: number, b: number) => number
const twoFun = (a: number, b: number): number => a + b;
const twoFunT: TwoMembers = (a, b) => a + b;

const add = (a: number, b: number): number => a + b;
const minus = (a: number, b: number): number => a - b;
const multi = (a: number, b: number): number => a * b;
const divide = (a: number, b: number): number => a / b;

const add2: TwoMembers = (a, b) => a + b;
const minus2: TwoMembers = (a, b) => a - b;
const multi2: TwoMembers = (a, b) => a * b;
const divide2: TwoMembers = (a, b) => a / b;

// interface로 함수의 타입 정의하기
interface ITwo {
  // 키명 : 키값
  (a: number, b: number): number;
}

const add3: ITwo = (a, b) => a + b;
const minus3: ITwo = (a, b) => a - b;
const multi3: ITwo = (a, b) => a * b;
const divide3: ITwo = (a, b) => a / b;
```

# 함수 오버로딩

- 이렇게 하시면 코드가 더 복잡해 질겁니다
- 알아만 두시면 될 것 같습니다

```ts
/**
 * 함수 오버로딩
 * 하나의 함수로 여러 개의 처리를 진행하도록 구성
 */
// 매개 변수 1개, 매개변수 3개만 받아서 출력하는 함수
// 그런데 함수의 이름은 같다
function showString1(a: string): void {
  console.log(a);
}
function showString3(a: string, b: string, c: string): void {
  console.log(a, b, c);
}

// 나는 3개로 처리할거야 ?를 사용할거야
function showString(a: string, b?: string, c?: string): void {
  if (b && c) {
    console.log(a, b, c);
  } else {
    console.log(a);
  }
}

showString("A");
showString("A", "B", "C");
showString("A", "B"); // 오류는 아니지만 원하지 않는 기능으로 구현됨

// 함수 오버로딩
// 매개 변수 1개, 매개변수 3개만 받아서 출력하는 함수
// 그런데 함수의 이름은 같다
function showStringOver(a: string): void;
function showStringOver(a: string, b: string, c: string): void;

// 오버로딩 구현체
function showStringOver(a: string, b?: string, c?: string): void {
  if (b && c) {
    console.log(a, b, c);
  } else {
    console.log(a);
  }
}

showStringOver("A");
showStringOver("A", "B", "C");
// showStringOver("A", "B"); // 오류 => 오버로딩 정의에 없는 형태
```

# Type Predicate (타입 프레디케이트)

- 어떤 종류의 데이터 타입인지를 확인해서 데이터 타입 또는 boolean을 리턴
- 함수 뒤에 `매개변수 is 타입` 형태로 사용

```ts
/**
 * Type Predicate(타입 프레디케이트)
 */

// 숫자 데이터타입인지 아닌지 알아내는 함수
// true 또는 false만 알 수 있다
// 리턴값의 타입은 알 수 없다
// 리턴값의 타입을 알아낼 수는 없을까?
function isNumber(변수명: any) {
  return typeof 변수명 === "number";
}
// let a: boolean
// 나는 a가 number라고 타입이 추론되기를 원했다
// 그런데 a가 boolean이다
// 타입을 알아낼 수 없네
let a = isNumber(123);

// let b: boolean
let b = isNumber("안녕");

// 나는 true / false 가 아니고
// 리턴되는 값의 타입을 알고 싶다
// 그때 사용하는 게 타입 프레디케이트이다
function isNumber2(변수명: any): 변수명 is number {
  return typeof 변수명 === "number";
}
// let a2: number
let a2 = 123;
if (isNumber2(a2)) {
  // let a2: number
  a2;
}

// let b2: string
let b2 = "안녕";

if (isNumber2(b2)) {
  // let b2: never;
  // 원래는 string 이었는데 never로 변경되었다
  // never는 존재할 수 없는 타입이다
  b2;
}

/**
 * interface에서 타입 알아내기
 */
interface Dog {
  name: string;
  age: number;
}
interface Cat {
  name: string;
  breed: string;
}
type DogOrCat = Dog | Cat;
// 나는 Dog 타입인지, Cat 타입인지 정확히 타입을 좁히고 싶다
// Dog 타입이라면 Dog에 대한 코딩처리
// Cat이라면 Cat에 대한 코딩처리
// 여기서는 true / false가 아닌 타입을 리턴 받고싶다

// boolean 리턴
function isDog(변수명: DogOrCat) {
  return (변수명 as Dog).age !== undefined;
}

// type 리턴
function isDogTypeReturn(변수명: DogOrCat): 변수명 is Dog {
  return (변수명 as Dog).age !== undefined;
}
const doge: DogOrCat = { name: "강아지", age: 5 };

// true / false 체크 및 boolean 리턴
// 분명히 const doge: DogOrCat라고 타입을 정의했다
if (isDog(doge) === true) {
  // 타입 좁히기 성공
  // const doge: Dog
  doge;
  doge.age;
} else {
  // const doge: Dog라고 나오면 이상한거 아닌가요?
  doge;
  doge.age;
}
// 타입 체크 및 타입 리턴
// 분명히 const doge: DogOrCat라고 타입을 정의했다
// 아래 구문에서는
// const doge: Dog로 변환이 된다
if (isDogTypeReturn(doge)) {
  // 정확히 Dog 타입이 확인 되었으므로 Dog에 대한 코딩 처리가능
  doge;
  doge.age;
} else {
  // const doge: never로 추론됨
  // 아래는 타입이 never로 변경되었으므로 Dog 속성을 사용할 수 없다
  doge;
  doge.age; // Error => 정확히 타입체크 했으므로 오류가 맞다
}
```

# type과 interface의 차이점

1. type과 interface는 만드는 법이 다르다

```ts
type A = { age: 1 };
interface A {
  age: 1;
}
```

2. type에는 데이터 타입 할당가능, interface에는 할당 불가능

```ts
type A = string;
interface string // 이런 문법은 없다
```

3. type과 interface의 함수 시그니처(구조) 정의 차이

```ts
type A = (x: number) => number;
interface A {
  // 키명: 키값
  (x: number): number;
}
```

```ts
/**
 * type과 interface의 차이점
 */

// type에서만 가능한 문법
type String = string;
type unionT = string | number;
type tupleT = [string, number];

// interface에서만 가능한 문법
// interface 합치기

// 같은 이름으로 정의 가능 (2개가 합쳐짐)
interface Box {
  width: number;
}
interface Box {
  // 같은 이름은 사용 가능
  // 타입 변경은 불가능
  // width: string; // Error
  height: number;
}

// 타입은 같은 이름으로 정의 불가능
// type Go = {};
// type Go = {};

// 참고
class Review {
  // 속성 : Property (인스턴스에 소속)
  getX = (x: string) => {
    return x;
  };

  // 메소드 : Method (프로토타입에 소속)
  getXY(x: string) {
    return x;
  }
}

interface GetXnY {
  // 프로퍼티 형식
  getX: (x: number) => number;
  getY: (y: number) => number;
}
interface GetXnY {
  // 프로퍼티 형식
  getX: (x: number) => number;
  // getY: (y: string) => number; // Error => 매개변수 타입이 다름
  // getY: (y: number) => string; // Error => 리턴 타입이 다름
}

// 메소드 방식으로 Merging 하기
interface GetXnYMethod {
  // // 프로퍼티 형식
  // getXP: (x: number) => number;
  // getYP: (y: number) => number;

  // 메소드 형식
  getX(x: number): number;
  getY(y: number): number;
}

interface GetXnYMethod {
  // 메소드 형식
  // getX(x: number): number;
  // getY(y: string): number; // 매개변수 타입 변경가능
  getY(y: string): string; // 리턴 타입 변경가능
  // getY(y: string, z: number): string; // 매개변수 개수 변경가능
}

const testM: GetXnYMethod = {
  // (parameter) x: number
  getX(x) {
    return x;
  },

  // (parameter) y: string | number
  // 아래 오류 해결 필요
  getY(y) {
    if (typeof y === "string") {
      return y; // string을 반환
    } else {
      return y; // number를 반환
    }
  },
};

// 아래 코드로 진행 요청 (예제 1)
interface GetXnYMethod {
  getX(x: number): number;
  getY(y: number): number;
  getY(y: string): string;
}

const testM: GetXnYMethod = {
  getX(x) {
    return x;
  },

  getY(y: number | string) {
    return y as any;
  },
};

// 아래 코드로 진행 요청 (예제 2)
interface GetXnYMethod {
  getX(x: number): number;
  getY(y: number): number;
  getY(y: string): string;
}

const testM2: GetXnYMethod = {
  getX(x) {
    return x;
  },

  getY(y: any): any {
    return y;
  },
};
```

# type의 확장과 interface의 확장

```ts
/**
 * type의 확장과 interface의 확장
 * 누군가가 정의한 type과 interface에 필요로 한
 * 타입들을 추가로 기재하는 법
 */
// interface 확장 (extends)
interface IName {
  name: string;
}
interface IAge extends IName {
  age: number;
}
const iu: IAge = { name: "아이유", age: 30 };

// type의 확장 (&를 이용해서 확장)
type TName = {
  name: string;
};
type TAge = TName & {
  age: number;
};
const bp: TAge = { name: "블랙핑크", age: 28 };

// type을 이용해서 extends 가능
interface INameAge extends TName {
  age: number;
}
const bts: INameAge = { name: "BTS", age: 30 };

// interface를 이용해서 Intersection 가능
type TNameAge = IName & {
  age: number;
};
const aespa: TNameAge = { name: "에스파", age: 26 };

/**
 * 타입 여러 개를 상속받아서 확장하는 법
 * &를 이용한다
 */
type DogName = {
  name: string;
};
type DogAge = {
  age: number;
};
type DogBreed = {
  breed: string;
};

type Dog = DogName & DogAge & DogBreed;

/**
 * interface 여러 개를 상속받아서 확장하는 법
 */
interface CatName {
  name: string;
}
interface CatAge {
  age: number;
}
interface Cat extends CatName, CatAge {
  breed: string;
}

/**
 * OverRiding
 */
type THeight = {
  height: number;
};
type TRectangle = THeight & {
  height: string;
  width: number;
};

// string과 number를 &하면 never 타입이 나옴
// never는 존재할 수 없는 타입
const box: TRectangle = {
  // (property) height: never
  // height: 10, // Error

  // (property) height: never
  // height: "10", // Error

  width: 10,
};

// 위와 같은 상황을 해결하려면
type TWidth = {
  width: string | number;
};
type TRectangle2 = TWidth & {
  width: number;
  height: number;
};
const box2: TRectangle2 = {
  height: 10,
  // (property) width: number
  // 타입 좁히기로 해결
  width: 10,
};

// 인터페이스의 예
// 타입을 반드시 맞추어 주어야 한다
interface IHeight {
  height: number;
}
interface IWidth {
  width: number;
}
interface IRectangle extends IHeight {
  height: number; // 타입을 반드시 맞추어 준다
  // height: string; // Type Error
  width: number;
}
```

# Tuple

- js에는 존재하지 않음

```ts
/**
 * Tuple
 * 요소의 데이터 타입, 개수를 지정할 수 있다
 * 무조건 순서에 맞는 타입의 요소를 넣어야 한다
 * Tuple도 배열에 속함
 */
// 일반 배열 (string 배열)
let idolMembers: string[] = ["아이유", "핑클", "블랙핑크"];

// 튜플
let idolMembersTuple: [string, string, string] = ["아이유", "핑클", "블랙핑크"];

// 무조건 순서에 맞는 타입의 요소를 넣어야 한다
let iu: [number, string] = [30, "아이유"];

// js에서 배열로 바뀌므로 오류 없음 => [30, "아이유", "소녀시대"]
iu.push("소녀시대");

// Tuple의 요소 개수를 지켜주려면
let blackPink: readonly [number, string] = [32, "제니"];
// blackPink.push("홍길동"); // Error : readonly에 의해서 유지됨

// 배열 값을 Tuple로 정의하는 법
// let idols: readonly [30, "아이유"]
let idols = [30, "아이유"] as const;

/**
 * Named Tuple
 * 요소 타입의 이름을 주는 문법
 */
let actor: [string, number] = ["이병헌", 50];
let actor2: [name: string, age: number] = ["이병헌", 50];

/**
 * Tuple을 Tuple에 할당
 */
let ages: [number, number] = [1, 2];

// 아래는 가능
let sampleAges: [number, number] = ages;

// Error : 타입이 맞지 않음
// let sampleAges2: [string, number] = ages;

// Error : 요소 개수가 맞지 않음
// let sampleAges3: [number, number, number] = ages;

/**
 * Multi Dimension Tuple
 */
const idolDTuple: [string, number][] = [
  ["아이유", 30],
  ["블랙핑크", 32],
];
```

# ts 객체 상세히 알아보기

```ts
/**
 * 객체
 */
let obj: {
  age: number;
  name: string;
} = {
  age: 30,
  name: "아이유",
};

interface IPerson {
  age: number;
  name: string;
}

type TPerson = {
  age: number;
  name: string;
};

/**
 * 초과 속성 검사
 * 객체 리터럴로 값을 할당하는 경우에만 ts가 검사
 */

// 객체 리터럴로 정의한 객체
// 속성이 초과되었는지 검사를 ts가 실행합니다
// 아래의 예는 타입 정의가 없어서 실행하지 않고 있음
const iu = {
  name: "아이유",
  age: 30,
};

type TName = {
  name: string;
};
// 객체 리터럴로 정의
const iu2: TName = {
  name: "아이유",
  // age: 30, // Error (속성이 초과됨)
};

type TAge = {
  age: number;
};
// 객체 리터럴로 정의
const iu3: TAge = {
  age: 30,
  // name: "아이유", // Error (속성이 초과됨)
};

// 아래부터 조심해야 합니다
const bpink = {
  age: 32,
  name: "블랙핑크",
};
// 변수 즉 객체리터럴이 아닌 경우는 ts가 초과 검사를 안함
const bpink1: TAge = bpink;
bpink1.age; // 정상작동
// 실행 시에 오류 발생
// bpink1.name; // Error
```

```ts
/**
 * 중첩 속성 객체
 * 중첩 객체 사용은 지양합니다
 * 별도의 정의를 권장합니다
 */
type Person = {
  identify: {
    name: string;
    age: number;
  };
  country: string;
};

const iu: Person = {
  identify: {
    name: "아이유",
    age: 30,
  },
  country: "한국",
};

// 중첩은 배제하자
type Identify = {
  name: string;
  age: number;
};
type TPerson = {
  identify: Identify;
  country: string;
};

const iu2: TPerson = {
  identify: {
    name: "아이유",
    age: 30,
  },
  country: "한국",
};
```

```ts
/**
 * 객체 간의 Union
 */
const dogCat =
  Math.random() > 0.5
    ? { name: "멍멍이", age: 3 }
    : { name: "야옹", breed: "샴" };
/*
const dogCat: {
  name: string;
  age: number;

  breed?: undefined;

} | {
  name: string;
  breed: string;

  age?: undefined;
  
}
*/
dogCat;

// (property) name: string
dogCat.name;

// (property) age?: number | undefined
dogCat.age;

// (property) breed?: string | undefined
dogCat.breed;

// 타입스크립트는 타입 유추를 통해 허용되지 않는 접근을 막아, 오류를 최소화한다
interface Dog {
  name: string;
  age: number;
}
interface Cat {
  name: string;
  breed: string;
}
type DogCat = Dog | Cat;
const dogCat2: DogCat =
  Math.random() > 0.5
    ? { name: "멍멍이", age: 3 }
    : { name: "야옹", breed: "샴" };
dogCat2.name; // 정상
// dogCat2.age; // Error
// dogCat2.breed; // Error

// 타입 좁히기로 데이터 파악
if ("age" in dogCat2) {
  // const dogCat2: Dog
  dogCat2;
} else {
  // const dogCat2: Cat
  dogCat2;
}
```

```ts
/**
 * 객체 간의 인터섹션 `&`
 * 참고 (never)
 * type A = number & string
 */
type PersonT = {
  name: string;
  age: number;
};
type CompanyT = {
  company: string;
  comNumber: number;
};
type PersonAndCompany = PersonT & CompanyT;

// 모두 만족해야 한다
const iu: PersonAndCompany = {
  age: 30,
  name: "아이유",
  comNumber: 111,
  company: "회사",
};
```

# Key Value Mapping

- Key 값과 Value 값을 자동으로 매핑 시키는 방식

```ts
/**
 * Key Value Mapping
 */
enum State {
  LOADING,
  SUCCESS,
  ERROR,
  INITIAL,
}

// API 타입 1
type ApiState = {
  getUser: State;
  paginateUser: State | undefined;
  defenceUser: State | null;
  getPost: State;
};

// API 타입 2
type UserApiState = {
  getUser: State;
  paginateUser: State | undefined;
  defenceUser: State | null;
};

// API 타입 3
// 아래처럼 구성하면 타입 변경이 일어나도 추가 작업이 없다
// 속성 변화가 일어나도 ApiState의 속성 값과 같아진다
type UserApiState2 = {
  getUser: ApiState["getUser"];
  paginateUser: ApiState["paginateUser"];
  defenceUser: ApiState["defenceUser"];
};

// API 타입 4
type UserApiState3 = {
  [key in "getUser" | "paginateUser" | "defenceUser"]: ApiState[key];
};

// API 타입 5
// 유틸리티 타입

// 원하는 것만 뽑을 경우 (Pick)
type UserApiState4 = Pick<ApiState, "getUser" | "paginateUser" | "defenceUser">;

// 원하는 것만 제외하는 경우 (Omit)
type UserApiState5 = Omit<ApiState, "getPost">;

/**
 * keyof
 * 속성 값을 타입으로 알아내기
 */
type Allkeys = keyof ApiState;
const key1: Allkeys = "getUser";
const key2: Allkeys = "paginateUser";
const key3: Allkeys = "defenceUser";
const key4: Allkeys = "getPost";
// const key5: Allkeys = "Gogo"; // Error

// API 타입 6
// 속성 모두 가져오기
type UserApiState6 = {
  [key in keyof ApiState]: ApiState[key];
};

// 유틸리티 사용해보기
// 항목 한개 빼기
type UserApiState7 = {
  // getPost 속성은 제거하고 나머지를 뽑아서 정의
  [key in Exclude<keyof ApiState, "getPost">]: ApiState[key];
};

// 항목 한개 빼고 모두 옵션으로 바꾸어라
type UserApiState8 = {
  // getPost 속성은 제거하고 나머지를 뽑아서 정의
  [key in Exclude<keyof ApiState, "getPost">]?: ApiState[key];
};
```

# class

- 우리가 정의하기보다는 라이브러리들이 정의되어진 경우가 많다

```ts
/**
 * 클래스
 */
// 정의하는 법
class SampleClass {}

// 기본형
class Game {
  // 속성
  name: string;
  country: string;
  count: number;
  // new Game(...)하면 실행되는 인스턴스 생성자 함수
  constructor(name: string, country: string, count: number) {
    this.name = name;
    this.country = country;
    this.count = count;
  }
  // 메소드
  hi(): void {
    console.log(this.name, this.country, this.count);
  }
}
```

```ts
// 읽기 전용 속성
class Idol {
  // 속성 (읽기 전용)
  readonly name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const iu = new Idol("아이유", 30);
// iu.name = "iu"; // 오류 (읽기 전용)
iu.age = 10;
```

```ts
// 속성 초기화 하는 방법
class Person {
  // 필수로 값을 할당해야 합니다 (constructor 함수)
  name: string;
  // 초기값 세팅 완료
  age: number = 20;
  // optional 선언
  pet?: string;
  // undefined가 될 수도 있어서 필수값 아님
  petAge: number | undefined;

  constructor(name: string) {
    this.name = name;
  }
}
```

```ts
// 초기값은 내가 보증할게
class Go {
  // 반드시 있다는 표현 `!`
  stack!: string[];

  constructor() {
    this.init();
  }

  init() {
    this.stack = [];
  }
}
```

```ts
// 클래스는 데이터 타입으로 인정
// 클래스는 값의 타입으로 인정
class Dog {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  bark() {}
}

// let dog: Dog
let dog = new Dog("멍멍이");
// dog = 123; // Type Error
// dog = "댕이"; // Type Error
dog = {
  name: "야옹이",
  bark: () => {
    console.log("하이");
  },
};
```

```ts
// interface 구현 (implements)
// 약속을 지켜서 모든 내용을 채워라
interface Animal {
  name: string;
  age: number;
  jump(): string;
}
class Dog2 implements Animal {
  // 구현을 해야하는 항목
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  jump(): string {
    return this.name;
  }
  // 클래스 만의 기능
  go(): void {}
}

interface Pet {
  legs: number;
  bark(): void;
}

class Cat implements Animal, Pet {
  // Animal 구현
  name: string;
  age: number;
  // Pet 구현
  legs: number;
  constructor(name: string, age: number, legs: number) {
    this.name = name;
    this.age = age;
    this.legs = legs;
  }
  // Animal 구현
  jump(): string {
    return this.name;
  }
  // Pet 구현
  bark(): void {}
}

// type으로 Intersection
type AnimalAndPet = Animal & Pet;

class Cat2 implements AnimalAndPet {
  // Animal 구현
  name: string;
  age: number;
  // Pet 구현
  legs: number;
  constructor(name: string, age: number, legs: number) {
    this.name = name;
    this.age = age;
    this.legs = legs;
  }
  // Animal 구현
  jump(): string {
    return this.name;
  }
  // Pet 구현
  bark(): void {}
}
```

```ts
/**
 * 클래스
 */

// 아래 내용은 상당히 고급 내용인데 활용이 많이 됩니다
// constructor가 있는 인터페이스 정의
// 특히 제네릭에서 많이 활용
class IU {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
interface IConstructor {
  new (name: string, age: number): IU;
}

function createIU(constructor: IConstructor, name: string, age: number) {
  return new constructor(name, age);
}
let iu = createIU(IU, "아이유", 30);
```

```ts
/**
 * 클래스
 */
// 상속 (유전자를 내려받고 확장)
class Parent {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Child extends Parent {
  age: number;
  constructor(name: string, age: number) {
    super(name);
    this.age = age;
  }
}

class Child1 extends Parent {
  // 아래 코드가 자동으로 들어감 (디폴트 생성자)
  // constructor(name: string) {
  //   super(name);
  // }
}

let father = new Parent("홍판서");
father.name;

let son = new Child("홍길동", 10);
son.name;
```

```ts
/**
 * 클래스
 *
 * 접근 제한자 (Visibility Keyword)
 * 1. public : 코드 어디서나 접근 가능
 * 2. protected : 현재 클래스와 자식 클래스에서 접근 가능
 * 3. private : 현재 클래스에서만 접근 가능
 */
class Mom {
  public publicProperty: string = "public";
  protected protectedProperty: string = "protected";
  private privateProperty: string = "private";
  // js에서 사용하는 private
  #jsPrivate: string = "jsPrivate";
  test() {
    this.publicProperty;
    this.protectedProperty;
    this.privateProperty;
  }
}
class Son extends Mom {
  gogo() {
    this.publicProperty; // 가능 (public 접근 가능)
    this.protectedProperty; // 가능 (상속이므로 protected 접근 가능)
    // this.privateProperty; // 불가능 (상속이더라도 private라서 접근 불가)
    // this.#jsPrivate; // 불가능 (상속이더라도 private라서 접근 불가)
  }
}

const instance = new Son();
instance.publicProperty;
// instance.protectedProperty; // protected라서 외부에서 접근불가
// instance.privateProperty; // private라서 외부에서 접근불가
// instance.#jsPrivate; // #이라서 외부에서 접근불가
```

# Generic

- 타입을 마치 변수처럼 전달하기

```ts
/**
 * 제네릭
 * 함수에서 제네릭 사용하기
 */
function whatValue(value: any) {
  return value;
}
// const v: any
const v = whatValue("안녕");
// v.toFixed(3); // 런타임에 오류 발생

// 변수타입을 실행중에 전달할 수 없을까?
// Generic을 사용해보자
// T는 아무 의미가 없음
function genericWhatValue<T>(value: T): T {
  return value;
}
// const a: string
const a = genericWhatValue<string>("안녕");
// const b: number
const b = genericWhatValue<number>(1);

// 여러 개의 변수 타입을 전달가능
function genericMulti<T, U>(a: T, b: U): { a: T; b: U } {
  return { a, b };
}
// const d: { a: string; b: number }
const d = genericMulti<string, number>("아이유", 30);

// 클래스에서 제네릭 사용하기
class Idol {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
class Car {
  brand: string;
  codeName: string;
  constructor(brand: string, codeName: string) {
    this.brand = brand;
    this.codeName = codeName;
  }
}
// 인스턴스를 자동으로 만들어주는 함수
// 형태만 보아둡시다. 앞으로 일단 복사해서 씁시다
function makeInstance<T extends { new (...args: any[]): {} }>(
  constructor: T,
  ...args: any[]
) {
  return new constructor(...args);
}
// const go = new Idol("아이유", 30);
// const go2 = new Car("BMW", "M80");

const iu = makeInstance(Idol, "아이유", 30);
const bmw = makeInstance(Car, "BMW", "M80");
```

```ts
/**
 * 제네릭
 * 인터페이스에서 제네릭 사용하기
 */
interface DataCache<T> {
  data: T[];
  lastUpdate: Date;
}
const data: DataCache<string> = {
  data: ["a", "b", "c"],
  lastUpdate: new Date(),
};
const data2: DataCache<number> = {
  data: [1, 2, 3],
  lastUpdate: new Date(),
};

// 기본 타입을 지정할 수도 있다
interface DefineType<T = string> {
  data: T;
}
interface DefineType2<T = {}> {
  data: T;
}
// 아래는 기본타입 적용됨
const a: DefineType = {
  data: "안녕",
};
const b: DefineType<number> = {
  data: 100,
};
```

```ts
/**
 * 제네릭
 * 타입에서 제네릭 사용하기
 */
type GenericSample<T> = T;
// const a: string
const a: GenericSample<string> = "안녕";
// const b: number
const b: GenericSample<number> = 100;
// const c: boolean
const c: GenericSample<boolean> = true;

interface DoneState<T> {
  data: T[];
}
interface LoadingState {
  data: Date;
}
interface ErrorState {
  data: Error;
}

type State<T = string> = DoneState<T> | LoadingState | ErrorState;

let state: State = {
  data: ["a", "b", "c"],
};

state = {
  data: new Date(),
};

state = {
  data: new Error("로딩 실패"),
};

interface ITodo {
  id: number;
  title: string;
}
let todoState: State<ITodo> = {
  data: [
    { id: 1, title: "안녕" },
    { id: 2, title: "안녕2" },
    // { id: 3 } // 오류
  ],
};
```

```ts
/**
 * 제네릭
 * 클래스 정의에서 제네릭 사용하기
 */
class Pagination<T, U> {
  // 초기화 함
  data: T[] = [];
  message?: U;
  lastDate?: T;
}
let p = new Pagination<number, string>();
let p2 = new Pagination<string, string>();
class Pagination2<T, U, S> {
  // 초기화 함
  data: T[] = [];
  message?: U;
  lastDate?: S;
  // 생성자 함수에 제네릭 적용하기
  constructor(data: T[], message?: U, lastDate?: S) {
    this.data = data;
    this.message = message;
    this.lastDate = lastDate;
  }
}
let p3 = new Pagination2<string, string, Date>(
  ["a", "b", "c"],
  "안녕",
  new Date()
);
```

```ts
/**
 * 제네릭
 * 클래스 상속에서 제네릭 사용하기
 */
class Base<T> {
  // 초기값 있는 경우
  data: T[] = [];
}

class StringBase extends Base<string> {}
const a = new StringBase();
// (property) Base<string>.data: string[]
a.data;

// 자식 클래스가 타입을 결정 (자식 클래스가 부모 클래스에게 타입변수를 전달)
class NumberBase<U> extends Base<U> {}
const b = new NumberBase<number>();
// (property) Base<number>.data: number[]
b.data;

// interface 상속
interface BasicI {
  name: string;
}
class Idol<T extends BasicI> {
  // 초기값이 없으므로 constructor에서 세팅
  information: T;
  constructor(information: T) {
    this.information = information;
  }
}
// let iu: Idol<{ name: string; age: number; }>
let iu = new Idol({ name: "아이유", age: 30 });

// keyof를 같이 사용하기
const obj = { a: 1, b: 2, c: 3 };
function objectParser<T, U extends keyof T>(v1: T, v2: U) {
  return v1[v2];
}

const e = objectParser(obj, "a");

// 3항 연산자 예제
class Idol2 {
  // 초기화가 필요하므로 constructor에서 할당
  // 하지만 옵션으로 설정하였다
  type?: string; // string | undefined
}
class MaleIdol extends Idol2 {
  type = "남자 아이돌";
}
class FemaleIdol extends Idol2 {
  type = "여자 아이돌";
}
type SpecialIdol<T extends Idol2> = T extends MaleIdol ? MaleIdol : FemaleIdol;
const idol1: SpecialIdol<MaleIdol> = new MaleIdol();
idol1.type; // 남자 아이돌
const idol2: SpecialIdol<FemaleIdol> = new FemaleIdol();
idol2.type; // 여자 아이돌
```

```ts
/**
 * 제네릭
 * 클래스 메소드에서 제네릭 사용하기
 */
class idol<T> {
  id: T;
  name: string;
  constructor(id: T, name: string) {
    this.id = id;
    this.name = name;
  }
  // 메소드에 제네릭 적용하기
  sayHello<M>(memo: M) {
    return memo;
  }
}
const iu = new idol<string>("iu1004", "아이유");
// iu.sayHello<string>("안녕");
iu.sayHello("안녕");
// iu.sayHello<number>(1990);
iu.sayHello(1990);

// 아래는 한번 체크합시다
class Idol2<T> {
  sayHello<T>(memo: T) {
    return memo;
  }
}
// 인스턴스 생성 시 정의한 타입이 메소드의 타입에 영향을 주지 않음
const iu2 = new Idol2<string>();
iu2.sayHello<number>(1990);
iu2.sayHello(1990);
```

```ts
/**
 * 제네릭
 * 클래스 Implementation에서 제네릭 사용하기
 */
// 약속을 지켜라
interface Singer<T, U> {
  name: T;
  sing(year: U): void;
}
class Idol implements Singer<string, number> {
  // 초기값 필요
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  // 메소드
  sing(year: number): void {
    console.log(year);
  }
}

const iu = new Idol("아이유");
iu.sing(1990);

class Idol2<T, U> implements Singer<T, U> {
  // 초기값 필요
  name: T;
  constructor(name: T) {
    this.name = name;
  }
  // 메소드
  sing(year: U): void {
    console.log(year);
  }
}
const iu2 = new Idol2<string, number>("아이유");
```

```ts
/**
 * 제네릭
 * Promise에서 제네릭 사용하기
 */
const afterTwoTime = function (): Promise<string> {
  return new Promise((resolve) => {
    resolve("hi");
  });
};
```

# Utility 타입

```ts
/**
 * Utility 타입
 */

// Partial Type (가장 많이 사용하는 Utility 타입)
// 모든 속성에 옵셔널 체이닝 `?`을 붙인다
// 객체의 일부분만 수정이 가능하도록
interface Idol {
  name: string;
  age: number;
  groupName: string;
}
const suji: Idol = {
  name: "수지",
  age: 32,
  groupName: "black pink",
};

type IdolPartial = Partial<Idol>;
function updateIdol(origin: Idol, update: IdolPartial): Idol {
  return { ...origin, ...update };
}
const suji2 = updateIdol(suji, { age: 24 });

// Required (모두 필수 속성으로 변경)
interface Cat {
  name: string;
  age?: number;
  breed?: string;
}
type CatRequire = Required<Cat>;

// Readonly (모두 읽기 전용 속성으로 변경)
type CatReadonly = Readonly<Cat>;

// Pick (특정 속성만 선택해서 사용)
type CatPick = Pick<Cat, "age" | "breed">;

// Omit (특정 속성만 제외해서 선택)
type CatOmit = Omit<Cat, "name">;

// Exclude (특정 타입을 제외하고 사용)
type NoString = Exclude<string | boolean | number, string>;
type CatExclude = {
  [key in Exclude<keyof Cat, "name">]: Cat[key];
};

// Extract (특정 타입을 추출해서 사용)
type NoString2 = Extract<string | boolean | number, string>;
type CatExtract = {
  [key in Extract<keyof Cat, "age" | "breed">]: Cat[key];
};

// Parameters (매개 변수 타입을 사용)
function fun(x: number, y: number, z: boolean) {}
// type TParams = [x: number, y: number, z: boolean]
type TParams = Parameters<typeof fun>;
// type TParamsVoid = [a: number]
type TParamsVoid = Parameters<(a: number) => void>;

// ConstructorParameters (생성자 함수의 타입)
class Idol {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
// type TCS = [name: string, age: number]
type TCS = ConstructorParameters<typeof Idol>;

// ReturnType (함수의 리턴타입)
type sFn = (a: number) => number;
// type RT = number
type RT = ReturnType<sFn>;
// type RT2 = void
type RT2 = ReturnType<() => void>;

// Template Literal Type
type IU = "Iue";
// type UIU = "IUE" => 모두 대문자
type UIU = Uppercase<IU>;
// type SIU = "iue" => 모두 소문자
type SIU = Lowercase<IU>;
// type CIU = "Iue" => 첫글자 대문자
type CIU = Capitalize<IU>;
// type UCIU = "iue" => 첫글자 소문자
type UCIU = Uncapitalize<IU>;
```
