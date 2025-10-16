<!-- src/routes/(app)/login.svelte - Improved Homepage -->
<script lang="ts">
    import '../app.css';
</script>

<div class="min-h-screen">

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                    Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/products" class="btn btn-primary text-lg px-8 py-4">
                        Shop Now
                    </a>
                    <a href="/categories"
                       class="btn bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 text-lg px-8 py-4">
                        Browse Categories
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                    We're committed to providing you with the best shopping experience possible.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                <!-- Feature 1 -->
                <div class="text-center group">
                    <div class="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                        <svg class="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-gray-900">Wide Selection</h3>
                    <p class="text-gray-600 leading-relaxed">
                        Thousands of products across multiple categories to meet all your needs.
                    </p>
                </div>

                <!-- Feature 2 -->
                <div class="text-center group">
                    <div class="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                        <svg class="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582z"/>
                            <path fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-gray-900">Best Prices</h3>
                    <p class="text-gray-600 leading-relaxed">
                        Competitive prices with regular discounts and deals you won't find elsewhere.
                    </p>
                </div>

                <!-- Feature 3 -->
                <div class="text-center group">
                    <div class="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                        <svg class="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-gray-900">Fast Delivery</h3>
                    <p class="text-gray-600 leading-relaxed">
                        Quick and reliable delivery to your doorstep with tracking every step of the way.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                    <div class="text-gray-600">Products</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">50K+</div>
                    <div class="text-gray-600">Happy Customers</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">99%</div>
                    <div class="text-gray-600">Satisfaction</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                    <div class="text-gray-600">Support</div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-blue-600">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl font-bold text-white mb-4">
                Ready to Start Shopping?
            </h2>
            <p class="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers and discover your next favorite product today.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/products"
                   class="bg-white text-blue-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-md transition-colors">
                    View All Products
                </a>
                <a href="/register"
                   class="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-medium px-8 py-4 rounded-md transition-colors">
                    Create Account
                </a>
            </div>
        </div>
    </section>
</div>