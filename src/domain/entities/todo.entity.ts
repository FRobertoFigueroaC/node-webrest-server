
export class TodoEntity {
  constructor(
    public id: number,
    public text:string,
    public completedAt?: Date | null
  ) {
    
  }

  get isCompleted(){
    return !!this.completedAt;
  }

  public static fromObject(object: {[key:string]: any}): TodoEntity {
    const {id, text, completedAt} = object;
    if (!id) throw 'Id is required';
    if (!text) throw 'Text is required';
    let newCompletedAt = null;
    if ( completedAt ) {
        newCompletedAt = new Date( completedAt );
        if (isNaN(newCompletedAt.getTime() )) {
          newCompletedAt = null;
          throw 'CompletedAt is not a valid date';
        }
    }

    return new TodoEntity(id,text, newCompletedAt);
  }
}