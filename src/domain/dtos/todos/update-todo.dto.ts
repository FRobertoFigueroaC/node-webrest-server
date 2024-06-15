

export class UpdateTodoDto {

  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: string
  ) {

  }

  get values(){
    const returnObj: {[key:string]: any} = {};

    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  static update( props: { [ key: string ]: any; } ): [ string?, UpdateTodoDto?] {

    const { id, text, completedAt } = props;
    let newDate = completedAt;

    if (!id || isNaN(Number(id))) {
      return ['ID must be a valid number', undefined]
    }

    if ( completedAt ) {
      newDate = new Date( completedAt );
      if ( newDate.toString() === 'Invalid Date' ) {
        return ['completedAt must be a valid date', undefined]
      }
    }

    return [ undefined, new UpdateTodoDto( id, text, newDate ) ];
  }
}