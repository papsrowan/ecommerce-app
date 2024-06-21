import { axiosOpenInstance } from "./axios";

class ProductsService {
  //Récuperer les produits par categorie
  async getProductsByCategory({ name }: { name: string }) {
    const response = await axiosOpenInstance.get(`/products/category/${name}`);
    return response.data as any;
  }

  // Récuperer les categories de produits
  async getAllProdutsCategories() {
    const response = await axiosOpenInstance.get("/products/categories");
    return response.data as any[];
  }

  async searchProduct(query: string) {
    const response = await axiosOpenInstance.get(`/products/search?q=${query}`);
    return response.data.products as any[];
  }
}
const productService = new ProductsService();
export { productService };
