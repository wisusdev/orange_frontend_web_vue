<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import { Provider } from '../../data/interfaces/responses/indexProviders.ts';
    import {useRoute, useRouter} from "vue-router";

    const router = useRouter();
    const provider = ref<Provider>({
        id: 0,
        name: '',
        address: '',
        phone: '',
        description: ''
    });

    const route = useRoute();
    const providerId = Number(route.params.id);

    const getProvider = async () => {
        try {
            const response = await axios.get(`https://orange-api.wisus.dev/api/v1/providers/${providerId}`);
            provider.value = response.data.data;
        } catch (error) {
            console.error(error);
        }
    }

    const updateProvider = async () => {
        try {
            const response = await axios.put(`https://orange-api.wisus.dev/api/v1/providers/${providerId}`, provider.value);
            if (response.status === 200) {
                alert('Provider updated successfully');
                await router.push({name: 'providers.index'});
            }
        } catch (error) {
            console.error(error);
        }
    }

    onMounted(() => {
        getProvider();
    });
</script>

<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <p class="mb-0">Edit Provider</p>
        </div>
        <div class="card-body">
            <form @submit.prevent="updateProvider">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter name" v-model="provider.name">
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address" placeholder="Enter address" v-model="provider.address">
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="text" class="form-control" id="phone" placeholder="Enter phone" v-model="provider.phone">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" rows="3" v-model="provider.description"></textarea>
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