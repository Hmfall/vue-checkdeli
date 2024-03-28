<template>
    <div class="d-flex flex-column ga-8">
        <div class="content-center">
            <v-btn
                variant="outlined"
                color="primary"
                :prepend-icon="mdiPlusCircleOutline"
                @click="initUser"
            >
                Добавить человека
            </v-btn>
        </div>
        <v-divider />
        <div
            v-if="userStore.users.length"
            class="d-flex flex-column ga-4"
        >
            <user-list-card
                v-for="user in userStore.users"
                :key="user.id"
                :user="user"
            />
        </div>
        <div
            v-else
            class="content-center flex-column ga-3 disable-user-select"
        >
            <v-icon
                size="50"
                :icon="mdiAutorenew"
            />
            <div class="text-center">Пока что пусто...<br />Добавим кого-нибудь!</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { mdiAutorenew, mdiPlusCircleOutline } from '@mdi/js';
import UserListCard from '@/components/UserListCard.vue';
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();

const initUser = () => {
    userStore.initUser();
};
</script>
