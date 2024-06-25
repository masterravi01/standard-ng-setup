import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  game$!: Observable<any>;
  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.game$ = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['userDetails']));
    console.log(this.game$)
  }
}
