<template>
    <v-app>
        <slot name="header" />
        <main class="flex-1-1">
            <v-container class="h-100">
                <router-view />
            </v-container>
        </main>
    </v-app>
</template>

<script setup lang="ts"></script>
