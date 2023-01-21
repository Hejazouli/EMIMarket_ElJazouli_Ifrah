import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  data: any = {};
  loading: boolean = false;
  constructor(private route: ActivatedRoute, private service: ProductService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.loading = true;
    this.service.getProductById(this.id).subscribe(
      (res) => {
        this.loading = false;
        this.data = res;
      },
      (error) => {
        this.loading = false;
        alert(error);
      }
    );
  }
 
}
