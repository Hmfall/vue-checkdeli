<template>
    <v-app>
        <v-layout>
            <v-app-bar
                class="bg-background"
                elevation="0"
                density="default"
            >
                <slot name="header" />
            </v-app-bar>
            <v-main>
                <v-container class="h-100">
                    <router-view />
                </v-container>
            </v-main>
        </v-layout>
    </v-app>
</template>

<script setup lang="ts"></script>
