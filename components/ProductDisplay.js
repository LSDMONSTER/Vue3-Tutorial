app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
        /*html*/
        `

    
    <div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img  v-bind:src="image">
          </div>
  
          <div class="product-info">
            <h1>{{ title }}</h1>
  
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory > 0">Almost sold out!</p>
            <p v-else>Out of Stock</p>
  
            <ul>
              <li v-for="detail in details" :key="detail">{{ detail }}</li>
            </ul>
          </div>
  
          <p>Shipping: {{ shipping }}</p>
  
          <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)"
            class="color-circle" :style="{ backgroundColor: variant.color }"></div>
            
          <button class="button" :class="{ disabledButton: inventory === 0 }" :disabled="inventory === 0"
            @click="addToCart">Add to Cart</button>
          <button class="button" @click="removeFromCart">Remove Item</button>
        </div>
    <div class="review-container">
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        
        <review-form @review-submitted="addReview"></review-form>
      <
        </div>
    `,
    data() {
        return {
            product: 'Socks',
            image: './assets/images/socks_green.jpg',
            selectedVariant: 0,
            brand: 'Vue Mastery',
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
            ],
            reviews: []
        };
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },
        removeFromCart() {
            if (this.cart > 0) {
                this.cart -= 1;
            }
        },
        updateVariant(index) {
            this.selectedVariant = index;
        },
        addReview(review) {
            this.reviews.push(review);
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        inventory() {
            return this.variants[this.selectedVariant].quantity;
        },
        shipping() {
            if (this.premium) {
                return 'Free';
            }
            return '$2.99';
        },
    },
});
