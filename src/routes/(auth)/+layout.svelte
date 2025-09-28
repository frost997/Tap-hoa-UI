<script lang="ts">
    import '../../app.css';
</script>

<div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <!-- Logo -->
        <div class="text-center">
            <a href="/" class="text-3xl font-bold text-primary-600">
                YourStore
            </a>
        </div>

        <slot/>
    </div>
</div>