import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useTheme } from 'vuetify';
import type { Theme } from '@/types';

export const useThemeStore = defineStore('theme', () => {
    const themeLocalStorage = (localStorage.getItem('THEME') || 'dark') as Theme;
    const theme = useTheme();
    const themeValue = ref<Theme>(themeLocalStorage);

    const currentTheme = computed(() => themeValue.value);

    const initTheme = () => {
        theme.global.name.value = currentTheme.value;
    };

    const toggleTheme = () => {
        const newTheme = theme.global.current.value.dark ? 'light' : 'dark';
        theme.global.name.value = newTheme;
        localStorage.setItem('THEME', newTheme);
        themeValue.value = newTheme;
    };

    return { initTheme, toggleTheme, currentTheme };
});
