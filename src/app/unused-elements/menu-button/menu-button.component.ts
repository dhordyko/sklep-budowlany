import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IgxDropDownComponent,
  IgxInputGroupComponent,
  ConnectedPositioningStrategy,
} from 'igniteui-angular';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent implements OnInit {
  @ViewChild(IgxDropDownComponent, { static: true })
  public igxDropDown: IgxDropDownComponent;
  @ViewChild('inputGroup', { read: IgxInputGroupComponent, static: true })
  public inputGroup: IgxInputGroupComponent;

  public items: Array<{ field: string }> = [
    { field: 'Option 1' },
    { field: 'Option 2' },
    { field: 'Option 3' },
  ];

  constructor() {}

  ngOnInit(): void {}
  public openDropDown() {
    if (this.igxDropDown.collapsed) {
      this.igxDropDown.open({
        modal: false,
        positionStrategy: new ConnectedPositioningStrategy({
          target: this.inputGroup.element.nativeElement,
        }),
      });
    }
  }
}
