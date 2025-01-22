type Person = { name: string };
type Employ = { company: string };
type Sample = Person & Employ;

// 속성이 한 개만 누락되어도 오류다
const whoA: Sample = { name: "hong" }; // 오류
const whoB: Sample = { company: "green" }; // 오류

// Sample 타입은 Person과 Employ를 모두의 서브타입이므로
// 두 타입의 데이터가 모두 있어야 한다
const whoC: Sample = { company: "green", name: "hong" }; // 정상
