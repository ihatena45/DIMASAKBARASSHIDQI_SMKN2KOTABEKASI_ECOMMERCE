export const useProductsStore = defineStore("products", {
    state: () => ({
        products: [] as any,
        status: false,
        message: "",
    }),
    actions: {
        async createProduct(payload: any) {
            const { baseUrl, apikey } = useAppConfig();
            const { data, error } = await useFetch("/rest/v1/products", {
                baseURL: baseUrl,
                method: "POST",
                headers: {
                    apikey: apikey,
                },
                body: payload,
            })

            if (error.value) {
                this.status = false;
                this.message = "Get Products Failed !!!";
            } else if (data) {
                this.status = true;
                this.message = "Get Products successfully";
            }
        },
        async getAllProducts() {
            const { baseUrl, apikey } = useAppConfig();
            const { data, error } = await useFetch("/rest/v1/products", {
                baseURL: baseUrl,
                method: "GET",
                headers: {
                    apikey: apikey,
                },
            });

            if (error.value) {
                this.status = false;
                this.message = "Get Products Failed !!!";
            } else if (data) {
                this.status = true;
                this.message = "Get Products successfully";
                this.products = data.value;
            }
        },
        async addToCart(id: number, isCart: any) {
            const { baseUrl, apikey } = useAppConfig();
            const { data, error } = await useFetch(`/rest/v1/products?id=eq.${id}`, {
                baseURL: baseUrl,
                method: "PATCH",
                headers: {
                    apikey: apikey,
                },
                body: isCart,
            });

            if (error.value) {
                this.status = false;
                this.message = "Failed !!!";
            } else if (data) {
                this.status = true;
                this.message = "successfully";
                this.products = data.value;
            }
        },

        async removeFromCart(id: number, isCart: any) {
            const { baseUrl, apikey } = useAppConfig();
            const { data, error } = await useFetch(`/rest/v1/products?id=eq.${id}`, {
                baseURL: baseUrl,
                method: "PATCH",
                headers: {
                    apikey: apikey,
                },
                body: isCart,
            });

            if (error.value) {
                this.status = false;
                this.message = "Failed !!!";
            } else if (data) {
                this.status = true;
                this.message = "successfully";
                this.products = data.value;
            }
        },

        async getProductById(id: number) {
            const { baseUrl, apikey } = useAppConfig();
            const { data, error } = await useFetch(`/rest/v1/products?id=eq.${id}&select=*`, {
                baseURL: baseUrl,
                method: "GET",
                headers: {
                    apikey: apikey,
                },
            });

            if (error.value) {
                this.status = false;
                this.message = "Failed !!!";
            } else if (data) {
                this.status = true;
                this.message = "successfully";
                this.products = data.value;
            }
        },
    }
})