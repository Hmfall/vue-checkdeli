<template>
    <div class="mt-a-2 disable-user-select">
        <app-sheet class="w-100 mb-8">
            <div class="text-h3 text-center mb-4 text-primary">Чекдели</div>
            <div class="text-center text-h6">Делить чеки - просто!</div>
        </app-sheet>
        <div class="d-flex justify-center">
            <router-link to="/users">
                <v-btn
                    variant="flat"
                    rounded="xl"
                    size="large"
                    color="primary"
                >
                    Начать!
                </v-btn>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import AppSheet from '@/components/AppSheet.vue';
</script>
