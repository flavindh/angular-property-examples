import { Component, OnInit } from '@angular/core';
import { ElectronicService } from 'src/app/services/electronic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Electronic } from 'src/app/models/electronic';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-electronic-detail',
  templateUrl: './electronic-detail.component.html',
  styleUrls: ['./electronic-detail.component.css']
})
export class ElectronicDetailComponent implements OnInit {
  
  electronic$: Observable<Electronic>;

  constructor(
    private electronicService: ElectronicService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let i:number = +this.route.snapshot.paramMap.get('index');
    this.electronic$ = this.electronicService.get(i);
  }

  back() {
    this.router.navigate(['..'], {relativeTo: this.route})
  }

}
