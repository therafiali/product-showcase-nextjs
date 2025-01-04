import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Product",
  description: "Specific Product",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  // Fetch the product data from the API
  const response = await fetch(`http://localhost:3000/api/product`, {
    cache: "no-store", // Optional: Prevent caching during development
  });

  // Check if the response is successful
  if (!response.ok) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-red-500">
          Error fetching product data
        </p>
      </div>
    );
  }

  const products = await response.json();

  // Find the product by ID
  const product = products.find(
    (item: { id: number }) => item.id === Number(id)
  );

  // Handle case where product is not found
  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-gray-700">Product not found</p>
      </div>
    );
  }

  // Render product details
  return (
    <div className="container mx-auto px-4 py-8">
      <title>{product.title}</title>
      <meta
        name="description"
        content="A brief description of the page content."
      />
      {/* Header */}
      <div>
        <Link href={"/products"}>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {'<<<'} Back 
            </span>
          </button>
        </Link>
        <h1 className="text-4xl font-bold tracking-wide text-center my-12">
          Product Details
        </h1>
      </div>

      {/* Product Details */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        {/* Product Image */}
        <div className="max-w-sm lg:max-w-md shadow-lg rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            {product.title}
          </h2>
          <p className="text-xl font-semibold text-gray-700 mb-2">
            Price:{" "}
            <span className="text-green-600">${product.price.toFixed(2)}</span>
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Category:{" "}
            <span className="font-medium text-gray-800">
              {product.category}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
