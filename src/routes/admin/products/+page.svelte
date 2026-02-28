<script lang="ts">
  import ProductFormModal from "$components/admin/ProductFormModal.svelte";
  import ProductRow from "$components/admin/ProductRow.svelte";
  import Button from "$components/shared/Button.svelte";
  import Card from "$components/shared/Card.svelte";
  import { api, ApiService } from "$services";
  import { toast } from "$stores";
  import type { Product, ProductCategory, ProductFormData } from "$types";
  import { onMount } from "svelte";

  let products = $state<Product[] | null>([]);
  let selectedProduct = $state<Product | null>([]);
  let isLoading = $state(true);
  let currentPage = $state(1);
  let totalPages = $state(1);
  let selectedCategory = $state<ProductCategory | null>(null);
  let searchQuery = $state("");
  let showModal = $state<"create" | "update" | "">("");
  async function loadProducts() {
    isLoading = true;
    try {
      const response = await api.getProducts({
        category: selectedCategory ?? undefined,
        search: searchQuery || undefined,
        page: currentPage,
        pageSize: 12,
      });
      products = response.data.data;
      totalPages = response.data.totalPages;
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    loadProducts();
  });

  function handleCreate(e: MouseEvent): void {
    selectedProduct = null;
    showModal = "create";
  }
  function handleUpdate(data: Product): void {
    selectedProduct = data;
    showModal = "update";
  }
  async function handleFormSubmit(data: any) {
    console.log("New product:", data);
    // Call your API here
    try {
      const payload = [{ ...data, imageURL: [data.imageURL] }];

      await api.createProduct(payload);
      toast.success(`Product "${data.productName}" created!`);
    } catch (error) {
      toast.error(`Failed to create product "${data.productName}"`);
    }
  }

  async function handleFormUpdate(data: any) {
    console.log("Updated product:", data);
    // Call your API here
    try {
      const payload = { ...data, imageURL: [data.imageURL] };

      await api.updateProduct(payload);
      toast.success(`Product "${data.productName}" created!`);
    } catch (error) {
      toast.error(`Failed to create product "${data.productName}"`);
    }
  }
</script>

<svelte:head>
  <title>Products - Admin - Campus Store</title>
</svelte:head>

<Card>
  <div class="flex items-center justify-between mb-4">
    <h1 class="text-xl font-display font-semibold text-surface-900 mb-4">
      Product Management
    </h1>
    <Button onclick={handleCreate}>
      <svg
        class="w-5 h-5 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
      Create
    </Button>
  </div>

  <div
    class="list list-cols-1 sm:list-cols-2 lg:list-cols-3 xl:list-cols-4 gap-6"
  >
    {#each products as product (product._id)}
      <ProductRow {product} onEdit={handleUpdate} />
    {/each}
  </div>
</Card>

<!-- Modal -->
<ProductFormModal
  bind:open={showModal}
  product={selectedProduct}
  onsubmit={handleFormSubmit}
  onedit={handleFormUpdate}
/>
