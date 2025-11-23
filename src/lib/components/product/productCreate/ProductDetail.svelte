<script lang="ts">
    import {slide} from 'svelte/transition';
    import {Plus, X} from "lucide-svelte";
    import {productTitle} from "$lib/stores/title";
    import {productStore} from "$lib/stores/product";

    productTitle.set("Product Information");

    // Types
    type ImageFile = {
        name: string;
        url: string;
    };

    // State
    let imageUrl: string = $state('');
    let uploadedImages: ImageFile[] = $state([]);

    let name: string = $state("");
    let on_hand: number = $state(0);
    let brand: string = $state("");        // FIXED wrong type
    let categories: string = $state("");   // FIXED wrong type
    let price: number = $state(0);         // ADDED price field
    let coupon: string = $state("");       // ADDED Sales Coupon
    let showAdditional: boolean = $state(false);

    function addImageUrl() {
        if (!imageUrl.trim()) return;

        uploadedImages = [
            ...uploadedImages,
            {name: "url-image", url: imageUrl}
        ];

        imageUrl = "";
    }

    function removeImage(index: number) {
        uploadedImages = uploadedImages.filter((_, i) => i !== index);
    }

    function addProduct() {
        const product = {
            productName: name,
            images: uploadedImages[0].url,
            brand,
            categories,
            price,
            on_hand,
        };
        productStore.addProduct([product])
        console.log("NEW PRODUCT:", product);
    }
</script>

<main class="content">

    <!-- Images -->
    <div class="image-row">
        {#each uploadedImages as img, index}
            <div class="image-box">
                <img src={img.url} alt={img.name}/>

                <button
                        class="remove-btn"
                        onclick={() => removeImage(index)}
                        type="button"
                >
                    <X/>
                </button>
            </div>
        {/each}
    </div>

    <!-- Image URL Input -->
    <div class="url-input-box">
        <label>
            Images:
            <input
                    type="text"
                    placeholder="Paste image URL..."
                    bind:value={imageUrl}
                    class="url-input"
            />
        </label>
        <button
                class="p-2 rounded hover:bg-gray-200 active:scale-95 transition transform duration-100"
                onclick={() => addImageUrl()}
        >
            <Plus/>
        </button>
    </div>

    <!-- Name -->
    <label class="section-title">Name
        <input
                type="text"
                bind:value={name}
                placeholder="Name Product"
                class="text-input"
        />
    </label>

    <!-- On-hand -->
    <label class="section-title">On-hand
        <input
                type="number"
                min="0"
                bind:value={on_hand}
                placeholder="Stock quantity"
                class="text-input"
        />
    </label>

    <!-- Brand -->
    <label class="section-title">Brand
        <input
                type="text"
                bind:value={brand}
                placeholder="Brand name"
                class="text-input"
        />
    </label>

    <!-- Category -->
    <label class="section-title">Category
        <input
                type="text"
                bind:value={categories}
                placeholder="Category"
                class="text-input"
        />
    </label>

    <!-- Price -->
    <label class="section-title">Price
        <input
                type="number"
                min="0"
                step="0.01"
                bind:value={price}
                placeholder="0.00"
                class="text-input"
        />
    </label>

    <!-- Additional Info -->
    <button class="additional-toggle" onclick={() => (showAdditional = !showAdditional)}>
        Additional Info
        <span>{showAdditional ? "▲" : "▼"}</span>
    </button>

    {#if showAdditional}
        <div transition:slide class="additional-content">
            <label>Sales Coupon
                <input
                        type="text"
                        bind:value={coupon}
                        placeholder="Coupon Code"
                        class="text-input"
                />
            </label>
        </div>
    {/if}

    <!-- Footer -->
    <div class="footer">
        <button class="cancel-btn">Cancel</button>
        <button class="continue-btn" onclick={() => addProduct()}>
            Confirm
        </button>
    </div>
</main>


<style>
    /*.page-wrapper {*/
    /*    display: flex;*/
    /*    width: 100%;*/
    /*    padding: 40px;*/
    /*    font-family: sans-serif;*/
    /*    gap: 40px;*/
    /*}*/

    /* Sidebar */
    /*.sidebar {*/
    /*    width: 200px;*/
    /*}*/

    /*.sidebar ul {*/
    /*    list-style: none;*/
    /*    padding: 0;*/
    /*}*/

    /*.sidebar li {*/
    /*    padding: 8px 0;*/
    /*    color: #777;*/
    /*    cursor: pointer;*/
    /*}*/

    /*.sidebar li.active {*/
    /*    color: #2c67f4;*/
    /*    font-weight: bold;*/
    /*}*/

    /* Main Content */
    .content {
        flex: 1;
        max-width: 700px;
    }

    .section-title {
        display: block;
        margin-top: 20px;
        margin-bottom: 6px;
        font-size: 14px;
        color: #333;
    }

    /* Images */
    .image-row {
        display: flex;
        gap: 12px;
        margin-bottom: 20px;
        flex-wrap: wrap; /* optional */
    }

    .image-box {
        position: relative; /* ← REQUIRED */
        width: 80px;
        height: 80px;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid #ddd;
    }

    .image-box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .remove-btn {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 20px;
        height: 20px;
        background: rgba(0, 0, 0, 0.6);
        color: white;
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
    }

    .remove-btn:hover {
        background: rgba(0, 0, 0, 0.8);
    }

    /*.upload-box {*/
    /*    width: 80px;*/
    /*    height: 80px;*/
    /*    border: 2px dashed #ccc;*/
    /*    border-radius: 10px;*/
    /*    display: flex;*/
    /*    justify-content: center;*/
    /*    align-items: center;*/
    /*    cursor: pointer;*/
    /*    color: #666;*/
    /*    font-size: 24px;*/
    /*    position: relative;*/
    /*}*/

    /*.upload-box input {*/
    /*    opacity: 0;*/
    /*    position: absolute;*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    cursor: pointer;*/
    /*}*/

    /* Inputs */
    .text-input,
    .textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 14px;
    }

    .textarea {
        min-height: 120px;
        resize: none;
    }

    /* Additional Info */
    .additional-toggle {
        margin-top: 20px;
        cursor: pointer;
        color: #2c67f4;
        display: inline-block;
        user-select: none;
    }

    .additional-content {
        margin-top: 12px;
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 10px;
    }

    /* Footer Buttons */
    .footer {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
    }

    .cancel-btn {
        background: none;
        border: none;
        color: #666;
        font-size: 14px;
        cursor: pointer;
    }

    .continue-btn {
        background: #9aa2ac;
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        border: none;
        cursor: pointer;
    }
</style>
