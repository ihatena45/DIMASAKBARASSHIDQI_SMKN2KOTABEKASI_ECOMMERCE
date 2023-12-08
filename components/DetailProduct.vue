<script setup lang="ts">
const props = defineProps({
  product: {
    type: Object,
    default: {},
  },
});

import { Products } from "~/types/product";

const oneProduct = ref(props.product);
const isShowAlert = ref(false);

const addCart = () => {
  oneProduct.value.isCart = !oneProduct.value.isCart;
  let localStorageData = localStorage.getItem("products");
  let productOfCart: Products[] = [];
  if (localStorageData) {
    productOfCart = JSON.parse(localStorageData);
  }
  if (oneProduct.value.isCart) {
    productOfCart.push(oneProduct.value);
    localStorage.setItem("products", JSON.stringify(productOfCart));
  } else {
    productOfCart = productOfCart.filter(
      (item) => item.id !== oneProduct.value.id
    );
    localStorage.setItem("products", JSON.stringify(productOfCart));
  }
  isShowAlert.value = true;
  const form = ref({
    name: "",
  });
  form.value.name = "";
  setTimeout(() => {
    isShowAlert.value = false;
  }, 10000);
};

const { baseStorageUrl } = useAppConfig();

import { useProductsStore } from "~/stores/product";

const productStore = useProductsStore();
const isCartClicked = ref(false);

const addToCart = async () => {
  if (!isCartClicked.value) {
    await productStore.addToCart(props.product.id, { isCart: true });
    isCartClicked.value = true;
  }
};
</script>
<template>
  <section class="py-10">
    <div class="container">
      <NuxtLink
        to="/product"
        class="bg-white border border-slate-300 w-max flex items-center gap-1 py-2 px-5 rounded-full mb-7 cursor-pointer"
      >
        <i class="ri-arrow-left-s-line text-base font-medium"></i>
        <span class="text-base font-medium">Back</span>
      </NuxtLink>
      <div
        v-if="isShowAlert"
        class="p-4 mb-4 text-sm rounded-lg bg-green-100 text-green-800"
      >
        Successfully Adding To Cart
      </div>
      <div class="flex items-center">
        <div
          class="w-1/2 bg-gray-300 mr-5 rounded-3xl flex justify-center items- center p-5 h-[500px]"
        >
          <img
            :src="`${baseStorageUrl}/${product.image}`"
            class="w-full h-full object-contain"
          />
        </div>
        <div class="w-1/2 pl-5">
          <p class="text-xl font-light mb-3">{{ product.category }}</p>
          <h1 class="text-4xl font-bold mb-3">{{ product.name }}</h1>
          <h3 class="text-4xl font-light mb-3">${{ product.price }}</h3>
          <p class="mb-10">{{ product.description }}</p>
          <div class="flex flex-col gap-4">
            <div
              class="w-full flex items-center gap-2 bg-slate-700 text-white py- 3 justify-center rounded-lg cursor-pointer hover:bg-slate-600/80 transition duration-300 relative h-11 font-bold"
              @click="addToCart"
            >
              <i class="ri-shopping-cart-2-line"></i>
              <span>Add to Cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>