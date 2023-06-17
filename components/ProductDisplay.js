app.component('product-display',{
    props: {
        premium: {
            type: Boolean,
            required:true
        }
    },
    
    
    template:
    /*html*/ 
`<div class="product-display">
    <div class="product-container">
    <div class="product-image">
    <img v-bind:src="image">
    </div>


<div class="product-info">
    <h1>{{ title }}</h1>

    <p v-if="inventory > 10">In Stock</p>
    <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
    <p v-else>Out of Stock
    <ul>
    <li v-for="detail in details">{{ detail }}</li>
    </ul>
    </div>
    <p> Shipping: {{ shipping }}</p>
    <div v-for="(variant, index) in variants" 
    :key="variant.id" 
    @mouseover="updateVariant(index)"
    class="color-circle" 
    :style="{ backgroundColor: variant.color}">{{ variant.color }}

</div>
    
<button
    class="button"
    :class="{disabledButton: !inventory}" 
    :disabled="!inventory"
    v-on:click="addToCart">
    Add to Cart
    </button> 
    <button
    class="button"
    @click="removeFromCart">
    Remove Item
    </button>
    
    
    <!-- solution -->
    </div>
    </div>
</div>
<review-list v-if="reviews.length" :reviews="reviews"> </review-list>
<review-form @review-submitted="addReview"></review-form>
</div>`,
data() {
    return {
        product: 'Socks',
        image: './assets/images/socks_green.jpg',
        selectedVariant: 0,
        brand: 'Vue Mastery',
        inventory: 100,

        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
        ],
        reviews: []
    }
},
methods: {
    addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    // solution
    removeFromCart() {
        if (this.cart >= 1) {
            this.cart -= 1
        }
    },
    // solution
    updateVariant(index) {
        this.selectedVariant = index
        
    },
    addReview(review) {
    this.reviews.push(review)
    }

},
computed: {
    title() {
        return this.brand + ' ' + this.product
    },
    image() {
        return this.variants[this.selectedVariant].image
    },
    inventory() {
        return this.variants[this.selectedVariant].quantity
    },
    // solution
    shipping() {
        if (this.premium) {
            return 'free'
        }
            return 2.99
    },
    sale() {
        if (this.onSale) {
            return this.brand + ' ' + this.product + ' is on sale.'
        }
        return ''
        
    }
}
})