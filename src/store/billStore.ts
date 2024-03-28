import { defineStore } from 'pinia';
import { useProductStore } from '@/store/productStore';
import { useUserStore } from '@/store/userStore';
import type { DebtorCreditor, MappedByCreditor, MappedByDebtor } from '@/types';

interface State {
    bill: DebtorCreditor[];
}

export const useBillStore = defineStore('bill', {
    state: (): State => ({
        bill: [],
    }),
    getters: {
        mappedByCreditor() {
            const userStore = useUserStore();
            const mappedByCreditor: MappedByCreditor[] = [];
            const bill = this.bill;

            if (!bill.length) return;

            userStore.users.forEach((user) => {
                const billByUser: MappedByCreditor = {
                    creditor: user,
                    debtors: [],
                };

                bill.forEach((item) => {
                    if (item.creditor.id === user.id) {
                        billByUser.debtors.push(item);
                    }
                });

                if (billByUser.debtors.length) {
                    mappedByCreditor.push(billByUser);
                }
            });

            return mappedByCreditor;
        },
        getSubtotal() {
            const productStore = useProductStore();
            let result = 0;

            productStore.products.forEach((product) => {
                if (!product.price) return;
                result += product.price;
            });

            return result;
        },
        mappedByDebtor() {
            const userStore = useUserStore();
            const mappedByDebtor: MappedByDebtor[] = [];
            const bill = this.bill;

            if (!bill.length) return;

            userStore.users.forEach((user) => {
                const billByUser: MappedByDebtor = {
                    debtor: user,
                    creditors: [],
                };

                bill.forEach((item) => {
                    if (item.debtor.id === user.id) {
                        billByUser.creditors.push(item);
                    }
                });

                mappedByDebtor.push(billByUser);
            });

            return mappedByDebtor;
        },
    },
    actions: {
        calculateNormalizedBill() {
            const productStore = useProductStore();
            const debtorsByCreditors: DebtorCreditor[] = [];

            productStore.products.forEach((product) => {
                if (!product.price) return;

                const payer = product.payer;
                const priceByUser = product.price / product.users.length;
                const debtors = product.users.filter((user) => user.id !== payer.id);

                debtors.forEach((debtor) => {
                    const debtorCreditor = debtorsByCreditors.find(
                        (item) =>
                            item.debtor.id === payer.id && item.creditor.id === debtor.id,
                    );

                    const creditorDebtor = debtorsByCreditors.find(
                        (item) =>
                            item.creditor.id === payer.id && item.debtor.id === debtor.id,
                    );

                    if (creditorDebtor) {
                        creditorDebtor.bill += priceByUser;
                    }

                    if (debtorCreditor) {
                        debtorCreditor.bill -= priceByUser;
                        if (debtorCreditor.bill < 0) {
                            const temp = debtorCreditor.creditor;
                            debtorCreditor.creditor = debtorCreditor.debtor;
                            debtorCreditor.debtor = temp;
                            debtorCreditor.bill = Math.abs(debtorCreditor.bill);
                        }
                    }

                    if (!debtorCreditor && !creditorDebtor) {
                        debtorsByCreditors.push({
                            debtor,
                            creditor: payer,
                            bill: priceByUser,
                        });
                    }
                });
            });

            this.bill = debtorsByCreditors.map((item) => ({
                ...item,
                bill: Math.ceil(item.bill),
            }));
        },
    },
});
