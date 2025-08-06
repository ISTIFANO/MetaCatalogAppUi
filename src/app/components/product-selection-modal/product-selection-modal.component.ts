import { Component, type OnInit, Input, Output, EventEmitter, type OnChanges, type SimpleChanges } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { CatalogService } from "../../services/CatalogService" 
import { ToastrService } from "ngx-toastr"
import Swal from "sweetalert2"

interface FilterOption {
  value: string
  label: string
  checked: boolean
}

interface FilterGroup {
  name: string
  icon: string
  options: FilterOption[]
  selectAll: boolean
}

// Re-defining ProductDTO for clarity within this component
interface ProductDTO {
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
  status?: string // e.g., 'publish', 'draft'
  on_sale?: boolean
  featured?: boolean
}

@Component({
  selector: "app-product-selection-modal",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./product-selection-modal.component.html",
  styleUrls: ["./product-selection-modal.component.css"],
})
export class ProductSelectionModalComponent implements OnInit, OnChanges {
  @Input() allProducts: ProductDTO[] = []
  @Output() submitSelected = new EventEmitter<ProductDTO[]>()
  @Output() closeModal = new EventEmitter<void>()

  filteredProducts: ProductDTO[] = []
  searchName = ""
  syncLoading = false

  // Filter Groups
  filterGroups: FilterGroup[] = [
    {
      name: "Statut Stock",
      icon: "fas fa-warehouse",
      selectAll: false,
      options: [
        { value: "in stock", label: "En stock", checked: false },
        { value: "out of stock", label: "Rupture de stock", checked: false },
      ],
    },
    {
      name: "Statut Publication",
      icon: "fas fa-info-circle",
      selectAll: false,
      options: [
        { value: "publish", label: "Publié", checked: false },
        { value: "draft", label: "Brouillon", checked: false },
        { value: "private", label: "Privé", checked: false },
      ],
    },
    {
      name: "Promotion",
      icon: "fas fa-percentage",
      selectAll: false,
      options: [
        { value: "on_sale", label: "En solde", checked: false },
        { value: "featured", label: "Produit vedette", checked: false },
      ],
    },
  ]

  // Category Filters
  categoryFilters: FilterOption[] = []
  categoriesSelectAll = false

  // Product Selection
  selectedProducts: Set<string> = new Set() // Stores wooCommerceId
  selectAllProducts = false

  constructor(
    private catalogService: CatalogService, // For Meta sync
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    // Initial filter application when component initializes
    this.applyFilters()
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Re-apply filters if the input products array changes
    if (changes["allProducts"] && changes["allProducts"].currentValue !== changes["allProducts"].previousValue) {
      this.extractCategories()
      this.applyFilters()
      this.updateProductSelectAllState() 
    }
  }

  extractCategories(): void {
    const categories = new Set<string>()
    this.allProducts.forEach((product) => {
      if (product.category) {
        // Split by comma and trim, then add each unique category
        product.category.split(",").map(cat => cat.trim()).forEach(cat => {
          if (cat) categories.add(cat)
        })
      }
    })
    this.categoryFilters = Array.from(categories).map((cat) => ({
      value: cat,
      label: cat,
      checked: false,
    }))
  }

  applyFilters(): void {
    let tempProducts = [...this.allProducts]

    // Filter by search name/description
    if (this.searchName.trim()) {
      const searchTerm = this.searchName.toLowerCase()
      tempProducts = tempProducts.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchTerm) || product.description?.toLowerCase().includes(searchTerm),
      )
    }

    // Filter by groups (Stock Status, Publication Status, Promotion)
    this.filterGroups.forEach((group) => {
      const selectedOptions = group.options.filter((option) => option.checked)
      if (selectedOptions.length > 0) {
        tempProducts = tempProducts.filter((product) => {
          return selectedOptions.some((option) => {
            switch (option.value) {
              case "in stock":
              case "out of stock":
                return product.availability === option.value
              case "publish":
              case "draft":
              case "private":
                return product.status === option.value
              case "on_sale":
                return product.on_sale === true
              case "featured":
                return product.featured === true
              default:
                return false
            }
          })
        })
      }
    })

    // Filter by categories
    const selectedCategories = this.categoryFilters.filter((cat) => cat.checked)
    if (selectedCategories.length > 0) {
      tempProducts = tempProducts.filter((product) => {
        if (!product.category) return false
        return selectedCategories.some((selectedCat) => selectedCat.value === product.category)
      })
    }

    this.filteredProducts = tempProducts
    this.updateProductSelectAllState()
  }

  resetFilters(): void {
    this.searchName = ""
    this.filterGroups.forEach((group) => {
      group.selectAll = false
      group.options.forEach((option) => {
        option.checked = false
      })
    })
    this.categoriesSelectAll = false
    this.categoryFilters.forEach((category) => {
      category.checked = false
    })
    this.applyFilters() 
    this.toastr.info("Filtres réinitialisés", "Information")
  }

  toggleSelectAllFilters(groupIndex: number): void {
    const group = this.filterGroups[groupIndex]
    group.options.forEach((option) => {
      option.checked = group.selectAll
    })
    this.applyFilters()
  }

  updateFilterSelectAllState(groupIndex: number): void {
    const group = this.filterGroups[groupIndex]
    group.selectAll = group.options.every((option) => option.checked)
    this.applyFilters()
  }

  toggleCategoriesSelectAll(): void {
    this.categoryFilters.forEach((category) => {
      category.checked = this.categoriesSelectAll
    })
    this.applyFilters()
  }

  updateCategoriesSelectAllState(): void {
    this.categoriesSelectAll = this.categoryFilters.every((cat) => cat.checked)
    this.applyFilters()
  }

  // Product Selection Logic
  toggleSelectAllProducts(): void {
    if (this.selectAllProducts) {
      this.filteredProducts.forEach((product) => {
        if (product.wooCommerceId) {
          this.selectedProducts.add(product.wooCommerceId)
        }
      })
    } else {
      this.selectedProducts.clear()
    }
  }

  toggleProductSelection(wooCommerceId: string): void {
    if (!wooCommerceId) return

    if (this.selectedProducts.has(wooCommerceId)) {
      this.selectedProducts.delete(wooCommerceId)
    } else {
      this.selectedProducts.add(wooCommerceId)
    }
    this.updateProductSelectAllState()
  }

  updateProductSelectAllState(): void {
    const visibleProductIds = this.filteredProducts.map((p) => p.wooCommerceId).filter((id) => id)
    this.selectAllProducts =
      visibleProductIds.length > 0 && visibleProductIds.every((id) => this.selectedProducts.has(id))
  }

  isProductSelected(wooCommerceId: string): boolean {
    return wooCommerceId ? this.selectedProducts.has(wooCommerceId) : false
  }

  getSelectedCount(): number {
    return this.selectedProducts.size
  }

  async submitSelection(): Promise<void> {
    if (this.selectedProducts.size === 0) {
      this.toastr.warning("Veuillez sélectionner au moins un produit à synchroniser.", "Attention")
      return
    }

    const selectedProductsData = this.allProducts.filter(
      (p) => p.wooCommerceId && this.selectedProducts.has(p.wooCommerceId),
    )

    const result = await Swal.fire({
      title: "Synchroniser les produits sélectionnés avec Meta ?",
      text: `Voulez-vous synchroniser ${selectedProductsData.length} produit(s) sélectionné(s) avec Meta ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3099d6ff",
      cancelButtonColor: "rgba(214, 53, 48, 1)",
      confirmButtonText: "Oui, synchroniser",
      cancelButtonText: "Annuler",
    })

    if (result.isConfirmed) {
      this.syncLoading = true
   
      this.submitSelected.emit(selectedProductsData)
    }
  }
}
