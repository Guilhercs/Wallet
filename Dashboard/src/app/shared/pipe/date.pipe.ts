import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipe implements PipeTransform {

  transform(value: any) {
      let date = value.split('-').reverse().join('/');
    return date;
  }

}
