import { products } from "@/data/product";




export async function GET() {
    return new Response(JSON.stringify(products), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}