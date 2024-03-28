<template>
    <div class="cursor-pointer">
        <div class="d-flex flex-column align-center border-sm pa-2 rounded-lg ga-1">
            <v-avatar color="surface-variant">
                <div
                    class="d-flex w-100 h-100 justify-center align-center"
                    :class="{
                        'bg-primary':
                            (user && productUser) ||
                            productStore.getProductById(product.id)?.users.length ===
                                userStore.users.length,
                    }"
                >
                    <template v-if="user">
                        <v-icon
                            v-if="productUser"
                            :icon="mdiCheck"
                        />
                        <span
                            v-else
                            class="text-uppercase"
                        >
                            {{ user.name.charAt(0) }}
                        </span>
                    </template>
                    <v-icon
                        v-else
                        :icon="mdiAllInclusive"
                    />
                </div>
            </v-avatar>
            <div class="text-subtitle-2">
                <span v-if="user"> {{ user.name }} </span>
                <span v-else>Все</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { mdiAllInclusive, mdiCheck } from '@mdi/js';
import { toRefs } from 'vue';
import { useProductStore } from '@/store/productStore';
import { useUserStore } from '@/store/userStore';
import type { Product, User } from '@/types';

interface Props {
    user?: User;
    product: Product;
    productUser?: boolean;
}

const props = defineProps<Props>();
const { user, product, productUser } = toRefs(props);
const productStore = useProductStore();
const userStore = useUserStore();
</script>
