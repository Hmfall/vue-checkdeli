<template>
    <div class="d-flex flex-column ga-8">
        <div class="content-center">
            <v-btn
                variant="outlined"
                color="primary"
                :prepend-icon="mdiPlusCircleOutline"
                data-test="init-button"
                @click="initProduct"
            >
                Добавить позицию
            </v-btn>
        </div>
        <v-divider />
        <div
            v-if="productStore.products.length"
            class="d-flex flex-column ga-10"
        >
            <product-list-card
                v-for="product in productStore.products"
                :key="product.id"
                :product="product"
                data-test="product"
            />
        </div>
        <div
            v-else
            class="d-flex flex-column align-center text-md-center ga-3 disable-user-select"
        >
            <v-icon
                size="50"
                :icon="mdiBasketRemoveOutline"
            />
            <span>Ваша корзина пуста</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { mdiPlusCircleOutline, mdiBasketRemoveOutline } from '@mdi/js';
import ProductListCard from '@/components/ProductListCard.vue';
import { useProductStore } from '@/store/productStore';

const productStore = useProductStore();

const initProduct = () => {
    productStore.initProduct();
};
</script>
