import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private router: Router,
    private ref: ChangeDetectorRef,
    private mediaObserver: MediaObserver
  ) {}

  title = 'Sklep_Budowlany';
  mediaSub: Subscription;

  ngOnInit() {
    if (!navigator.onLine) {
      console.log('hello');
    }
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        console.log(change.mqAlias);
        console.log(change.mediaQuery);
      }
    );
  }
  ngAfterViewInit() {}

  ngOnDestroy() {
    if (this.mediaSub) {
      this.mediaSub.unsubscribe();
    }
  }

  //   this.mediaSub = this.mediaObserver.media$.subscribe(
  //     (change: MediaChange) => {
  //       console.log(change.mqAlias);
  //       console.log(change.mediaQuery);
  //     }
  //   );
  // }
  // ngAfterViewInit() {}
  // ngOnDestroy() {
  //   if (this.mediaSub) {
  //     this.mediaSub.unsubscribe();
  //   }
}
