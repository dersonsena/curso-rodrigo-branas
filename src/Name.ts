export class Name {
  constructor (private readonly name: string) {
    if (!/^([A-Za-z]+ )+([A-Za-z])+$/.test(name)) throw new Error('Invalid Name')
    this.name = name
  }

  value(): string {
    return this.name;
  }
}
