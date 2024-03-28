import { createPinia, setActivePinia } from 'pinia';
import { expect, it, describe, beforeEach } from 'vitest';
import { useBillStore } from '@/store/billStore';
import { useProductStore } from '@/store/productStore';
import { useUserStore } from '@/store/userStore';
import type { User, DebtorCreditor, MappedByCreditor, MappedByDebtor } from '@/types';

const getUsers = (): User[] => [
    { id: 1735111513217, name: 'Вася' },
    { id: 1813429656761, name: 'Петя' },
    { id: 1815362656795, name: 'Иван' },
];

describe('User Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('should calculate case 1 correct', () => {
        const productStore = useProductStore();
        const userStore = useUserStore();
        const billStore = useBillStore();
        userStore.users = getUsers();

        productStore.products = [
            {
                id: 1910198913215,
                name: 'Огурец',
                price: 2000,
                payer: { id: 1735111513217, name: 'Вася' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1815362656795, name: 'Иван' },
                    { id: 1813429656761, name: 'Петя' },
                ],
            },
            {
                id: 1914528933219,
                name: 'Помидор',
                price: 1000,
                payer: { id: 1815362656795, name: 'Иван' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
        ];

        const bill: DebtorCreditor[] = [
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1735111513217, name: 'Вася' },
                bill: 167,
            },
            {
                debtor: { id: 1813429656761, name: 'Петя' },
                creditor: { id: 1735111513217, name: 'Вася' },
                bill: 667,
            },
        ];

        billStore.calculateNormalizedBill();
        expect(billStore.bill).toEqual(bill);
    });

    it('should calculate case 2 correct', () => {
        const productStore = useProductStore();
        const userStore = useUserStore();
        const billStore = useBillStore();
        userStore.users = getUsers();

        productStore.products = [
            {
                id: 1910198913215,
                name: 'Огурец',
                price: 2000,
                payer: { id: 1735111513217, name: 'Вася' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1914528933219,
                name: 'Помидор',
                price: 1000,
                payer: { id: 1815362656795, name: 'Иван' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1953521243215,
                name: 'Салат',
                price: 500,
                payer: { id: 1813429656761, name: 'Петя' },
                users: [{ id: 1815362656795, name: 'Иван' }],
            },
        ];

        const bill: DebtorCreditor[] = [
            {
                debtor: { id: 1813429656761, name: 'Петя' },
                creditor: { id: 1735111513217, name: 'Вася' },
                bill: 667,
            },
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1735111513217, name: 'Вася' },
                bill: 167,
            },
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1813429656761, name: 'Петя' },
                bill: 500,
            },
        ];

        billStore.calculateNormalizedBill();
        expect(billStore.bill).toEqual(bill);
    });

    it('should calculate case 3 correct', () => {
        const productStore = useProductStore();
        const userStore = useUserStore();
        const billStore = useBillStore();
        userStore.users = getUsers();

        productStore.products = [
            {
                id: 1910198913215,
                name: 'Огурец',
                price: 2000,
                payer: { id: 1735111513217, name: 'Вася' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1914528933219,
                name: 'Помидор',
                price: 1000,
                payer: { id: 1815362656795, name: 'Иван' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1953521243215,
                name: 'Салат',
                price: 500,
                payer: { id: 1813429656761, name: 'Петя' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
        ];

        const bill: DebtorCreditor[] = [
            {
                debtor: { id: 1813429656761, name: 'Петя' },
                creditor: { id: 1735111513217, name: 'Вася' },
                bill: 417,
            },
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1735111513217, name: 'Вася' },
                bill: 167,
            },
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1813429656761, name: 'Петя' },
                bill: 250,
            },
        ];

        billStore.calculateNormalizedBill();
        expect(billStore.bill).toEqual(bill);
    });

    it('should calculate case 4 correct', () => {
        const productStore = useProductStore();
        const userStore = useUserStore();
        const billStore = useBillStore();
        userStore.users = getUsers();

        productStore.products = [
            {
                id: 1910198913215,
                name: 'Огурец',
                price: 2000,
                payer: { id: 1735111513217, name: 'Вася' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1914528933219,
                name: 'Помидор',
                price: 1000,
                payer: { id: 1815362656795, name: 'Иван' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
        ];

        const bill: DebtorCreditor[] = [
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1735111513217, name: 'Вася' },
                bill: 667,
            },
            {
                debtor: { id: 1813429656761, name: 'Петя' },
                creditor: { id: 1815362656795, name: 'Иван' },
                bill: 334,
            },
        ];

        billStore.calculateNormalizedBill();
        expect(billStore.bill).toEqual(bill);
    });

    it('should calculate case 5 correct', () => {
        const productStore = useProductStore();
        const userStore = useUserStore();
        const billStore = useBillStore();
        userStore.users = getUsers();

        productStore.products = [
            {
                id: 1910198913215,
                name: 'Огурец',
                price: 2000,
                payer: { id: 1735111513217, name: 'Вася' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1914528933219,
                name: 'Помидор',
                price: 1000,
                payer: { id: 1815362656795, name: 'Иван' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1953521243215,
                name: 'Салат',
                price: 5000,
                payer: { id: 1813429656761, name: 'Петя' },
                users: [{ id: 1815362656795, name: 'Иван' }],
            },
        ];

        const bill: DebtorCreditor[] = [
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1735111513217, name: 'Вася' },
                bill: 667,
            },
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1813429656761, name: 'Петя' },
                bill: 4667,
            },
        ];

        billStore.calculateNormalizedBill();
        expect(billStore.bill).toEqual(bill);
    });

    it('should calculate case 6 correct', () => {
        const productStore = useProductStore();
        const userStore = useUserStore();
        const billStore = useBillStore();
        userStore.users = getUsers();

        productStore.products = [
            {
                id: 1910198913215,
                name: 'Огурец',
                price: 2000,
                payer: { id: 1735111513217, name: 'Вася' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1914528933219,
                name: 'Помидор',
                price: 1000,
                payer: { id: 1735111513217, name: 'Вася' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1953521243215,
                name: 'Салат',
                price: 5000,
                payer: { id: 1735111513217, name: 'Вася' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
        ];

        const bill: DebtorCreditor[] = [
            {
                debtor: { id: 1813429656761, name: 'Петя' },
                creditor: { id: 1735111513217, name: 'Вася' },
                bill: 2667,
            },
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1735111513217, name: 'Вася' },
                bill: 2667,
            },
        ];

        billStore.calculateNormalizedBill();
        expect(billStore.bill).toEqual(bill);
    });

    it('should calculate case 7 correct', () => {
        const productStore = useProductStore();
        const userStore = useUserStore();
        const billStore = useBillStore();
        userStore.users = getUsers();

        productStore.products = [
            {
                id: 1910198913215,
                name: 'Огурец',
                price: 2000,
                payer: { id: 1735111513217, name: 'Вася' },
                users: [{ id: 1735111513217, name: 'Вася' }],
            },
            {
                id: 1914528933219,
                name: 'Помидор',
                price: 1000,
                payer: { id: 1815362656795, name: 'Иван' },
                users: [{ id: 1815362656795, name: 'Иван' }],
            },
            {
                id: 1953521243215,
                name: 'Салат',
                price: 5000,
                payer: { id: 1813429656761, name: 'Петя' },
                users: [{ id: 1813429656761, name: 'Петя' }],
            },
        ];

        const bill: DebtorCreditor[] = [];

        billStore.calculateNormalizedBill();
        expect(billStore.bill).toEqual(bill);
    });

    it('should calculate case 9 correct', () => {
        const productStore = useProductStore();
        const userStore = useUserStore();
        const billStore = useBillStore();
        userStore.users = getUsers();

        productStore.products = [
            {
                id: 1910198913215,
                name: 'Огурец',
                price: 1894,
                payer: { id: 1735111513217, name: 'Вася' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1914528933219,
                name: 'Помидор',
                price: 3453,
                payer: { id: 1813429656761, name: 'Петя' },
                users: [
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1953521243215,
                name: 'Салат',
                price: 6587,
                payer: { id: 1815362656795, name: 'Иван' },
                users: [{ id: 1815362656795, name: 'Иван' }],
            },
            {
                id: 1153142243213,
                name: 'Пицца',
                price: 2344,
                payer: { id: 1813429656761, name: 'Петя' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1253534534691,
                name: 'Паста',
                price: 8769,
                payer: { id: 1735111513217, name: 'Вася' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
        ];

        const bill: DebtorCreditor[] = [
            {
                debtor: { id: 1735111513217, name: 'Вася' },
                creditor: { id: 1813429656761, name: 'Петя' },
                bill: 541,
            },
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1735111513217, name: 'Вася' },
                bill: 5016,
            },
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1813429656761, name: 'Петя' },
                bill: 2899,
            },
        ];

        billStore.calculateNormalizedBill();
        expect(billStore.bill).toEqual(bill);
    });

    it('should calculate case 8 correct', () => {
        const productStore = useProductStore();
        const userStore = useUserStore();
        const billStore = useBillStore();
        userStore.users = getUsers();

        productStore.products = [
            {
                id: 1910198913215,
                name: 'Огурец',
                price: 1894,
                payer: { id: 1735111513217, name: 'Вася' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1914528933219,
                name: 'Помидор',
                price: 3453,
                payer: { id: 1813429656761, name: 'Петя' },
                users: [
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1953521243215,
                name: 'Салат',
                price: 6587,
                payer: { id: 1815362656795, name: 'Иван' },
                users: [{ id: 1815362656795, name: 'Иван' }],
            },
            {
                id: 1153142243213,
                name: 'Пицца',
                price: 2344,
                payer: { id: 1813429656761, name: 'Петя' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1253534534691,
                name: 'Паста',
                price: 8769,
                payer: { id: 1735111513217, name: 'Вася' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
        ];

        const bill: DebtorCreditor[] = [
            {
                debtor: { id: 1735111513217, name: 'Вася' },
                creditor: { id: 1813429656761, name: 'Петя' },
                bill: 541,
            },
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1735111513217, name: 'Вася' },
                bill: 5016,
            },
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1813429656761, name: 'Петя' },
                bill: 2899,
            },
        ];

        billStore.calculateNormalizedBill();
        expect(billStore.bill).toEqual(bill);
    });

    it('should calculate case 9 correct', () => {
        const productStore = useProductStore();
        const userStore = useUserStore();
        const billStore = useBillStore();
        userStore.users = getUsers();

        productStore.products = [
            {
                id: 1910198913215,
                name: 'Огурец',
                price: 1894,
                payer: { id: 1735111513217, name: 'Вася' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1914528933219,
                name: 'Помидор',
                price: 3453,
                payer: { id: 1813429656761, name: 'Петя' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1953521243212,
                name: 'Салат',
                price: 6587,
                payer: { id: 1815362656795, name: 'Иван' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1153142243213,
                name: 'Пицца',
                price: 2344,
                payer: { id: 1735111513217, name: 'Вася' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
            {
                id: 1253534534691,
                name: 'Паста',
                price: 8769,
                payer: { id: 1813429656761, name: 'Петя' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
        ];

        const bill: DebtorCreditor[] = [
            {
                debtor: { id: 1735111513217, name: 'Вася' },
                creditor: { id: 1813429656761, name: 'Петя' },
                bill: 2662,
            },
            {
                debtor: { id: 1735111513217, name: 'Вася' },
                creditor: { id: 1815362656795, name: 'Иван' },
                bill: 783,
            },
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1813429656761, name: 'Петя' },
                bill: 1879,
            },
        ];

        billStore.calculateNormalizedBill();
        expect(billStore.bill).toEqual(bill);
    });

    it('should calculate case 10 correct', () => {
        const productStore = useProductStore();
        const userStore = useUserStore();
        const billStore = useBillStore();

        userStore.users = [
            { id: 1735111513217, name: 'Вася' },
            { id: 1813429656761, name: 'Петя' },
            { id: 1815362656795, name: 'Иван' },
            { id: 1832362356793, name: 'Анна' },
            { id: 1234234265794, name: 'Витя' },
        ];

        productStore.products = [
            {
                id: 1910198913215,
                name: 'Огурец',
                price: 7659,
                payer: { id: 1735111513217, name: 'Вася' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                ],
            },
            {
                id: 1914528933219,
                name: 'Помидор',
                price: 242,
                payer: { id: 1832362356793, name: 'Анна' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1815362656795, name: 'Иван' },
                    { id: 1234234265794, name: 'Витя' },
                ],
            },
            {
                id: 1953521243215,
                name: 'Салат',
                price: 342,
                payer: { id: 1815362656795, name: 'Иван' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1815362656795, name: 'Иван' },
                    { id: 1832362356793, name: 'Анна' },
                    { id: 1234234265794, name: 'Витя' },
                ],
            },
            {
                id: 1153142243213,
                name: 'Пицца',
                price: 645,
                payer: { id: 1234234265794, name: 'Витя' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1234234265794, name: 'Витя' },
                ],
            },
            {
                id: 1253534534691,
                name: 'Паста',
                price: 794,
                payer: { id: 1815362656795, name: 'Иван' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1832362356793, name: 'Анна' },
                    { id: 1234234265794, name: 'Витя' },
                ],
            },
            {
                id: 1353523567475,
                name: 'Вода',
                price: 257,
                payer: { id: 1813429656761, name: 'Петя' },
                users: [
                    { id: 1813429656761, name: 'Петя' },
                    { id: 1234234265794, name: 'Витя' },
                ],
            },
        ];

        const bill: DebtorCreditor[] = [
            {
                debtor: { id: 1813429656761, name: 'Петя' },
                creditor: { id: 1735111513217, name: 'Вася' },
                bill: 3830,
            },
            {
                debtor: { id: 1735111513217, name: 'Вася' },
                creditor: { id: 1832362356793, name: 'Анна' },
                bill: 81,
            },
            {
                debtor: { id: 1832362356793, name: 'Анна' },
                creditor: { id: 1815362656795, name: 'Иван' },
                bill: 187,
            },
            {
                debtor: { id: 1234234265794, name: 'Витя' },
                creditor: { id: 1832362356793, name: 'Анна' },
                bill: 81,
            },
            {
                debtor: { id: 1735111513217, name: 'Вася' },
                creditor: { id: 1815362656795, name: 'Иван' },
                bill: 267,
            },
            {
                debtor: { id: 1813429656761, name: 'Петя' },
                creditor: { id: 1815362656795, name: 'Иван' },
                bill: 267,
            },
            {
                debtor: { id: 1234234265794, name: 'Витя' },
                creditor: { id: 1815362656795, name: 'Иван' },
                bill: 267,
            },
            {
                debtor: { id: 1735111513217, name: 'Вася' },
                creditor: { id: 1234234265794, name: 'Витя' },
                bill: 215,
            },
            {
                debtor: { id: 1813429656761, name: 'Петя' },
                creditor: { id: 1234234265794, name: 'Витя' },
                bill: 87,
            },
        ];

        billStore.calculateNormalizedBill();
        expect(billStore.bill).toEqual(bill);
    });

    it('should map bill by creditor', () => {
        const userStore = useUserStore();
        const billStore = useBillStore();
        userStore.users = getUsers();

        const bill: DebtorCreditor[] = [
            {
                debtor: { id: 1735111513217, name: 'Вася' },
                creditor: { id: 1813429656761, name: 'Петя' },
                bill: 541,
            },
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1735111513217, name: 'Вася' },
                bill: 5016,
            },
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1813429656761, name: 'Петя' },
                bill: 2899,
            },
        ];

        billStore.bill = bill;

        const mappedBillByCreditor: MappedByCreditor[] = [
            {
                creditor: { id: 1735111513217, name: 'Вася' },
                debtors: [
                    {
                        debtor: { id: 1815362656795, name: 'Иван' },
                        creditor: { id: 1735111513217, name: 'Вася' },
                        bill: 5016,
                    },
                ],
            },
            {
                creditor: { id: 1813429656761, name: 'Петя' },
                debtors: [
                    {
                        debtor: { id: 1735111513217, name: 'Вася' },
                        creditor: { id: 1813429656761, name: 'Петя' },
                        bill: 541,
                    },
                    {
                        debtor: { id: 1815362656795, name: 'Иван' },
                        creditor: { id: 1813429656761, name: 'Петя' },
                        bill: 2899,
                    },
                ],
            },
        ];

        expect(billStore.mappedByCreditor).toEqual(mappedBillByCreditor);
    });

    it('should map bill by debtor', () => {
        const userStore = useUserStore();
        const billStore = useBillStore();
        userStore.users = getUsers();

        const bill: DebtorCreditor[] = [
            {
                debtor: { id: 1735111513217, name: 'Вася' },
                creditor: { id: 1813429656761, name: 'Петя' },
                bill: 541,
            },
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1735111513217, name: 'Вася' },
                bill: 5016,
            },
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditor: { id: 1813429656761, name: 'Петя' },
                bill: 2899,
            },
        ];

        billStore.bill = bill;

        const mappedBillByDebtor: MappedByDebtor[] = [
            {
                debtor: { id: 1735111513217, name: 'Вася' },
                creditors: [
                    {
                        debtor: { id: 1735111513217, name: 'Вася' },
                        creditor: { id: 1813429656761, name: 'Петя' },
                        bill: 541,
                    },
                ],
            },
            {
                debtor: { id: 1813429656761, name: 'Петя' },
                creditors: [],
            },
            {
                debtor: { id: 1815362656795, name: 'Иван' },
                creditors: [
                    {
                        debtor: { id: 1815362656795, name: 'Иван' },
                        creditor: { id: 1735111513217, name: 'Вася' },
                        bill: 5016,
                    },
                    {
                        debtor: { id: 1815362656795, name: 'Иван' },
                        creditor: { id: 1813429656761, name: 'Петя' },
                        bill: 2899,
                    },
                ],
            },
        ];

        expect(billStore.mappedByDebtor).toEqual(mappedBillByDebtor);
    });
});
