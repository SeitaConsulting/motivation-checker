import { Component } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _processing: boolean = false;
  private _result = null;
  private _tmp = null;

  get processing(): boolean {
    return this._processing;
  }

  get result(): number {
    return this._result;
  }

  onSubmit(form): void {
    this.start();

    let value = form.value;
    if(value.expectacy == 0) value.expectacy = 0.0000000000000000000001;
    if(value.value == 0) value.value = 0.000000000000000000000000000001;
    value.impulsivity = 100 - value.impulsivity;

    this._tmp = (value.expectacy*value.value)/(value.impulsivity*value.delay);

    this.finish();
  }

  reset(): void {
    this._result = null;
    this._tmp = null;
  }

  start(): void {
    this._processing = true;
  }

  finish(): void {
    const time = 1000;
    const o = of('').pipe(delay(time));
    o.subscribe(() => {
      this._processing = false;
      this._result = this._tmp;
      console.log(this._result);
    });
  }
}
