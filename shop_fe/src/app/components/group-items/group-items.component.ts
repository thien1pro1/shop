import { Component } from '@angular/core';
import { ITEMS } from '../../model/item';

@Component({
  selector: 'app-group-items',
  templateUrl: './group-items.component.html',
  styleUrl: './group-items.component.css',
})
export class GroupItemsComponent {
  items = ITEMS;
}
