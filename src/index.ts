type Person = {
  name: string;
  age: number;
};

function func(value: string | number | Date | null | Person) {
  if (typeof value === "string") {
    value.toUpperCase();
  } else if (typeof value === "number") {
    value.toFixed(2);
  } else if (value instanceof Date) {
    // Date라는 것을 보장받음
    value.getTime();
  } else if ("age" in (value as Person)) {
    console.log((value as Person).age);
  }
}
