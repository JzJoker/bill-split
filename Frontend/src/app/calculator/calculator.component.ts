// calculator.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  items: { name: string, cost: number, people: string[] }[] = [];
  people: string[] = []; // Add more people as needed
  owedAmounts: { [person: string]: number } = {};
  newPersonName: string = '';
  selectAllChecked: boolean = false;


  addItem() {
    this.items.push({ name: '', cost: 0, people: [] });
  }

  getTotalOwedAmountForPerson(person: string): number {
    return this.items.reduce((total, item) => total + this.getItemOwedAmountForPerson(item, person), 0);
  }
  
  toggleSelectAll(event: any, item: any, people: string[]) {
    const isChecked = event.target.checked;
    if (isChecked) {
      const numberOfPeople = people.length;
      const itemCostPerPerson = item.cost / numberOfPeople;
      item.people = [...people];
      item.cost = itemCostPerPerson * numberOfPeople; // Update item cost
    } else {
      item.people = [];
    }
  }
  
  
  togglePersonSelection(person: string, isChecked: boolean) {
    this.items.forEach(item => {
      if (isChecked && !item.people.includes(person)) {
        item.people.push(person);
      } else if (!isChecked && item.people.includes(person)) {
        item.people = item.people.filter(p => p !== person);
      }
    });
  }
  
  isPersonSelected(person: string): boolean {
    return this.items.some(item => item.people.includes(person));
  }

  getItemOwedAmountForPerson(item: any, person: string): number {
    const numberOfPeople = item.people.length;
    const itemCostPerPerson = item.cost / numberOfPeople;
    return item.people.includes(person) ? itemCostPerPerson : 0;
  }

  togglePerson(item: any, person: string) {
    if (!item.people) {
      item.people = []; // initialize item.people if it's not already defined
    }
    
    const index = item.people.indexOf(person);
    if (index !== -1) {
      item.people.splice(index, 1); // remove person if already selected
    } else {
      item.people.push(person); // add person if not already selected
    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1); // remove item from items array
  }

  removePerson(index: number) {
    const removedPerson = this.people.splice(index, 1)[0];
    
    // Remove the removed person from each item's list of people
    this.items.forEach(item => {
      item.people = item.people.filter(person => person !== removedPerson);
    });
  }

  addNewPerson() {
    if (this.newPersonName.trim() !== '') {
      // Check if the person already exists
      if (!this.people.includes(this.newPersonName)) {
        this.people.push(this.newPersonName);
        // Clear the textbox after adding the person
        this.newPersonName = '';
      } else {
        console.log('Person already exists');
      }
    } else {
      // Alert or notify the user to enter a valid name
      console.log('Please enter a valid name');
    }
  }
}
