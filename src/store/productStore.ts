import { defineStore } from 'pinia';
import { useUserStore } from '@/store/userStore';
import type { Product } from '@/types';

interface State {
    products: Product[];
}

export const useProductStore = defineStore('product', {
    state: (): State => ({
        products: [],
    }),
    getters: {
        getProductById: (state) => {
            return (id: number) => {
                return state.products.find((item) => item.id === id);
            };
        },
        productUser: () => {
            return (productId: number, userId: number) => {
                const productStore = useProductStore();
                const product = productStore.getProductById(productId);

                return !!product?.users.find((item) => item.id === userId);
            };
        },
    },
    actions: {
        initProduct() {
            const userStore = useUserStore();
            const product = {
                id: Date.now(),
                name: '',
                price: null,
                payer: userStore.users[0],
                users: [],
            };

            this.products.push(product);
        },
        remove(id: number) {
            this.products = this.products.filter((item) => item.id !== id);
        },
        update(product: Product) {
            const index = this.products.findIndex((item) => item.id === product.id);

            if (index === -1) return;

            this.products.splice(index, 1, {
                ...product,
                price: product.price,
            });
        },
        copy(id: number) {
            const product = this.getProductById(id);

            if (!product) return;

            const copy = {
                ...product,
                id: Date.now(),
                users: [...product.users],
            };

            this.products.push(copy);
        },
    },
});
