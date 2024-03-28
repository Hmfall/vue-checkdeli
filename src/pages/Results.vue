<template>
    <section class="d-flex flex-column ga-6">
        <app-sheet>
            <div>
                <div class="text-h6 text-center mb-4">Результаты</div>
                <v-divider />
                <v-tabs
                    v-model="tab"
                    align-tabs="center"
                    color="primary"
                    class="mb-4"
                >
                    <v-tab value="byDebtor">Кто - кому</v-tab>
                    <v-tab value="byCreditor">Кому - кто</v-tab>
                </v-tabs>
                <v-window v-model="tab">
                    <v-window-item value="byDebtor">
                        <div class="d-flex flex-column ga-5">
                            <div
                                v-for="billByDebtor in billStore.mappedByDebtor"
                                :key="billByDebtor.debtor.id"
                            >
                                <div class="text-primary font-weight-medium">
                                    Пользователь {{ billByDebtor.debtor.name }} должен
                                </div>
                                <div v-if="!billByDebtor.creditors.length">
                                    А никому он ничего не должен!
                                </div>
                                <div
                                    v-for="billByCreditorDebtors in billByDebtor.creditors"
                                    :key="billByCreditorDebtors.creditor.id"
                                >
                                    {{ billByCreditorDebtors.creditor.name }} -
                                    {{ billByCreditorDebtors.bill }} ₽
                                </div>
                            </div>
                        </div>
                    </v-window-item>
                    <v-window-item value="byCreditor">
                        <div class="d-flex flex-column ga-5">
                            <div
                                v-for="billByCreditor in billStore.mappedByCreditor"
                                :key="billByCreditor.creditor.id"
                            >
                                <div class="text-primary font-weight-medium">
                                    Пользователю
                                    {{ billByCreditor.creditor.name }} должны
                                </div>
                                <div
                                    v-for="billByCreditorDebtors in billByCreditor.debtors"
                                    :key="billByCreditorDebtors.debtor.id"
                                >
                                    {{ billByCreditorDebtors.debtor.name }} -
                                    {{ billByCreditorDebtors.bill }} ₽
                                </div>
                            </div>
                        </div>
                    </v-window-item>
                </v-window>
            </div>
        </app-sheet>
        <div>
            <router-link to="/">
                <v-btn
                    color="primary"
                    rounded="xl"
                    variant="tonal"
                    class="w-100"
                >
                    Вернуться домой
                </v-btn>
            </router-link>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppSheet from '@/components/AppSheet.vue';
import { useBillStore } from '@/store/billStore';

const router = useRouter();
const billStore = useBillStore();

onBeforeMount(() => !billStore.bill.length && router.push('/users'));

billStore.calculateNormalizedBill();

const tab = ref('byDebtor');
</script>
