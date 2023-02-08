import { Pipe, PipeTransform } from "@angular/core";
import { orderBy } from 'lodash';

@Pipe({
  name: "sortBy"
})
export class OrderByPipe implements PipeTransform {
  transform(array: any, sortBy: string, order?: boolean): any[] {
    const sortOrder = order ? 'desc' : 'asc'; // setting default ascending order

    return orderBy(array, [sortBy], [sortOrder]);
  }
}