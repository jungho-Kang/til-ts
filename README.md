# 객체 타입 호환성

## 1. object 타입의 호환성

- object는 모든 객체 타입의 수퍼타입이다
- object는 any, unknown의 서브타입이다

```ts
let obj: {
  name: string;
} = { name: "hong" };

let obj2: object = { name: "hong" };

let a: any = obj;
let b: unknown = obj2;
```

## 2. Array 타입의 호환성

- Array<any>는 모든 배열 타입의 수퍼타입이다
- Array<특정타입>은 더 구체적인 배열 타입의 수퍼타입이다

```ts
let numArr: number[] = [1, 2, 3];
let numArr2: Array<number> = [1, 2, 3];

// Array<any>는 Array<number>의 수퍼타입이다
let anyArr: Array<any> = numArr;
let anyArr2: any[] = numArr2;
```

## 3. 유니온(합집합) 타입의 호환성 (A | B)

- 아래 문장은 기본형 타입의 유니온
- 문자열 또는 숫자형 데이터를 대입할 수 있다
- 합집합 (서로 연관성이 전혀 없는 데이터 형을 조합한 새로운 타입정의)

```ts
type StringNumber = string | number;
```

- `A | B`는 `A 또는 B를 포함하는 두 타입의 수퍼타입`이다

```ts
type StringNumber = string | number;

// 문자열은 StringNumber타입의 서브타입이므로 업캐스팅 된다
let now: StringNumber = "hello";
// 숫자 데이터는 StringNumber타입의 서브타입이므로 업캐스팅 된다
now = 12;
```

### 3.1. 데이터를 변수에 담아서 `변수로 전달`할 때

- 같은 종류의 객체라고 인정해줘 (객체 타입 호환성)

```ts
type Animal = {
  name: string;
  age: number;
};
type Cat = {
  name: string;
  age: number;
  color: string;
};
```

- `변수로 전달`할 때

```ts
const 야옹: Cat = { name: "hong", age: 21, color: "노랑" };

// 타입이 안맞는데? 오류 아냐?
// TS에서는 객체 값을 입력할 때 속성을 비교합니다
// 프로퍼티 개수가 적은 타입에 프로퍼티 개수가 많은 타입을 업캐스팅 해줌
// 최소 조건을 만족했으니까 인정 (데이터 호환 가능)
const ani3: Animal = 야옹;
```

### 3.2. 데이터를 `객체리터럴`에 담아서 전달할 때

```ts
// color가 에러난다
// 리터럴 객체라서 프로퍼티 초과 에러가 발생한다
const gogo: Animal = { name: "hong", age: 21, color: "노랑" };
```

### 3.3. 데이터를 변수로 담아서 전달

```ts
const 동물: Animal = { name: "hong", age: 21 };
// Cat의 name, age, color 필수 프로퍼티를 충족하지 못함
const ani4: Cat = 동물; // 오류
```

### 3.4. 유니온 샘플

```ts
type Animal = {
  name: string;
  age: number;
};
type Cat = {
  name: string;
  age: number;
  color: string;
};

const 동물: Animal = { age: 12, name: "hong" };
const 고양이: Cat = { age: 12, name: "hong", color: "yellow" };

type Sample = Animal | Cat;
const now: Sample = 동물;
const now2: Sample = 고양이;
const now3: Sample = { age: 12, name: "hong", color: "yellow" };
// 실제 타입은 3가지가 나온다
// { age:number, name:string }
// { age:number, name:string, color:string }
// { age:number, name:string, color:string }
```

## 4. 인터섹션(교집합 - Intersection) 타입 (A & B)

- A & B는 A도 만족하고, B도 만족하는 타입
- A & B는 A와 B 모두의 서브타입

```ts
type Wow = number & string;
// 서로 교차하는 공통의 데이터 종류가 없으므로
// 결코 존재할 수 없는 타입이므로 never로 된다
const go: Wow = 1; // 오류
```

```ts
type Person = { name: string };
type Employ = { company: string };
type Sample = Person & Employ;

// 속성이 한 개만 누락되어도 오류다
const whoA: Sample = { name: "hong" }; // 오류
const whoB: Sample = { company: "green" }; // 오류

// Sample 타입은 Person과 Employ를 모두의 서브타입이므로
// 두 타입의 데이터가 모두 있어야 한다
const whoC: Sample = { company: "green", name: "hong" }; // 정상
```
