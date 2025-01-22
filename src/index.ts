// 10은 number이고
// never는 모든 타입의 서브타입
// 10 수퍼타입이므로 단언가능
let num = 10 as never;

// 10은 number이고
// unknown은 최상위 수퍼타입
// 10은 unknown의 서브타입이므로 단언가능
let num2 = 10 as unknown;

// 10은 number이고
// string은 number의 수퍼 또는 서브타입이 아님
// 그래서 단언불가
let num3 = 10 as string;

// 아래는 좋지 않은 단언샘플
let num4 = 10 as unknown as string;
