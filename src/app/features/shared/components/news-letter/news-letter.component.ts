import { Component } from '@angular/core';

@Component({
  selector: 'app-news-letter',
  imports: [],
  template: `
    <p>Get Notified When We Are Ready</p>

    <div>
        <input type="text" placeholder="Email Address">
        <button>SEND</button>
    </div>
  `,
  styleUrl: './news-letter.component.scss'
})
export class NewsLetterComponent {

}
