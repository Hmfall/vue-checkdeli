<template>
    <section class="d-flex flex-column ga-6">
        <app-sheet>
            <user-list />
        </app-sheet>
        <div class="w-100 d-flex justify-space-between">
            <router-link to="/">
                <v-btn
                    variant="tonal"
                    color="primary"
                >
                    На главную
                </v-btn>
            </router-link>
            <router-link
                v-if="usersCount && usersDataFilled"
                to="/calculating"
            >
                <v-btn
                    variant="flat"
                    color="primary"
                    :append-icon="mdiSendVariant"
                >
                    Далее
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
                        Далее
                    </v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                    <v-card rounded="lg">
                        <v-card-text class="text-body-1 content-center">
                            <v-icon
                                class="mr-1"
                                :icon="mdiAlertCircleOutline"
                            />
                            <span v-if="!usersCount">Добавьте еще кого-нибудь!</span>
                            <span v-else-if="!usersDataFilled">
                                Стоит дать всем имена!
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
import { mdiAlertCircleOutline, mdiSendVariant } from '@mdi/js';
import { computed } from 'vue';
import AppSheet from '@/components/AppSheet.vue';
import UserList from '@/components/UserList.vue';
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();

const usersCount = computed(() => userStore.users.length >= 2);
const usersDataFilled = computed(() => userStore.users.every((user) => user.name.length));
</script>
