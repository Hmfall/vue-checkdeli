<template>
    <header>
        <v-container class="py-6">
            <nav class="d-flex justify-space-between align-center disable-user-select">
                <router-link to="/">
                    <div class="d-flex align-center text-h6 font-weight-bold">
                        <v-icon
                            class="mr-1"
                            :icon="mdiWalletOutline"
                        />
                        <span>Чекдели</span>
                    </div>
                </router-link>
                <div class="d-flex justify-end">
                    <v-btn
                        variant="flat"
                        :icon="mdiThemeLightDark"
                        @click="toggleTheme"
                    />
                </div>
            </nav>
        </v-container>
    </header>
</template>

<script setup lang="ts">
import { mdiThemeLightDark, mdiWalletOutline } from '@mdi/js';
import { useThemeStore } from '@/store/theme';

const { toggleTheme } = useThemeStore();
</script>
