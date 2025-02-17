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
