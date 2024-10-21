import {
  Component,
  computed,
  effect,
  HostListener,
  signal,
} from '@angular/core';
import { debounce, throttle } from 'lodash';
@Component({
  selector: 'app-learn-new',
  templateUrl: './learn-new.component.html',
  styleUrls: ['./learn-new.component.css'],
})
export class LearnNewComponent {
  searchTerm: string = '';
  scrollMessage: string = '';
  constructor() {
    // Create a debounced version of the search function
    this.debouncedSearch = debounce(this.search, 300);
    // Create a throttled version of the scroll function
    this.throttledScroll = throttle(this.onScroll, 400);
  }
  // Throttled scroll function
  throttledScroll: () => void;

  // Handle scroll event
  onScroll(): void {
    this.scrollMessage = `Scrolled at ${new Date().toLocaleTimeString()}`;
    console.log(this.scrollMessage);
  }

  // HostListener for scroll event
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    this.throttledScroll();
  }
  // Debounced search function
  debouncedSearch: (term: string) => void;

  // Search function
  search(term: string): void {
    console.log('Searching for:', term);
    // Perform search logic here
  }

  // Handle input change
  onInputChange(event: any): void {
    this.searchTerm = event.target.value;
    this.debouncedSearch(event.target.value);
  }

  // Traditional approach
  firstName: string = 'ramesh';
  lastName: string = 'badu';
  fullName: string = this.firstName + ' ' + this.lastName;

  // Signal-based approach
  signalFirstName = signal('ganji');
  signalLastName = signal('ben');
  signalFullName = computed(
    () => this.signalFirstName() + ' ' + this.signalLastName()
  );

  // Methods for traditional approach
  updateFirstName(name: string) {
    this.firstName = name;
    this.updateFullName();
  }

  updateLastName(name: string) {
    this.lastName = name;
    this.updateFullName();
  }

  private updateFullName() {
    this.fullName = this.firstName + ' ' + this.lastName;
  }

  // Methods for signal-based approach
  updateSignalFirstName(name: string) {
    this.signalFirstName.set(name);
  }

  updateSignalLastName(name: string) {
    this.signalLastName.update((lastName) => lastName + name);
  }

  // Side effect for signal-based full name
  sideEffect = effect(() => console.log('Full Name:', this.signalFullName()));
}
