const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

async function baseApi(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!res.ok) throw new Error("API error");
  return res.json();
}

export async function fetchProducts() {
  return baseApi("/products");
}

export async function fetchWishlistByUserId(userId: string) {
  return baseApi(`/wishlist/${userId}`, { cache: "no-store" });
}

export async function fetchUserByEmail(email: string) {
  return baseApi(`/users/email/${email}`, { cache: "no-store" });
}

export async function fetchCategories() {
  return baseApi("/categories");
}

export async function createProduct(product: any) {
  return baseApi("/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
}

export async function uploadMainImage(formData: FormData) {
  return baseApi("/main-image", {
    method: "POST",
    body: formData,
  });
}

export async function createOrder(order: any) {
  return baseApi("/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
}

export async function addOrderProduct(orderProduct: any) {
  return baseApi("/order-product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderProduct),
  });
}

export async function fetchProductsWithParams(params: {
  price: number;
  rating: number;
  stockMode: string;
  category?: string;
  sort?: string;
  page?: number;
}) {
  const query = `filters[price][$lte]=${params.price}&filters[rating][$gte]=${
    params.rating
  }&filters[inStock][$${params.stockMode}]=1&${
    params.category ? `filters[category][$equals]=${params.category}&` : ""
  }sort=${params.sort}&page=${params.page}`;
  return baseApi(`/products?${query}`);
}
