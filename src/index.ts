// 약속을 지켜라
interface CarInterface {
  name: string;
  brand: string;
  price: number;
  stop(): void;
  move(): void;
}

interface ElectricInterface {
  battery: number;
  isBattery: boolean;
}

// 인터페이스를 구현하였음
// 인터페이스는 무조건 public(private, protected 없음)
class ElectricCar implements CarInterface, ElectricInterface {
  constructor(
    public name: string,
    public brand: string,
    public price: number,
    public battery: number,
    public isBattery: boolean
  ) {}
  stop() {
    console.log("멈춰라");
  }
  move() {
    console.log("움직여라");
  }
}

let 자동차 = new ElectricCar("캐스퍼", "현대", 1000, 100, true);
자동차.stop();
자동차.move();
