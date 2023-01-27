import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredient() {
        return this.ingredients.slice();
    }

    getIngredientById(id: number) {
        return this.ingredients.slice()[id];
    }

    newIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }

    editIngredient(id: number, ingredient: Ingredient) {
        this.ingredients[id] = ingredient;
    }

    deleteIngredient(id: number) {
        this.ingredients.splice(id, 1);
    }
}