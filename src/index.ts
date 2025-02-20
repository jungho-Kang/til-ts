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
