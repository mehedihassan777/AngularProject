import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authSer: AuthService) { }

    storeRecipes() {
        const recipes: Recipe[] = this.recipeService.getRecipes();
        this.http.put('https://recipe-book-8095c-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => console.log(response));
    }

    fetchRecipes() {
        return this.authSer.user.pipe(take(1), exhaustMap(user => {
            return this.http.get<Recipe[]>('https://recipe-book-8095c-default-rtdb.firebaseio.com/recipes.json', {
                params: new HttpParams().set('auth', user.token)
            });
        }), map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            });
        }), tap(recipes =>
            this.recipeService.setRecipes(recipes)
        ));
    }
}