# 인터페이스

- type 문법이 먼저 정의됨
- type 문법으로 사용자정의 타입을 하다보니 부족하더라
- type 문법에서 추가적으로 나오게 된 것이 interface 입니다
- 많은 개발자들이 type과 interface를 혼란스러워 한다
- 거의 90% 이상은 type을 사용하는 곳이나 interface를 적용하는 곳이 같다
- interface는 type에 기능을 좀더 확장시키고, 원활하게 쓰도록 해주는 추가 문법니다

## 1. 인터페이스와 타입 정의의 공통점 예시

```ts
// 타입은 우리가 원하는 데이터 모양을 만들기 위한 것
type Animal = {
  readonly name: string;
  age?: number;
};
// 아래는 헝가리안 표기법
// c++, JAVA등에서는 I를 붙여서 interface로 컨벤션하더라
interface IAnimal {
  readonly name: string;
  age?: number;
}

const cat: Animal = {
  name: "야옹이",
  // age: 10,
};
// cat.name = "고양이"; // 오류 읽기 전용
const dog: IAnimal = {
  name: "멍멍이",
  // age: 10,
};
// dog.name = "댕댕이"; // 오류 읽기 전용
```

## 2. 인터페이스의 문법을 정의

- 데이터의 타입 종류가 `기본형`이면 `type`으로 정의하자
- 데이터의 타입 종류가 `객체형`이면 `interface`로 정의하자

```ts
type A = string | number;
interface B {}
```

- 데이터의 타입에 `확장(상속)`이 필요하다면 `interface`로 정의하자
- 단계 1

```ts
interface Animal {
  name: string;
  age: number;
}
interface Dog {
  name: string;
  age: number;
}
interface Cat {
  name: string;
  age: number;
}
interface Chicken {
  name: string;
  age: number;
}
```

- interface는 데이터 모양에 대한 약속, 규약

```ts
interface Animal {
  name: string;
  age: number;
}
interface Dog extends Animal {}
interface Cat extends Animal {}
interface Chicken extends Animal {}
```

- 규칙을 지키면서 추가(확장) 속성 정의

```ts
// 정의 되어야하는 속성에 대한 약속
interface Animal {
  name: string;
  age: number;
}
// 확장(상속)을 통한 기본 규칙을 지키고,
// 별도의 속성을 추가로 정의함
interface Dog extends Animal {
  isBark: boolean; // 추가 속성
}
interface Cat extends Animal {
  isScratch: boolean; // 추가 속성
}
interface Chicken extends Animal {
  isFly: boolean; // 추가 속성
}
```

- 기본 인터페이스 속성을 재정의 가능

```ts
// 정의 되어야하는 속성에 대한 약속
interface Animal {
  name: string;
  age: number;
}
// 확장(상속)을 통한 기본 규칙을 지키고,
// 별도의 속성을 추가로 정의함
interface Dog extends Animal {
  isBark: boolean; // 추가 속성
  name: "DOG"; // 속성 재정의 (호환가능해야 함)
  // age: "10살"; // 오류 : 기본 속성의 타입호환 안됨
}
interface Cat extends Animal {
  isScratch: boolean; // 추가 속성
  name: "CAT"; // 속성 재정의 (호환가능해야 함)
  // age: "10살"; // 오류 : 기본 속성의 타입호환 안됨
}
interface Chicken extends Animal {
  isFly: boolean; // 추가 속성
  name: "CHICKEN"; // 속성 재정의 (호환가능해야 함)
  // age: "10살"; // 오류 : 기본 속성의 타입호환 안됨
}
```

- 다중 확장(상속)이 가능하다

```ts
// 정의 되어야하는 속성에 대한 약속
interface Animal {
  name: string;
  age: number;
}
// 확장(상속)을 통한 기본 규칙을 지키고,
// 별도의 속성을 추가로 정의함
interface Dog extends Animal {
  isBark: boolean; // 추가 속성
}
interface Cat extends Animal {
  isScratch: boolean; // 추가 속성
}
interface Chicken extends Animal {
  isFly: boolean; // 추가 속성
}

// 다중 상속
interface DogCat extends Dog, Cat {}
const ani: DogCat = {
  name: "개냥이",
  age: 10,
  isBark: false,
  isScratch: true,
};
```

- 선언 합치기가 가능하다

```ts
// 아래 상황은 Person이 2번 정의됨으로 판단
interface Person {
  name: string;
  age: number;
}
type Person = {
  name: string;
  age: number;
};
```

```ts
// 아래 상황은 Person 인터페이스가 하나로 합쳐진다
interface Person {
  name: string;
  age: number;
}
interface Person {
  hobby: string;
}
// 최종 모양은 아래와 같다
interface Person {
  name: string;
  age: number;
  hobby: string;
}

const who: Person = {
  name: "hong",
  age: 10,
  hobby: "코딩",
};
```

- 주의 사항

```ts
// 아래 상황은 Person 인터페이스가 하나로 합쳐진다
interface Person {
  name: string;
}
interface Person {
  name: string;
  age: number;
}
interface Male extends Person {
  name: "MALE";
}
const who: Male = {
  // name: "홍", // 오류 발생
  name: "MALE",
  age: 10,
};
```

## 3. interface와 type 구분 (차이점)

- interface는 객체의 구조를 정의함
- type은 다양한 타입(유니온, 튜플 등) 정의가능
- `interface`는 `extends`로 확장 가능함
- `type`은 `& 연산자`로 확장 가능함
- `interface`는 `중복 선언가능`(자동 병합)
- type은 중복 선언 불가능
- `interface`는 컴파일 시 `최적화가 자동으로 진행`됨
- type은 최적화가 안되고 코드가 길어짐

## 4. interface의 이해

- 클래스에 반드시 구현해야 되는 기능을 사전에 정의

## 5. 정리

- `객체 데이터 모양`은 일단 `interface로 정의`한다고 생각하자
- 추후 Promise의 데이터 모양은 type이 아니라 interface를 활용하자
  - axios, fetch, XMLHttpRequest 등은 모두 Promise를 리턴한다
  - `function async 함수():Promise<인터페이스>`
