import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './models/product.model';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  transform(products: Product[], searchText: string): Product[] {
    if (!products || !searchText ) {
      return products;
    }
    else {
      
    searchText = searchText.toLocaleLowerCase();

    return products.filter(prod => {
      return prod.title.toLocaleLowerCase().includes(searchText);
    });
  }}
}