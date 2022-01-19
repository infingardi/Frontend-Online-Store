export async function getCategories() {
  const ENDPOINT_CATEGORIES = 'https://api.mercadolibre.com/sites/MLB/categories';
  try {
    const request = await fetch(ENDPOINT_CATEGORIES);
    const data = await request.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const ENDPOINT_CATEGORIES = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  try {
    const request = await fetch(ENDPOINT_CATEGORIES);
    const data = await request.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
