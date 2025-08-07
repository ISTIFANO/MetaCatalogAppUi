import { Component, type OnInit } from "@angular/core"
import { CatalogService } from "../../services/CatalogService" // Changed to regular import
import { CommonModule } from "@angular/common"
import { ToastrService } from "ngx-toastr" // Changed to regular import
import Swal from "sweetalert2" // Changed to regular import
import { ProductSelectionModalComponent } from "../product-selection-modal/product-selection-modal.component" // Import the new modal component

// Define the ProductDTO interface based on the Java DTO
interface ProductDTO {
    id : number
  name: string
  description?: string
  price: number
  stockQuantity: number
  companyId?: string
  archived: boolean
  retailerId: string
  currency: string
  siteWeb: string
  imageUrl: string
  availability: string
  retailerProductGroupId?: string
  category?: string
  wooCommerceId: string
  status?: string 
  on_sale?: boolean
  featured?: boolean
}

@Component({
  selector: "app-produit-catalog",
  standalone: true,
  imports: [CommonModule, ProductSelectionModalComponent], // Add the new modal component here
  templateUrl: "./produit-catalog.component.html",
  styleUrl: "./produit-catalog.component.css",
})
export class ProduitCatalogComponent implements OnInit {
  products: ProductDTO[] = [] 
  loading = false
  syncLoading = false 
  error = ""
  showProductSelectionModal = false 
  
  constructor(
    private catalogService: CatalogService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    
    this.loading = true
    this.catalogService.fetchUnarchivedProducts().subscribe({
      next: (data) => {
        
        this.products = data
        this.loading = false
      },
      error: (err) => {
        this.error = "Erreur lors du chargement des produits"
        this.loading = false
        console.error(err)
        this.toastr.error("Erreur lors du chargement des produits du catalogue", "Erreur")
      },
    })
  }

  openProductSelectionModal(): void {
    this.showProductSelectionModal = true
  }

  async onProductsSelectedForMetaSync(selectedProductsData: ProductDTO[]): Promise<void> {
    this.showProductSelectionModal = false // Close the modal immediately

    if (selectedProductsData.length === 0) {
      this.toastr.warning("Aucun produit sélectionné pour la synchronisation.", "Attention")
      return
    }

   

    let syncLoading = true // Local loading state for this specific sync operation
    const successCount = 0
    const errorCount = 0

    const payload = {
      item_type: "PRODUCT_ITEM",
      allow_upsert: false, 
      requests: selectedProductsData.map((p, idx) => ({
        method: "CREATE", 
        retailer_id: p.id, 
        data: {
          name: p.name || "",
          description: p.description || "",
          price: p.price ? p.price.toString() : "0", // Ensure price is string for Meta payload
          currency: p.currency || "EUR",
          availability: p.availability || (p.stockQuantity > 0 ? "in stock" : "out of stock"),
          image_url: p.imageUrl || "",
          url: p.siteWeb || "",
          status: p.status || "",
          on_sale: p.on_sale || false,
          featured: p.featured || false,
        },
      })),
    }


    this.catalogService.submitCatalog(payload).subscribe({
      next: (res) => {
        console.log("Meta Sync Success:", res)
        syncLoading = false
        this.toastr.success(`${selectedProductsData.length} produit(s) synchronisé(s) avec Meta`, "Succès")
        Swal.fire("Synchronisé !", "Les produits ont été synchronisés avec Meta.", "success")
      },
      error: (err) => {
        console.error("Meta Sync Error:", err)
        syncLoading = false
        this.toastr.error("Erreur lors de la synchronisation avec Meta", "Erreur")
        Swal.fire("Erreur !", "Une erreur est survenue lors de la synchronisation avec Meta.", "error")
      },
    })
  }
}
