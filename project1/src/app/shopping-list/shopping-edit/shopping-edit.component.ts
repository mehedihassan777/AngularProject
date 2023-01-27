import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f') slForm: NgForm;
  name: string = '';
  amount: number = null;
  subscription: Subscription;
  editMode = false;
  editId: number;
  editData: Ingredient;

  constructor(private shoLiSer: ShoppingListService) { }

  addNewItem(form: NgForm) {
    console.log(form);
    if (this.editMode) {
      const value: Ingredient = this.slForm.value;
      this.shoLiSer.editIngredient(this.editId, { name: value.name, amount: value.amount });
      this.editMode = false;
      //this.onClearForm();
    }
    else {
      const name = form.value.name;
      const amount = form.value.amount;
      const newIngredient = new Ingredient(name, amount);
      this.shoLiSer.newIngredient(newIngredient);
      this.onClearForm();
    }

  }

  ngOnInit(): void {
    this.shoLiSer.startedEditing.subscribe((index) => {
      this.editMode = true;
      this.editId = index;
      this.editData = this.shoLiSer.getIngredientById(index);
      this.slForm.setValue({
        name: this.editData.name,
        amount: this.editData.amount
      });
    });
  }

  onClearForm() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onClearForm();
    this.shoLiSer.deleteIngredient(this.editId);
  }
}
