import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import vuetify from '@/plugins/vuetify';
import ProductList from './ProductList.vue';

describe('ProductList component', () => {
    it('init product', async () => {
        const wrapper = mount(ProductList, {
            global: {
                plugins: [
                    createTestingPinia({
                        stubActions: false,
                        initialState: {
                            product: { products: [] },
                            user: { users: [{ id: 1735111513217, name: 'Вася' }] },
                        },
                    }),
                    vuetify,
                ],
            },
        });
        expect(wrapper.findAll('[data-test="product"]')).toHaveLength(0);
        await wrapper.find('[data-test="init-button"]').trigger('click');
        expect(wrapper.findAll('[data-test="product"]')).toHaveLength(1);
    });

    it('should remove product', async () => {
        const wrapper = mount(ProductList, {
            global: {
                plugins: [
                    createTestingPinia({
                        stubActions: false,
                        initialState: {
                            product: {
                                products: [
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
                                ],
                            },
                        },
                    }),
                    vuetify,
                ],
            },
        });
        expect(wrapper.findAll('[data-test="product"]')).toHaveLength(1);
        await wrapper.find('[data-test="remove-button"]').trigger('click');
        expect(wrapper.findAll('[data-test="product"]')).toHaveLength(0);
    });
});
