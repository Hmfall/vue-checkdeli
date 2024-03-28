<template>
    <article>
        <div class="d-flex ga-4">
            <div class="content-center">
                <v-avatar color="surface-variant">
                    <span class="text-h6 text-uppercase">{{ avatar }}</span>
                </v-avatar>
            </div>
            <div class="d-flex flex-1-1">
                <v-text-field
                    v-model="username"
                    variant="filled"
                    hide-details="auto"
                />
            </div>
            <div class="content-center">
                <v-btn
                    :icon="mdiDelete"
                    color="accent"
                    variant="tonal"
                    @click="removeUser"
                />
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { mdiDelete } from '@mdi/js';
import { computed, ref, watch } from 'vue';
import { useUserStore } from '@/store/userStore';
import type { User } from '@/types';

interface Props {
    user: User;
}

const props = defineProps<Props>();

// TODO const { user } = toRefs(props) ???

const userStore = useUserStore();
const username = ref(props.user.name);

const avatar = computed(() => props.user.name.charAt(0));

const removeUser = () => {
    userStore.remove(props.user.id);
};

const updateUsername = () => {
    userStore.updateUsername(props.user.id, username.value);
};

watch(
    () => username.value,
    () => updateUsername(),
);
</script>
