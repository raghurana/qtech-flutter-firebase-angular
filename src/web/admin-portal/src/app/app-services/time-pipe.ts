import { Pipe, PipeTransform } from '@angular/core';
import { DataConverters } from './data.converters';

@Pipe({ name: 'time' })
export class TimePipe implements PipeTransform {
  transform(input: string): string {
    return DataConverters.Time.fromHHmmToAmPm(input);
  }
}
