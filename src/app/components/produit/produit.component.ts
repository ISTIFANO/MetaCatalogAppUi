import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { NgSelectModule } from "@ng-select/ng-select"
import { ToastrService } from "ngx-toastr"
import Swal from "sweetalert2"
import { ProductsService } from "../../services/ProductsService"

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

interface SelectOption {
  value: string
  label: string
}

// Define the ProductDTO interface based on the Java DTO
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
}

@Component({
  selector: "app-produit",
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: "./produit.component.html",
  styleUrls: ["./produit.component.css"],
})
export class ProduitComponent implements OnInit {
  websiteUrl = ""
  products: any[] = []
  allProducts: any[] = []
  stats: any = {}
  loading = false
  syncLoading = false

  // Recherche par nom
  searchName = ""

  // Options pour les sélecteurs (kept for completeness, though not directly used in filters anymore)
  stockStatusOptions: SelectOption[] = [
    { value: "all", label: "Tous les statuts" },
    { value: "instock", label: "En stock" },
    { value: "outofstock", label: "Rupture de stock" },
  ]
  publicationStatusOptions: SelectOption[] = [
    { value: "all", label: "Tous les statuts" },
    { value: "publish", label: "Publié" },
    { value: "draft", label: "Brouillon" },
    { value: "private", label: "Privé" },
  ]

  // Filtres sélectionnés (kept for completeness, though not directly used in filters anymore)
  selectedStockStatus = "all"
  selectedPublicationStatus = "all"
  selectedCategories: string[] = []
  showOnSaleOnly = false
  showFeaturedOnly = false

  // Groupes de filtres avec checkboxes
  filterGroups: FilterGroup[] = [
    {
      name: "Statut Stock",
      icon: "fas fa-warehouse",
      selectAll: false,
      options: [
        { value: "instock", label: "En stock", checked: false },
        { value: "outofstock", label: "Rupture de stock", checked: false },
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
        { value: "featured", label: "produits favoris", checked: false },
      ],
    },
  ]

  // Filtres de catégories
  categoryFilters: FilterOption[] = []
  categoryOptions: SelectOption[] = []
  categoriesSelectAll = false

  // Sélection des produits
  selectedProducts: Set<string> = new Set()
  selectAllProducts = false

  constructor(
    private productService: ProductsService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    const saved = localStorage.getItem("woocommerceWebsite")
    this.websiteUrl = saved ? JSON.parse(saved) : ""
    if (this.websiteUrl) {
      this.loadProducts()
      this.loadStats()
    }
  }

  loadProducts(): void {
    this.loading = true
    this.productService.fetchAllProducts(this.websiteUrl, {}).subscribe({
      next: (data) => {
        this.allProducts = data.products || []
        this.products = [...this.allProducts]
        this.extractCategories()
        this.applyFilters()
        this.loading = false
        this.toastr.success(`${this.allProducts.length} produits chargés`, "Succès")
      },
      error: (err) => {
        console.error("Fetch products error:", err)
        this.loading = false
        this.toastr.error("Erreur lors du chargement des produits", "Erreur")
      },
    })
  }

  loadStats(): void {
    this.productService.fetchProductStats(this.websiteUrl).subscribe({
      next: (data) => (this.stats = data.statistics || {}),
      error: (err) => {
        console.error("Fetch stats error:", err)
        this.toastr.error("Erreur lors du chargement des statistiques", "Erreur")
      },
    })
  }

  extractCategories(): void {
    const categories = new Set<string>()
    this.allProducts.forEach((product) => {
      if (product.categories && product.categories.length > 0) {
        product.categories.forEach((cat: any) => {
          if (cat.name) {
            categories.add(cat.name)
          }
        })
      }
    })
    this.categoryFilters = Array.from(categories).map((cat) => ({
      value: cat,
      label: cat,
      checked: false,
    }))
    this.categoryOptions = [
      { value: "all", label: "Toutes les catégories" },
      ...Array.from(categories).map((cat) => ({
        value: cat,
        label: cat,
      })),
    ]
  }

  toggleSelectAll(groupIndex: number): void {
    const group = this.filterGroups[groupIndex]
    group.options.forEach((option) => {
      option.checked = group.selectAll
    })
    this.applyFilters()
  }

  toggleCategoriesSelectAll(): void {
    this.categoryFilters.forEach((category) => {
      category.checked = this.categoriesSelectAll
    })
    this.applyFilters()
  }

  updateSelectAllState(groupIndex: number): void {
    const group = this.filterGroups[groupIndex]
    group.selectAll = group.options.every((option) => option.checked)
    this.applyFilters()
  }

  updateCategoriesSelectAllState(): void {
    this.categoriesSelectAll = this.categoryFilters.every((cat) => cat.checked)
    this.applyFilters()
  }

  applyFilters(): void {
    let filteredProducts = [...this.allProducts]
    // Filtre par nom
    if (this.searchName.trim()) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name?.toLowerCase().includes(this.searchName.toLowerCase()),
      )
    }
    // Filtres par groupes
    this.filterGroups.forEach((group) => {
      const selectedOptions = group.options.filter((option) => option.checked)
      if (selectedOptions.length > 0) {
        filteredProducts = filteredProducts.filter((product) => {
          return selectedOptions.some((option) => {
            switch (option.value) {
              case "instock":
                return product.stock_status === "instock"
              case "outofstock":
                return product.stock_status === "outofstock"
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
    // Filtre par catégories
    const selectedCategories = this.categoryFilters.filter((cat) => cat.checked)
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!product.categories || product.categories.length === 0) return false
        return product.categories.some((cat: any) =>
          selectedCategories.some((selectedCat) => selectedCat.value === cat.name),
        )
      })
    }
    this.products = filteredProducts
    this.updateProductSelectAllState()
  }

  resetFilters(): void {
    this.searchName = ""
    this.selectedStockStatus = "all"
    this.selectedPublicationStatus = "all"
    this.selectedCategories = []
    this.showOnSaleOnly = false
    this.showFeaturedOnly = false
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
    this.products = [...this.allProducts]
    this.toastr.info("Filtres réinitialisés", "Information")
  }


  toggleSelectAllProducts(): void {
    if (this.selectAllProducts) {
      this.products.forEach((product) => {
        if (product.id) {
          this.selectedProducts.add(product.id)
        }
      })
    } else {
      this.selectedProducts.clear()
    }
  }

  toggleProductSelection(productId: string): void {
    if (!productId) return

    if (this.selectedProducts.has(productId)) {
      this.selectedProducts.delete(productId)
    } else {
      this.selectedProducts.add(productId)
    }
    this.updateProductSelectAllState()
  }

  updateProductSelectAllState(): void {
    const visibleProductIds = this.products.map((p) => p.id).filter((id) => id)
    this.selectAllProducts =
      visibleProductIds.length > 0 && visibleProductIds.every((id) => this.selectedProducts.has(id))
  }

  isProductSelected(productId: string): boolean {
    return productId ? this.selectedProducts.has(productId) : false
  }

  getSelectedCount(): number {
    return this.selectedProducts.size
  }

  async synchronizeWithDatabase(): Promise<void> {
    if (this.selectedProducts.size === 0) {
      this.toastr.warning("Veuillez sélectionner au moins un produit à synchroniser", "Attention")
      return
    }

    const selectedProductsData = this.products.filter((p) => p.id && this.selectedProducts.has(p.id))

    const result = await Swal.fire({
      title: "Synchroniser les produits sélectionnés avec la base de données ?",
      text: `Voulez-vous synchroniser ${selectedProductsData.length} produit(s) sélectionné(s) avec la base de données ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, synchroniser",
      cancelButtonText: "Annuler",
    })

    if (result.isConfirmed) {
      this.syncLoading = true
      let successCount = 0
      let errorCount = 0

      for (const p of selectedProductsData) {
        const productDtos: ProductDTO[] = selectedProductsData.map(p => ({
          name: p.name,
          description: p.description,
          price: +p.price,
          stockQuantity: p.stock_quantity,
          companyId: "your_company_id",
          archived: p.archived || false,
          retailerId: p.retailer_id || `prod-${Date.now()}-${p.id}`,
          currency: p.currency || "EUR",
          siteWeb: p.permalink || p.site_web || "",
          imageUrl: p.images?.[0]?.src || p.image_url || "",
          availability: p.stock_status || (p.stock_quantity > 0 ? "in stock" : "out of stock"),
          retailerProductGroupId: p.retailer_product_group_id || null,
          category: p.categories?.[0]?.name || null,
          wooCommerceId: p.id
        }));

        try {
          await this.productService.saveProduct(productDtos).toPromise()
          successCount++
        } catch (err) {
          console.error(`Error saving product ${p.id}:`, err)
          errorCount++
        }
      }

      this.syncLoading = false

      if (successCount > 0 && errorCount === 0) {
        this.toastr.success(`${successCount} produit(s) synchronisé(s) avec succès`, "Succès")
        Swal.fire("Synchronisé !", "Les produits sélectionnés ont été synchronisés avec la base de données.", "success")
      } else if (successCount > 0 && errorCount > 0) {
        this.toastr.warning(`${successCount} produits synchronisés, ${errorCount} erreurs`, "Partiellement synchronisé")
        Swal.fire("Partiellement Synchronisé !", `Certains produits ont été synchronisés avec des erreurs.`, "warning")
      } else {
        this.toastr.error("Erreur lors de la synchronisation de tous les produits", "Erreur")
        Swal.fire("Erreur !", "Une erreur est survenue lors de la synchronisation.", "error")
      }
    }
  }

  exportSelectedProducts(): void {
    if (this.selectedProducts.size === 0) {
      this.toastr.warning("Veuillez sélectionner au moins un produit", "Attention")
      return
    }
    const selectedProductsData = this.products.filter((p) => p.id && this.selectedProducts.has(p.id))
    const csvContent = this.convertToCSV(selectedProductsData)
    this.downloadCSV(csvContent, "produits_selectionnes.csv")
    this.toastr.success(`${selectedProductsData.length} produit(s) exporté(s)`, "Succès")
  }

  private convertToCSV(products: any[]): string {
    const headers = ["Nom", "Prix", "Devise", "Statut", "Stock", "En solde", "Vedette", "Catégories"]
    const csvRows = [headers.join(",")]
    products.forEach((product) => {
      const row = [
        `"${product.name || ""}"`,
        product.price || "",
        product.currency || "EUR",
        product.status || "",
        product.stock_status || "",
        product.on_sale ? "Oui" : "Non",
        product.featured ? "Oui" : "Non",
        `"${product.categories?.map((cat: any) => cat.name).join(", ") || ""}"`,
      ]
      csvRows.push(row.join(","))
    })
    return csvRows.join("\n")
  }

  private downloadCSV(csvContent: string, filename: string): void {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
