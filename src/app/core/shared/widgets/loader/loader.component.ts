import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.isLoading.pipe(delay(0)).subscribe((res) => {
      this.isLoading = res;
    });
  }
}
