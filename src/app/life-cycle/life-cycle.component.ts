import { AfterContentInit, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-life-cycle',
  templateUrl: './life-cycle.component.html',
  styleUrls: ['./life-cycle.component.css']
})
export class LifeCycleComponent implements OnChanges, OnInit, DoCheck, AfterViewInit, AfterContentInit, OnDestroy {

  changeCount = 0;
  initCount = 0;
  doCheckCount = 0;
  @Input() input: string = '';
  contentCount = 0;
  viewCount = 0;
  interval = 0;
  destroyCount = 0;
  changeCanvasFlag = false;
  initCanvasFlag = false;
  viewCanvasFlag = false;

  ngOnChanges(): void {

    this.changeCount++;
    this.changeCanvasFlag = true;
    const myPromise = new Promise(function (myResolve) {
      setTimeout(function () { myResolve("ok"); }, 3000);
    });

    myPromise.then(function (value) {
      console.log(value);
    });

    this.changeCanvasFlag = false;
  }

  ngOnInit(): void {
    this.initCount++;
    this.initCanvasFlag = true;
    const myPromise = new Promise(function (myResolve) {
      setTimeout(function () { myResolve('ok') }, 3000);
    });

    myPromise.then(function (value) {
      console.log(value);
    });
    this.initCanvasFlag = false;

    //setInterval(()=>{this.interval++},1000)
  }

  ngDoCheck(): void {
    this.doCheckCount++;
  }

  ngAfterContentInit(): void {
    this.contentCount++;
    // this.changeCanvasFlag = false;
    // this.initCanvasFlag = false;
  }

  ngAfterViewInit(): void {
    this.viewCount++;
    this.viewCanvasFlag = true;
  }

  ngOnDestroy(): void {
    this.destroyCount++;
    alert('ngOnDestroy Count = ' + this.destroyCount);
  }

}
