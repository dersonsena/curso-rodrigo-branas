import { CountingValleysApp } from "./CountingValleyApp";

describe('Counting Valleys Class', () => {
  it('should throw an Exception when steps are lower than counting path', () => {
    expect(() => new CountingValleysApp(3, 'UUUUU')).toThrow(new Error('The steps are lower than path counting path'));
  });

  it('should throw an Exception when steps number is lower than 2', () => {
    expect(() => new CountingValleysApp(1, 'U')).toThrow(new Error('Steps must be greater than or equal to 2'));
  });

  it('should throw an Exception when steps are greater than counting path', () => {
    expect(() => new CountingValleysApp(10, 'UUUUU')).toThrow(new Error('The steps are greater than path counting path'));
  });

  it('should throw an Exception when invalid path character is provided', () => {
    expect(() => new CountingValleysApp(5, 'UDDUX')).toThrow(new Error("Invalid path char 'X'. You must inform: 'U' or 'D'"));
  });

  it('should return calculate corretly the crossings vallye', () => {
    const sut = new CountingValleysApp(8, 'UDDDUDUU');
    expect(sut.countCrossingsValley()).toBe(1);
  });

  it.only('should return 2 crossings in valley', () => {
    const sut1 = new CountingValleysApp(8, 'UDDDUDUU');
    const sut2 = new CountingValleysApp(8, 'DDUUUUDD');
    const sut3 = new CountingValleysApp(12, 'DDUUDDUDUUUD');
    const sut4 = new CountingValleysApp(10, 'DUDDDUUDUU');
    const sut5 = new CountingValleysApp(20, 'DDUUUDDDUUUDDDUUUDDU');
    const sut6 = new CountingValleysApp(12, 'DDUUDDUDUUUD');
    const sut7 = new CountingValleysApp(10, 'UDDDUDUDUU');

    // expect(sut1.countCrossingsValley()).toBe(1);
    // expect(sut2.countCrossingsValley()).toBe(1);
    // expect(sut3.countCrossingsValley()).toBe(2);
    // expect(sut4.countCrossingsValley()).toBe(2);
    // expect(sut5.countCrossingsValley()).toBe(3);
    // expect(sut6.countCrossingsValley()).toBe(2);
    expect(sut7.countCrossingsValley()).toBe(1);
  });
})
