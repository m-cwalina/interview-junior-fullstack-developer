import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  searchControl: FormControl = new FormControl('');
  @Output() search = new EventEmitter<string>();

  ngOnInit(): void {
    this.searchControl = new FormControl('');

    this.searchControl.valueChanges.pipe(
      debounceTime(400)
    ).subscribe(value => this.search.emit(value));
  }
}
