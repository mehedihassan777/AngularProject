import { Component, DoCheck } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements DoCheck {
  ingredients: Ingredient[] = [];

  constructor(private shoLiSer: ShoppingListService) {
    this.ingredients = this.shoLiSer.getIngredient();
  }

  onEditItem(id: number) {
    this.shoLiSer.startedEditing.next(id);
  }

  ngDoCheck(): void {
    this.ingredients = this.shoLiSer.getIngredient();
  }
}
