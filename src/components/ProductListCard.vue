<template>
    <v-sheet tag="article">
        <div class="d-flex flex-column ga-3">
            <div class="d-flex ga-4">
                <div class="w-50">
                    <v-text-field
                        v-model="product.name"
                        variant="filled"
                        hide-details="auto"
                        placeholder="Название"
                    />
                </div>
                <div class="w-50">
                    <v-text-field
                        v-model.number="product.price"
                        variant="filled"
                        type="number"
                        hide-details="auto"
                        placeholder="Цена"
                    />
                </div>
            </div>
            <v-sheet class="rounded-lg">
                <div class="d-flex align-center ga-4">
                    <div class="d-flex flex-1-1">
                        <v-dialog max-width="500">
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn
                                    :prepend-icon="mdiWalletOutline"
                                    v-bind="activatorProps"
                                    rounded="xl"
                                    variant="tonal"
                                    class="w-100"
                                >
                                    {{ product.payer.name }}
                                </v-btn>
                            </template>
                            <template v-slot:default="{ isActive }">
                                <app-sheet class="disable-user-select">
                                    <div class="mb-4">
                                        <div class="text-h6 mb-2">
                                            Изменить плательщика
                                        </div>
                                        <div class="text-body-2">Кто платил за это?</div>
                                    </div>
                                    <div class="d-flex flex-column ga-4">
                                        <v-radio-group
                                            v-model="product.payer"
                                            hide-details="auto"
                                        >
                                            <v-radio
                                                v-for="user in userStore.users"
                                                :key="user.id"
                                                :value="user"
                                                :label="user.name"
                                                @click="isActive.value = false"
                                            />
                                        </v-radio-group>
                                    </div>
                                </app-sheet>
                            </template>
                        </v-dialog>
                    </div>
                    <v-sheet width="122">
                        <v-btn
                            rounded="xl"
                            variant="tonal"
                            class="w-100"
                            @click="copyProduct"
                        >
                            <v-icon :icon="mdiContentCopy" />
                        </v-btn>
                    </v-sheet>
                    <div class="d-flex">
                        <v-btn
                            :prepend-icon="mdiDelete"
                            color="accent"
                            rounded="xl"
                            variant="tonal"
                            data-test="remove-button"
                            @click="removeProduct"
                        >
                            Удалить
                        </v-btn>
                    </div>
                </div>
            </v-sheet>
            <div class="d-flex ga-3 flex-wrap">
                <user-preview
                    :product="product"
                    @click="selectAllUsers"
                />
                <user-preview
                    v-for="user in userStore.users"
                    :key="user.id"
                    :user="user"
                    :product="product"
                    :product-user="productStore.productUser(product.id, user.id)"
                    @click="handleProductUser(user)"
                />
            </div>
        </div>
    </v-sheet>
</template>

<script setup lang="ts">
import { mdiContentCopy, mdiWalletOutline, mdiDelete } from '@mdi/js';
import { reactive, watch } from 'vue';
import AppSheet from '@/components/AppSheet.vue';
import UserPreview from '@/components/UserPreview.vue';
import { useProductStore } from '@/store/productStore';
import { useUserStore } from '@/store/userStore';
import type { Product, User } from '@/types';

interface Props {
    product: Product;
}

const props = defineProps<Props>();
const productStore = useProductStore();
const userStore = useUserStore();
const product = reactive({ ...props.product });
const users = reactive([...props.product.users]);

const removeProduct = () => {
    productStore.remove(product.id);
};

const copyProduct = () => {
    productStore.copy(product.id);
};

const handleProductUser = (user: User) => {
    const index = users.findIndex((item) => item.id === user.id);
    if (index !== -1) {
        users.splice(index, 1);
    } else {
        users.push(user);
    }
};

const selectAllUsers = () => {
    if (users.length < userStore.users.length) {
        users.splice(0, users.length, ...userStore.users);
    } else if (users.length === userStore.users.length) {
        users.splice(0, users.length);
    }
};

watch(
    () => ({ product, users }),
    () => productStore.update({ ...product, users }),
    { deep: true },
);
</script>
