<script setup lang="ts">
import {useRoute} from "vue-router";
const route = useRoute();
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-warning">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Orange</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :class="{ active: route.path === '/providers' }" class="nav-link" to="/providers">Providers</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :class="{ active: route.path === '/products' }" class="nav-link" to="/products">Products</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>