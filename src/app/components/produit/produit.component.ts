import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/ProductsService';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  websiteUrl = '';
  products: any[] = [];
  stats: any = {};

  // Filtres
  filterName = '';
  filterInStock: boolean | null = null;
  filterOnSale: boolean | null = null;
  filterCategory = '';
  filterStatus = 'any';
  filterFeatured: boolean | null = null;
  filterPerPage = 10;
  filterPage = 1;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('woocommerceWebsite');
    this.websiteUrl = saved ? JSON.parse(saved) : '';
    if (this.websiteUrl) {
      this.loadProducts();
      this.loadStats();
    }
  }

loadProducts(): void {
  const filters = {
    status: this.filterStatus,
    stock_status: this.filterInStock !== null ? (this.filterInStock ? 'instock' : 'outofstock') : undefined,
    on_sale: this.filterOnSale !== null ? (this.filterOnSale ? 'true' : 'false') : undefined,
    featured: this.filterFeatured !== null ? (this.filterFeatured ? 'true' : 'false') : undefined,
    category: this.filterCategory,
    search: this.filterName,
    per_page: this.filterPerPage,
    page: this.filterPage
  };
  this.productService.fetchAllProducts(this.websiteUrl, filters).subscribe({
    next: data => this.products = data.products,  

    error: err => console.error('Fetch products error:', err)
  });
}


  loadStats(): void {
    this.productService.fetchProductStats(this.websiteUrl).subscribe({
      next: data => this.stats = data.statistics,
      error: err => console.error('Fetch stats error:', err)
    });
  }

  applyFilters(): void {
    this.loadProducts();
  }

  submitCatalog(): void {
    const payload = {
      item_type: 'PRODUCT_ITEM',
      allow_upsert: false,
      requests: this.products.map((p, idx) => ({
        method: 'CREATE',
        retailer_id: `prod-${Date.now()}-${idx}`,
        data: {
          name: p.name,
          description: p.description,
          price: p.price,
          currency: p.currency,
          availability: p.stock_status || (p.stock_quantity > 0 ? 'in stock' : 'out of stock'),
          image_url: p.images?.[0]?.src || p.image_url,
          url: p.permalink || p.site_web
        }
      }))
    };
    console.log('Payload ready to send:', payload);
  }
}
