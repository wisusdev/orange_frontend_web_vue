<script setup lang="ts">
    import {onMounted, ref} from 'vue';
    import axios from 'axios';
    import {IndexProductsResponseInterface, Product} from "../../data/interfaces/responses/indexProducts.ts";

    const products = ref<IndexProductsResponseInterface[]>([]);
    let productsData = ref<Product[]>([]);

    let lastPage: number = 0;
    let pageNumber: number = 1;
    let pageSize: number = 15;
    let filterValue: string = '';
    let filterType: string = 'name';
    let sort: string = 'id';
    let order: string = '';
    let pages: number[] = [];

    const getProducts = async (pageSize: number, pageNumber: number, filterValue: string) => {
        try {
            const response = await axios.get(`https://orange-api.wisus.dev/api/v1/products?page[size]=${pageSize}&page[number]=${pageNumber}&filter[${filterType}]=${filterValue}&sort=${order}${sort}`);
            products.value = response.data;
            productsData.value = response.data.data;

            lastPage = response.data.meta.last_page;
            pages = Array.from({length: lastPage}, (_, i) => i + 1);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteProduct = async (id: number) => {
        try {
            await axios.delete(`https://orange-api.wisus.dev/api/v1/products/${id}`);
            await getProducts(pageSize, pageNumber, filterValue);
        } catch (error) {
            console.error(error);
        }
    }

    onMounted(() => {
        getProducts(pageSize, pageNumber, filterValue);
    });

    let setPage = (page: number) => {
        pageNumber = page;
        getProducts(pageSize, pageNumber, filterValue);
    }
</script>

<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <p class="mb-0 me-2">Products</p>
                <router-link to="/products/create" class="btn btn-primary btn-sm">Create product</router-link>
            </div>
            <div class="row d-flex justify-content-between">
                <div class="col-md-4">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Search by name" v-model="filterValue">
                        <select class="form-select" v-model="filterType" >
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                        </select>
                        <button class="btn btn-primary" type="button" @click="getProducts(pageSize, pageNumber, filterValue)">Search</button>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="input-group mb-3">
                        <select class="form-select" v-model="pageSize" @change="getProducts(pageSize, pageNumber, filterValue)">
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
                            <option value="price">Price</option>
                        </select>
                        <select class="form-select" v-model="order" >
                            <option value="">ASC</option>
                            <option value="-">DESC</option>
                        </select>
                        <button class="btn btn-primary" type="button" @click="getProducts(pageSize, pageNumber, filterValue)">Sort</button>
                    </div>
                </div>

            </div>
        </div>
        <div class="card-body">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Provider</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="product in productsData">
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                    <td>${{ product.price }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.provider_name }}</td>
                    <td>
                        <div class="d-flex flex-row align-items-center">
                            <router-link class="btn btn-secondary btn-sm me-2" :to="'/products/edit/' + product.id">Edit</router-link>
                            <button class="btn btn-danger btn-sm" @click="deleteProduct(product.id)">Delete</button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
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