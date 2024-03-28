<template>
    <app-layout>
        <template v-slot:header>
            <app-header />
        </template>
    </app-layout>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppLayout from '@/components/AppLayout.vue';
import { useThemeStore } from '@/store/theme';
import '@/styles/style.scss';

// window.onbeforeunload = function () {
//     return 'Do you really want to leave this page?';
// };

useThemeStore().initTheme();
</script>
