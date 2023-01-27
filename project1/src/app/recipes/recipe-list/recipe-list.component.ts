import { outputAst } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recSer: RecipeService) { }
  ngOnInit(): void {
    this.recipes = this.recSer.getRecipes();
    this.subscription = this.recSer.recipeChanged.subscribe((recipe: Recipe[]) => {
      this.recipes = recipe;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
