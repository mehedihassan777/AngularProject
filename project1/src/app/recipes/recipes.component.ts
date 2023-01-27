import { Component } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent {
  detailedRecipe: Recipe;
  constructor(private recSer: RecipeService) {
    this.recSer.selectedRecipe.subscribe((recipe: Recipe) => this.detailedRecipe = recipe);
  }

}
