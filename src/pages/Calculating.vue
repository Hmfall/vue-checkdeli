<template>
    <section class="d-flex flex-column ga-6">
        <app-sheet elevation="4">
            <ProductList />
        </app-sheet>
        <app-sheet>
            <div class="content-center flex-column disable-user-select">
                Промежуточный итог:
                <div class="text-h6">{{ billStore.getSubtotal }} ₽</div>
            </div>
        </app-sheet>
        <div class="d-flex justify-space-between">
            <router-link to="/users">
                <v-btn
                    variant="tonal"
                    color="primary"
                    :prepend-icon="mdiArrowLeftBottom"
                >
                    Назад
                </v-btn>
            </router-link>
            <router-link
                v-if="
                    productsCount &&
                    productsNameFilled &&
                    productsPriceFilled &&
                    productsUsersFilled
                "
                to="/results"
            >
                <v-btn
                    variant="flat"
                    color="primary"
                    :append-icon="mdiSendVariant"
                >
                    К результатам
                </v-btn>
            </router-link>
            <v-dialog
                v-else
                max-width="500"
            >
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                        variant="flat"
                        color="primary"
                        :append-icon="mdiSendVariant"
                        v-bind="activatorProps"
                    >
                        К результатам
                    </v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                    <v-card rounded="lg">
                        <v-card-text class="content-center">
                            <v-icon
                                class="mr-1"
                                :icon="mdiAlertCircleOutline"
                            />
                            <span v-if="!productsCount">
                                Добавьте хотя бы две позиции!
                            </span>
                            <span v-else-if="!productsNameFilled">
                                Стоит дать всем позициям имена!
                            </span>
                            <span v-else-if="!productsPriceFilled">
                                Стоит указать цену всем позициям!
                            </span>
                            <span v-else-if="!productsUsersFilled">
                                Отметь пользователей во всех продуктах!
                            </span>
                        </v-card-text>
                        <v-card-actions class="justify-center mb-2">
                            <v-btn
                                variant="tonal"
                                color="primary"
                                @click="isActive.value = false"
                            >
                                Ок
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </div>
    </section>
</template>

<script setup>
import { mdiAlertCircleOutline, mdiArrowLeftBottom, mdiSendVariant } from '@mdi/js';
import { onBeforeMount, computed } from 'vue';
import { useRouter } from 'vue-router';
import AppSheet from '@/components/AppSheet.vue';
import ProductList from '@/components/ProductList.vue';
import { useBillStore } from '@/store/billStore';
import { useProductStore } from '@/store/productStore';
import { useUserStore } from '@/store/userStore';

const router = useRouter();
const billStore = useBillStore();
const productStore = useProductStore();
const userStore = useUserStore();

onBeforeMount(() => !userStore.users.length && router.push('/users'));

const productsCount = computed(() => productStore.products.length >= 2);
const productsNameFilled = computed(() =>
    productStore.products.every((product) => product.name.length),
);
const productsPriceFilled = computed(() =>
    productStore.products.every((product) => product.price),
);
const productsUsersFilled = computed(() =>
    productStore.products.every((product) => product.users.length),
);
</script>
