<script setup lang="ts">
    import Navbar from "./components/shared/Navbar.vue";
</script>

<template>
    <Navbar></Navbar>
    <div class="container my-4">
        <router-view></router-view>
    </div>
</template>

