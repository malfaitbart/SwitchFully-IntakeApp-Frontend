import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() useEnter: boolean;
  @Output() value: EventEmitter<string>;

  searchBox : FormControl;

  constructor() {
    this.value = new EventEmitter();
    this.searchBox = new FormControl();
  }

  ngOnInit() {
    this.searchBox.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged())
    .subscribe(givenValue => this.value.emit(givenValue));    
  }
}