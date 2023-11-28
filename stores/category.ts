import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category", {
    state: () => ({
        categories: {} as any,
        status: false,
        message: "",
    }),
    actions: {
        async getAllCategory() {
            const { baseUrl, apikey } = useAppConfig();
            const { data, error } = await useFetch("/rest/v1/categories", {
                baseURL: baseUrl,
                method: "GET",
                headers: {
                    apikey: apikey,
                },
            })

            if (error.value) {
                this.status = false;
                this.message = "Get Products Failed !!!";
            } else if (data) {
                this.status = true;
                this.message = "Get Products successfully";
                this.categories = data.value;
            }
        },

        async createCategory(categoryData: any) {
            try {
                const { baseUrl, apikey } = useAppConfig();
                const { data, error } = await useFetch("/rest/v1/categories", {
                    baseURL: baseUrl,
                    method: "POST",
                    headers: {
                        apikey: apikey,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(categoryData),
                });

                if (error.value) {
                    this.status = false;
                    this.message = "Create Category Failed !!!";
                } else if (data) {
                    this.status = true;
                    this.message = "Create Category successfully";
                    this.categories = data.value;
                }
            } catch (error) {
                // Tangani kesalahan jika diperlukan
                console.error(error);
            }
        },
    },
})