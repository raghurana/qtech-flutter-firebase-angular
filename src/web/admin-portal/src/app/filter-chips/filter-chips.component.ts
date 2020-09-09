import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.scss'],
})
export class FilterChipsComponent {
  filteredList: Observable<string[]>;
  searchInputFormControl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input()
  selectedItems: BehaviorSubject<string[]>;

  @Input()
  allItems: string[];

  @Input()
  placeholderText: string;

  @ViewChild('searchInput')
  searchInputRef: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredList = this.searchInputFormControl.valueChanges.pipe(
      startWith(<string>null),
      map((inputText: string | null) =>
        inputText
          ? this.filterListByInputText(inputText)
          : this.allItems?.filter(
              (item) => !this.selectedItems?.getValue().includes(item)
            )
      )
    );
  }

  bodyClick() {
    this.searchInputRef.nativeElement.focus();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || '').trim();

    if (this.allItems.includes(value))
      this.selectedItemsChanged(this.selectedItems.value.concat(value.trim()));
    if (input) {
      input.value = '';
    }

    this.searchInputFormControl.setValue(null);
  }

  remove(item: string): void {
    const index = this.selectedItems.value.indexOf(item);
    if (index >= 0) {
      this.selectedItems.value.splice(index, 1);
      this.selectedItemsChanged(this.selectedItems.value);
    }
    this.searchInputFormControl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.selectedItems)
      this.selectedItems = new BehaviorSubject<string[]>([]);

    this.selectedItemsChanged(
      this.selectedItems.value.concat(event.option.viewValue)
    );
    this.searchInputFormControl.setValue(null);
    this.searchInputRef.nativeElement.value = '';
    this.searchInputRef.nativeElement.blur();
  }

  private filterListByInputText(text: string): string[] {
    const filterText = text.toLowerCase();
    return this.allItems?.filter(
      (item) => item.toLowerCase().indexOf(filterText) === 0
    );
  }

  private selectedItemsChanged(newValues: string[]) {
    if (!newValues) return;
    this.selectedItems.next(newValues);
  }
}
