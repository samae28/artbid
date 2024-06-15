import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/compat/app';

@Pipe({
  name: 'timestampToDate',
})
export class TimestampToDatePipe implements PipeTransform {
  transform(value: firebase.firestore.Timestamp | Date): Date {
    if (value instanceof firebase.firestore.Timestamp) {
      return value.toDate();
    }
    return value;
  }
}
