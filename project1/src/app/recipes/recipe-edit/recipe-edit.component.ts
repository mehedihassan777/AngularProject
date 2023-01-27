import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private recSer: RecipeService, private router: Router) { }
  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let img = '';
    let dis = '';
    let recIngredient = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recSer.getRecipe(this.id);
      recipeName = recipe.name;
      img = recipe.imagePath;
      dis = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recIngredient.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'inputImgScr': new FormControl(img, Validators.required),
      'dis': new FormControl(dis, Validators.required),
      'ingredients': recIngredient
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onSubmit() {
    if (this.editMode) {
      const newRecipe = new Recipe(this.recipeForm.value['name'], this.recipeForm.value['dis'], this.recipeForm.value['inputImgScr'], this.recipeForm.value['ingredients']);
      this.recSer.updateRecipe(this.id, newRecipe);
    }
    else {
      const newRecipe = new Recipe(this.recipeForm.value['name'], this.recipeForm.value['dis'], this.recipeForm.value['inputImgScr'], this.recipeForm.value['ingredients']);
      this.recSer.addRecipe(newRecipe);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(i) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
