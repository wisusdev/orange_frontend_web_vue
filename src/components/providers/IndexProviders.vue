<script setup lang="ts">
    import {ref, onMounted} from 'vue';
    import axios from 'axios';
    import {IndexProvidersResponseInterface, Provider} from '../../data/interfaces/responses/indexProviders.ts';

    const providers = ref<IndexProvidersResponseInterface[]>([]);
    let providersData = ref<Provider[]>([]);

    let lastPage: number = 0;
    let pageNumber: number = 1;
    let pageSize: number = 15;
    let filterValue: string = '';
    let filterType: string = 'name';
    let sort: string = 'id';
    let order: string = '';
    let pages: number[] = [];

    const getProviders = async (pageSize: number, pageNumber: number, filterValue: string) => {
        try {
            const response = await axios.get(`https://orange-api.wisus.dev/api/v1/providers?page[size]=${pageSize}&page[number]=${pageNumber}&filter[${filterType}]=${filterValue}&sort=${order}${sort}`);

            providers.value = response.data;
            providersData.value = response.data.data;

            lastPage = response.data.meta.last_page;
            pages = Array.from({length: lastPage}, (_, i) => i + 1);

        } catch (error) {
            console.error(error);
        }
    }

    const deleteProvider = async (id: number) => {
        try {
            await axios.delete(`https://orange-api.wisus.dev/api/v1/providers/${id}`);
            await getProviders(pageSize, pageNumber, filterValue);
        } catch (error) {
            console.error(error);
        }
    }

    onMounted(() => {
        getProviders(pageSize, pageNumber, filterValue);
    });

    let setPage = (page: number) => {
        pageNumber = page;
        getProviders(pageSize, pageNumber, filterValue);
    }
</script>

<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <p class="mb-0 me-2">Providers</p>
                <router-link to="/providers/create" class="btn btn-primary btn-sm">Create Provider</router-link>
            </div>
            <div class="row d-flex justify-content-between">
                <div class="col-md-4">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Search by name" v-model="filterValue">
                        <select class="form-select" v-model="filterType" >
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                            <option value="address">Address</option>
                            <option value="phone">Phone</option>
                        </select>
                        <button class="btn btn-primary" type="button" @click="getProviders(pageSize, pageNumber, filterValue)">Search</button>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="input-group mb-3">
                        <select class="form-select" v-model="pageSize" @change="getProviders(pageSize, pageNumber, filterValue)">
                            <option value="5">5</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="input-group mb-3">
                        <select class="form-select" v-model="sort" >
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                            <option value="address">Address</option>
                            <option value="phone">Phone</option>
                        </select>
                        <select class="form-select" v-model="order" >
                            <option value="">ASC</option>
                            <option value="-">DESC</option>
                        </select>
                        <button class="btn btn-primary" type="button" @click="getProviders(pageSize, pageNumber, filterValue)">Sort</button>
                    </div>
                </div>

            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Description</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="provider in providersData" :key="provider.id">
                        <td>{{ provider.id }}</td>
                        <td>{{ provider.name }}</td>
                        <td>{{ provider.address }}</td>
                        <td>{{ provider.phone }}</td>
                        <td>{{ provider.description }}</td>
                        <td>
                            <div class="d-flex flex-row align-items-center">
                                <router-link :to="'/providers/edit/' + provider.id" class="btn btn-primary btn-sm me-2">Edit</router-link>
                                <button class="btn btn-danger btn-sm" @click="deleteProvider(provider.id)">Delete</button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card-footer">
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center mb-0">
                    <li class="page-item" :class="{disabled: pageNumber === 1}">
                        <a class="page-link" href="#" aria-label="Previous" @click="setPage(pageNumber - 1)">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item" v-for="page in pages" :key="page" :class="{active: pageNumber === page}">
                        <a class="page-link" href="#" @click="setPage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{disabled: pageNumber === lastPage}">
                        <a class="page-link" href="#" aria-label="Next" @click="setPage(pageNumber + 1)">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<style scoped>

</style>