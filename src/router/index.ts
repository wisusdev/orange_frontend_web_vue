import HelloWorld from "../components/HelloWorld.vue";
import {createRouter, createWebHistory} from "vue-router";
import IndexProducts from "../components/products/indexProducts.vue";
import IndexProviders from "../components/providers/IndexProviders.vue";
import CreateProvider from "../components/providers/createProvider.vue";
import EditProvider from "../components/providers/editProvider.vue";
import CreateProduct from "../components/products/createProduct.vue";
import EditProduct from "../components/products/editProduct.vue";

const routes: any = [
	{ path: '/', component: HelloWorld },

	{ path: '/products', component: IndexProducts, name: 'products.index'},
	{ path: '/products/create', component: CreateProduct},
	{ path: '/products/edit/:id', component: EditProduct},

	{ path: '/providers', component: IndexProviders, name: 'providers.index'},
	{ path: '/providers/create', component: CreateProvider},
	{ path: '/providers/edit/:id', component: EditProvider}

]

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;