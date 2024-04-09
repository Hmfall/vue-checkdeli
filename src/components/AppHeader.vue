<template>
    <v-sheet
        tag="header"
        class="w-100"
    >
        <v-container class="py-0">
            <div class="d-flex justify-space-between align-center disable-user-select">
                <router-link to="/">
                    <div class="d-flex align-center">
                        <v-icon
                            class="mr-1"
                            :icon="mdiWalletOutline"
                        />
                        <span class="text-h6 font-weight-bold">Чекдели</span>
                    </div>
                </router-link>
                <div class="d-flex justify-end">
                    <v-btn
                        variant="text"
                        :icon="mdiThemeLightDark"
                        @click="toggleTheme"
                    />
                </div>
            </div>
        </v-container>
    </v-sheet>
</template>

<script setup lang="ts">
import { mdiThemeLightDark, mdiWalletOutline } from '@mdi/js';
import { useThemeStore } from '@/store/themeStore';

const { toggleTheme } = useThemeStore();
</script>
