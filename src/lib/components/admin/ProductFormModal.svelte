<script lang="ts">
  import { cn } from "$utils";
  import Button from "$components/shared/Button.svelte";
  import Input from "$components/shared/Input.svelte";
  import Select from "$components/shared/Select.svelte";

  type ProductCategory = "beverages" | "snacks" | "daily_necessities";

  export interface ProductFormData {
    productName: string;
    description: string;
    price: number;
    category: ProductCategory;
    imageURL?: string;
    on_hand: number;
  }

  interface Props {
    open?: string;
    onclose?: () => void;
    onsubmit?: (data: ProductFormData) => void;
    onedit?: (data: ProductFormData) => void;
  }

  let { open = $bindable(""), onclose, onsubmit }: Props = $props();

  // Form state
  let productName = $state("");
  let description = $state("");
  let price = $state(0);
  let category = $state<ProductCategory>("beverages");
  let imageURL = $state("");
  let on_hand = $state(0);
  let isSubmitting = $state(false);
  let errors = $state<Record<string, string>>({});

  // Category options
  const categoryOptions = [
    { value: "beverages", label: "🥤 Beverages" },
    { value: "snacks", label: "🍿 Snacks" },
    { value: "daily_necessities", label: "🧴 Daily Necessities" }
  ];

  // Validation
  function validate(): boolean {
    errors = {};

    if (!productName.trim()) {
      errors.productName = "Product name is required";
    }

    if (!description.trim()) {
      errors.description = "Description is required";
    }

    if (price <= 0) {
      errors.price = "Price must be greater than 0";
    }

    if (on_hand < 0) {
      errors.on_hand = "Stock cannot be negative";
    }

    return Object.keys(errors).length === 0;
  }

  // Reset form
  function resetForm() {
    productName = "";
    description = "";
    price = 0;
    category = "beverages";
    imageURL = "";
    on_hand = 0;
    errors = {};
  }

  // Handle close
  function handleClose() {
    open = "";
    resetForm();
    onclose?.();
  }

  // Handle submit
  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!validate()) return;

    isSubmitting = true;

    try {
      const formData: ProductFormData = {
        productName: productName.trim(),
        description: description.trim(),
        price,
        category,
        imageURL: imageURL.trim() || undefined,
        on_hand
      };

      onsubmit?.(formData);
      handleClose();
    } finally {
      isSubmitting = false;
    }
  }

  async function handleEdit(e: Event) {

  // Handle keyboard events
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && open) {
      handleClose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open !== ""}
  <!-- Backdrop -->
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      class="absolute inset-0 bg-surface-900/60 backdrop-blur-sm animate-fade-in"
      onclick={handleClose}
      onkeydown={(e) => e.key === "Enter" && handleClose()}
      role="button"
      tabindex="-1"
      aria-label="Close modal"
    ></div>

    <!-- Modal -->
    <div
      class="relative w-full max-w-md bg-white rounded-2xl shadow-xl animate-slide-up"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between p-5 border-b border-surface-100"
      >
        <h2 class="text-lg font-display font-semibold text-surface-900">
          Create New Product
        </h2>
        <button
          type="button"
          class="p-2 -m-2 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors"
          onclick={handleClose}
          aria-label="Close"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form
        onsubmit={open === "create"
          ? handleSubmit
          : open === "update"
            ? handleEdit
            : null}
        class="p-5 space-y-4"
      >
        <Input
          label="Product Name"
          placeholder="Enter product name"
          bind:value={productName}
          error={errors.productName}
          required
        />

        <div>
          <label
            for="Description"
            class="block text-sm font-medium text-surface-700 mb-1.5"
          >
            Description <span class="text-red-500">*</span>
          </label>
          <textarea
            bind:value={description}
            placeholder="Enter product description"
            rows="3"
            class={cn(
              "w-full px-4 py-2.5 rounded-xl border bg-white text-surface-900 placeholder-surface-400",
              "transition-all duration-200 resize-none",
              "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
              errors.description ? "border-red-300" : "border-surface-200"
            )}
          ></textarea>
          {#if errors.description}
            <p class="mt-1.5 text-sm text-red-500">{errors.description}</p>
          {/if}
        </div>

        <div class="grid grid-cols-2 gap-4">
          <Input
            type="number"
            label="Price"
            placeholder="0.00"
            bind:value={price}
            error={errors.price}
            required
          />

          <Input
            type="number"
            label="Stock (On Hand)"
            placeholder="0"
            bind:value={on_hand}
            error={errors.on_hand}
            required
          />
        </div>

        <Select
          label="Category"
          options={categoryOptions}
          bind:value={category}
          required
        />

        <Input
          label="Image URL"
          placeholder="https://example.com/image.jpg"
          bind:value={imageURL}
        />

        <!-- Footer -->
        <div class="flex items-center justify-end gap-3 pt-4">
          <Button variant="ghost" onclick={handleClose} type="button">
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>Create Product</Button>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.2s ease-out;
  }

  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }
</style>
