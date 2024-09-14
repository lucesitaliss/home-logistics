export interface Product {
  id: string;
  name: string;
  id_category: string;
  checked: boolean;
}

export interface ProductChecked {
  idProduct: string;
  checked: boolean;
}

export interface AddProduct {
  name: string;
  idCategory: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface EditCategoryParams {
  idCategory: string;
  newNameCategory: string;
}

export interface IList {
  id: string;
  id_product: string;
  name: string;
  id_category: string;
  cantidad: string;
  medida: string;
  precio: string;
  total: string;
  comprado: string;
}
