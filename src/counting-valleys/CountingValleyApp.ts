export class CountingValleysApp {
  private seaLevel: number = 0;
  private readonly pathAsArray: string[] = [];

  constructor (
    private readonly steps: number,
    private readonly path: string
  ) {
    if (steps < 2) throw new Error('Steps must be greater than or equal to 2');
    if (steps < path.length) throw new Error('The steps are lower than path counting path');
    if (steps > path.length) throw new Error('The steps are greater than path counting path');

    this.pathAsArray = path.split('');
    const invalidPathChar = this.pathAsArray.find((letter: string) => letter !== 'U' && letter !== 'D');

    if (invalidPathChar !== undefined) throw new Error(`Invalid path char '${invalidPathChar}'. You must inform: 'U' or 'D'`);

    this.steps = steps;
    this.path = path;
  }

  countCrossingsValley(): number {
    let valleyCrossings = 0;
    let valleyRule = [-1, -2, -1, 0];

    for (let i = 0; i < this.steps; i++) {
      if (this.pathAsArray[i] === 'U') {
        this.seaLevel += 1;
      }

      if (this.pathAsArray[i] === 'D') {
        this.seaLevel -= 1;
      }

      for (let x = 0; x < valleyRule.length; x++) {
        if (valleyRule[x] === this.seaLevel) {
          valleyRule.splice(x, 1);
          break;
        }
      }

      console.log(this.seaLevel, valleyRule);

      if (valleyRule.length === 0) {
        valleyCrossings++;
        valleyRule = [-1, -2, -1, 0];
      }
    }

    return valleyCrossings;
  }
}
