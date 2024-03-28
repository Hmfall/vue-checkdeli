import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useProductStore } from '@/store/productStore';
import { useUserStore } from '@/store/userStore';
import type { Product } from '@/types';

describe('Product Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('should return is product user', () => {
        const productStore = useProductStore();

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
        ];

        expect(productStore.productUser(1910198913215, 1735111513217)).toBe(true);
        expect(productStore.productUser(1914528933219, 1813429656761)).toBe(false);
    });

    // it('should handle product user', () => {
    //     const productStore = useProductStore();
    //     const userStore = useUserStore();
    //
    //     userStore.users = [
    //         { id: 1735111513217, name: 'Вася' },
    //         { id: 1813429656761, name: 'Петя' },
    //         { id: 1815362656795, name: 'Иван' },
    //     ];
    //
    //     productStore.products = [
    //         {
    //             id: 1910198913215,
    //             name: 'Огурец',
    //             price: 2000,
    //             payer: { id: 1735111513217, name: 'Вася' },
    //             users: [],
    //         },
    //     ];
    //
    //     const products = [
    //         {
    //             id: 1910198913215,
    //             name: 'Огурец',
    //             price: 2000,
    //             payer: { id: 1735111513217, name: 'Вася' },
    //             users: [{ id: 1735111513217, name: 'Вася' }],
    //         },
    //     ];
    //
    //     productStore.handleProductUser(1735111513217, 1910198913215);
    //     expect(productStore.products).toEqual(products);
    //     productStore.handleProductUser(1735111513217, 1910198913215);
    //     expect(productStore.products).toEqual(productStore.products);
    // });

    it('should copy product', () => {
        const productStore = useProductStore();

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
        ];

        const products: Product[] = [
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
                id: Date.now(),
                name: 'Помидор',
                price: 1000,
                payer: { id: 1815362656795, name: 'Иван' },
                users: [
                    { id: 1735111513217, name: 'Вася' },
                    { id: 1815362656795, name: 'Иван' },
                ],
            },
        ];

        productStore.copy(1914528933219);
        expect(productStore.products).toEqual(products);
    });
});
