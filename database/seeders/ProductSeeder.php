<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Testing\Fakes\Fake;
use Faker\Factory as Faker;
class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

         $productsName = [
            'Camiseta Nike',
            'Pantalón Adidas',
            'Zapatos Vans',
            'Gorra New Era',
            'Chaqueta North Face',
            'Vestido Zara',
            'Calcetines Puma',
            'Sombrero Gucci',
            'Bufanda Burberry',
            'Bolso Louis Vuitton',
            'Reloj Rolex',
            'Collar Swarovski',
            'Anillo Tiffany',
            'Sudadera Champion',
            'Shorts Under Armour',
            'Blusa Guess',
            'Jersey Tommy Hilfiger',
            'Falda H&M',
            'Botas Timberland',
            'Sandalias Birkenstock',
            'Billetera Coach',
            'Gafas de sol Ray-Ban',
            'Pijama Calvin Klein',
            'Chaquetón Columbia',
            'Cinturón Versace'
          ];

        $faker = Faker::create();

        for ($i= 0; $i < 25 ; $i++) { 
            $product = new Product();
            $product->description = $productsName[$i];
            $product->price = $faker->randomFloat(2, 1000, 5000);
            $product->stock = $faker->numberBetween(5,15);
            $product->save();
        }  
    }
}
