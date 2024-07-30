<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import { Product } from '../../data/interfaces/responses/indexProducts.ts';
    import {useRoute, useRouter} from "vue-router";
    import { Provider } from '../../data/interfaces/responses/indexProviders.ts';

    let providersData = ref<Provider[]>([]);
    const router = useRouter();
    const product = ref<Product>({
        id: 0,
        name: '',
        price: '',
        description: '',
        provider_id: 0,
        provider_name: ''
    });

    const route = useRoute();
    const productId = Number(route.params.id);

    const getProviders = async () => {
        try {
            const response = await axios.get('https://orange-api.wisus.dev/api/v1/providers');
            providersData.value = response.data.data;
        } catch (error) {
            console.error(error);
        }
    }

    const getProduct = async () => {
        try {
            const response = await axios.get(`https://orange-api.wisus.dev/api/v1/products/${productId}`);
            product.value = response.data.data;
        } catch (error) {
            console.error(error);
        }
    }

    const updateProduct = async () => {
        try {
            const response = await axios.put(`https://orange-api.wisus.dev/api/v1/products/${productId}`, product.value);
            if (response.status === 200) {
                alert('Product updated successfully');
                await router.push({name: 'products.index'});
            }
        } catch (error) {
            console.error(error);
        }
    }

    onMounted(() => {
        getProduct();
        getProviders();
    });
</script>

<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <p class="mb-0">Create Product</p>
        </div>
        <div class="card-body">
            <form @submit.prevent="updateProduct">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter name" v-model="product.name">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" rows="3" v-model="product.description"></textarea>
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input type="text" class="form-control" id="price" placeholder="Enter price" v-model="product.price">
                </div>
                <div class="mb-3">
                    <label for="provider_id" class="form-label">Provider</label>
                    <select class="form-select" id="provider_id" v-model="product.provider_id">
                        <option value="0">Select provider</option>
                        <option v-for="provider in providersData" :key="provider.id" :value="provider.id">{{ provider.name }}</option>
                    </select>
                </div>
                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>

</style>