"use client";
import { useState, useEffect, SyntheticEvent } from "react";
import { ClipLoader } from "react-spinners";
import { sendEmail } from "../../actions/googleDrive";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  id_category: string;
  checked: boolean;
}

export default function Select() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategoy] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    setIsLoading(true);
  }, [selectedCategory]);

  async function fetchCategories() {
    try {
      const categoriesRespone = await fetch("/api/categories/get-categories", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      if (!categoriesRespone.ok) {
        throw new Error("Error fetching categories");
      }
      const categoriesData = await categoriesRespone.json();
      setCategories(categoriesData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  interface Product {
    id: string;
    name: string;
    id_category: string;
    checked: any;
  }

  async function fetchProducts() {
    if (selectedCategory) {
      const productsResponse = await fetch(
        "/api/products/get-products-by-category",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ id_category: selectedCategory }),
        }
      );
      if (!productsResponse.ok) {
        throw new Error("Error fetching productos by categories");
      }
      const productsData = await productsResponse.json();
      const productsDataChecked = productsData.map((product: Product) => ({
        ...product,
        checked: product.checked === "1" ? true : false,
      }));

      setProducts(productsDataChecked);
      setIsLoading(false);
    }
  }

  const handleSelectChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLSelectElement;
    setSelectedCategoy(target.value);
  };

  const handleAllChecked = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;

    const allcheckedProducts = products.map((product) => ({
      ...product,
      checked: checked,
    }));

    setProducts(allcheckedProducts);
    setAllChecked(checked);

    const productsResponse = await fetch(
      "/api/products/edit-checked-products",
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(allcheckedProducts),
      }
    );
    if (!productsResponse.ok) {
      throw new Error("Error when changing the checked of the product");
    }
  };

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const productId = event.target.id;
    const isChecked = event.target.checked;

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        String(product.id) === productId
          ? { ...product, checked: isChecked }
          : product
      )
    );

    const productChecked = {
      idProduct: productId,
      checked: event.target.checked,
    };

    const productsResponse = await fetch("/api/products/edit-checked-product", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(productChecked),
    });
    if (!productsResponse.ok) {
      throw new Error("Error when changing the checked of the product");
    }
  };

  const prueba = async () => {
    // const data = await checkFolderExists("LaPrueba");
    // console.log("existe carpeta LaPrueba", data);
    // if (!data) {
    //   await createFolder("LaPrueba");
    //   console.log("se creo y compartio exitosamente la carpeta");
    // }
    await sendEmail(
      "lucesitaliss@gmail.com",
      "Solicitud de compartir archivos",
      "Hola, por favor comparte tus archivos conmigo a través de la aplicación."
    );
  };

  return (
    <div className="p-4 text-xs sm:text-sm">
      <div className=" flex gap-2  items-start">
        <select
          value={selectedCategory}
          onChange={handleSelectChange}
          className="border border-gray-100 rounded"
        >
          {selectedCategory ? null : (
            <option value=""> Seleccione una Categoria </option>
          )}
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {products.length > 0 ? (
          <div className="mb-2">
            <label>
              <input
                className="mr-1"
                type="checkbox"
                checked={allChecked}
                onChange={handleAllChecked}
              />
              Todo
            </label>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="pt-4">
        {products.map((product) => (
          <div key={product.id}>
            <label key={product.id}>
              <input
                className="mr-1"
                id={product.id}
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={product.checked}
              />
              {product.name}
            </label>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#123abc"} loading={isLoading} />{" "}
        </div>
      ) : (
        ""
      )}
      <button onClick={prueba}>prueba</button>
    </div>
  );
}
