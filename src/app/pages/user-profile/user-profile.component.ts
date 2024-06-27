import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  game$!: Observable<any>;
  constructor(
    public activatedRoute: ActivatedRoute,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.game$ = this.activatedRoute.data.pipe(
      map((data: { [x: string]: any }) => data['userDetails']?.data)
    );
    // this.game$.subscribe((data) => console.log(data)); // Add this line to log the data for debugging
  }

  showError() {
    this.modalService.openModal('', 'This is an error message ', 'error', 'sm');
  }

  showSuccess() {
    this.modalService.openModal('', 'This is a success message', 'success');
  }
  showConfirmation() {
    this.modalService
      .openModal(
        'confirmation for payment',
        'Are you sure you want to proceed?'
      )
      .then((result) => {
        if (result) {
          // User confirmed
          console.log('yes');
        } else {
          // User cancelled
          console.log('no');
        }
      });
  }
}
