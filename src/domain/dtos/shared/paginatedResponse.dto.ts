
interface Result {
  items: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    next?: number;
    prev?: number;
  };
}

export class PaginatedResponse {
  static formatResponse( items:any[], page: number, limit: number, total:number){
    const current: number = page * limit;
    let next: number = ( current >= total ) ? 0: (page + 1);
    let prev: number = ( page === 1 ) ? 0 : (page - 1);

    const result: Result = {
      items,
      pagination: { page, limit, total }
    }
    if ( next !== 0) {
      result.pagination.next = next
    }
    if ( prev !== 0) {
      result.pagination.prev = prev
    }

    return result
  }
}