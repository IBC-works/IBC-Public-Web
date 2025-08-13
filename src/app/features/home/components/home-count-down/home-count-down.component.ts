import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home-count-down',
  imports: [],
  template: `
      <div class="time-unit">
        <h1>{{Days}}</h1>
        <p>Days</p>
      </div>
      
      <div class="colunm">
        <span></span>
        <span></span>
      </div>

      <div class="time-unit">
        <h1>{{Hours}}</h1>
        <p>Hours</p>
      </div>

      <div class="colunm median">
        <span></span>
        <span></span>
      </div>

      <div class="time-unit">
        <h1>{{Minutes}}</h1>
        <p>Minutes</p>
      </div>

      <div class="colunm">
        <span></span>
        <span></span>
      </div>

      <div class="time-unit">
        <h1>{{Seconds}}</h1>
        <p>Seconds</p>
      </div>
  `,
  styleUrl: './home-count-down.component.scss'
})
export class HomeCountDownComponent implements OnInit, OnDestroy {
  private LauanchDateTime = new Date(2026,0,1).getTime()

  private CurrentDate = new Date()

  private interval = interval(1000)

  private subs?: Subscription

  private get TimeDiff () {
    const now = this.CurrentDate.getTime()

    return this.LauanchDateTime - now
  }

  get Days () {
    return Math.floor(this.TimeDiff / ((1000 * 60) * 60 * 24))
  }

  get Hours () {
    return Math.floor((this.TimeDiff / ((1000 * 60) * 60)) % 24)
  }

  get Minutes () {
    return Math.floor((this.TimeDiff / (1000 * 60)) % 60)
  }

  get Seconds () {
    return Math.floor((this.TimeDiff / 1000) % 60)
  }

  ngOnInit(): void {
    this.subs = this.interval.subscribe(() => this.CurrentDate = new Date())
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe()
  }
}
