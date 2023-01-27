import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  detailRecipe: Recipe;
  id: number;
  constructor(private shoLiSer: ShoppingListService, private route: ActivatedRoute, private recSer: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((prams: Params) => {
      this.id = +prams['id'];
      this.detailRecipe = this.recSer.getRecipe(this.id);
    });
  }

  AddToShoppingList() {
    for (let ingredient of this.detailRecipe.ingredients)
      this.shoLiSer.newIngredient(ingredient);
  }

  onDelete() {
    this.recSer.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
