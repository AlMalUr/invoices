import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { InvoicesService } from '../../core/services/invoices-services/invoices.service';

@Component({
  selector: 'app-invoices-view',
  templateUrl: './invoices-view.component.html',
  styleUrls: ['./invoices-view.component.scss']
})
export class InvoicesViewComponent implements OnInit, OnDestroy {

  invoices$;
  id;

  displayedColumns: string[] = ['number', 'products', 'qty', 'price'];

  constructor(private invoicesService: InvoicesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.invoices$ = combineLatest(this.invoicesService.invoices$, this.invoicesService.customers$).pipe(
      map( ([invoices, customers]) => invoices.map(invoice => ({
          ...invoice,
          customer: customers.find(customer => invoice.customer_id === customer._id)
        }))
      ),
      map(invoices => invoices.filter(invoice => invoice.customer_id === this.id))
    );

  }
  ngOnDestroy() {

  }

}

// getHero(): void {
//   const id = +this.route.snapshot.paramMap.get('id');
// this.heroService.getHero(id)
// .subscribe(hero => this.hero = hero);
// }
