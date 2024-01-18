import { Component, Input } from '@angular/core';
import { Item } from '../../model/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  @Input() item!: Item;
}
