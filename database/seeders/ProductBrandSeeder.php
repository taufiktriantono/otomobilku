<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductBrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        $brands = [
            [
                'name' => 'Toyota',
                'slug' => 'toyota',
                'order' => 1,
                'is_active' => true,
                'models' => [
                    [
                        'brand_id' => '',
                        'name' => 'Agya',
                        'slug' => 'agya',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Sigra',
                        'slug' => 'sigra',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Avanza',
                        'slug' => 'avanza',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Innova',
                        'slug' => 'innova',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Fortuner',
                        'slug' => 'fortuner',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Alphard',
                        'slug' => 'alphard',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Land Cruiser',
                        'slug' => 'land-cruiser',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Camry',
                        'slug' => 'camry',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Yaris',
                        'slug' => 'yaris',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Sienta',
                        'slug' => 'sienta',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Yaris GR',
                        'slug' => 'yaris-gr',
                        'is_active' => true
                    ],
                ]
            ],
            [
                'name' => 'Honda',
                'slug' => 'honda',
                'order' => 2,
                'is_active' => true,
                'models' => [
                    [
                        'brand_id' => '',
                        'name' => 'Brio',
                        'slug' => 'brio',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Jazz',
                        'slug' => 'jazz',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Mobilio',
                        'slug' => 'mobilio',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'BR-V',
                        'slug' => 'br-v',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'HR-V',
                        'slug' => 'hr-v',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'CR-V',
                        'slug' => 'cr-v',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Civic Turbo',
                        'slug' => 'civic-turbo',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Civic FD',
                        'slug' => 'civic-fd',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Civic FB',
                        'slug' => 'civic-fb',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Civic Ferio',
                        'slug' => 'civic-ferio',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Civic Vti-s',
                        'slug' => 'civic-vti-s',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Civic Genio',
                        'slug' => 'civic-genio',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'City',
                        'slug' => 'city',
                        'is_active' => true
                    ],
                ]
            ],
            [
                'name' => 'Suzuki',
                'slug' => 'suzuki',
                'order' => 3,
                'is_active' => true,
                'models' => [
                    [
                        'brand_id' => '',
                        'name' => 'Karimun',
                        'slug' => 'karimun',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Swift',
                        'slug' => 'swift',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Ignis',
                        'slug' => 'ignis',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'APV',
                        'slug' => 'apv',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Ertiga',
                        'slug' => 'ertiga',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'XL7',
                        'slug' => 'xl7',
                        'is_active' => true
                    ],
                ]
            ],
            [
                'name' => 'Mazda',
                'slug' => 'mazda',
                'order' => 4,
                'is_active' => true,
                'models' => [
                    [
                        'brand_id' => '',
                        'name' => 'CX3',
                        'slug' => 'cx3',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'CX5',
                        'slug' => 'cx5',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'CX7',
                        'slug' => 'cx7',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'CX9',
                        'slug' => 'cx9',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Biante',
                        'slug' => 'biante',
                        'is_active' => true
                    ],
                ]
            ],
            [
                'name' => 'Hyundai',
                'slug' => 'hyundai',
                'order' => 5,
                'is_active' => true,
                'models' => [
                    [
                        'brand_id' => '',
                        'name' => 'Avega',
                        'slug' => 'avega',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'i10',
                        'slug' => 'i10',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'i20',
                        'slug' => 'i20',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Santa Fe',
                        'slug' => 'santa-fe',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Creta',
                        'slug' => 'creta',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'H-1',
                        'slug' => 'h-1',
                        'is_active' => true
                    ],
                ]
            ],
            [
                'name' => 'Kia',
                'slug' => 'kia',
                'order' => 6,
                'is_active' => true,
                'models' => [
                    [
                        'brand_id' => '',
                        'name' => 'Rio',
                        'slug' => 'rio',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Sportage',
                        'slug' => 'sportage',
                        'is_active' => true
                    ],
                ]
            ],
            [
                'name' => 'Wuling',
                'slug' => 'wuling',
                'order' => 7,
                'is_active' => true,
            ],
            [
                'name' => 'Mercedez Benz',
                'slug' => 'mercedez-benz',
                'order' => 8,
                'is_active' => true,
                'models' => [
                    [
                        'brand_id' => '',
                        'name' => 'C-Class',
                        'slug' => 'c-class',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'S-Class',
                        'slug' => 's-class',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'E-Class',
                        'slug' => 'e-class',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'CLA200',
                        'slug' => 'cla200',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'GLA200',
                        'slug' => 'gla200',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'GLB',
                        'slug' => 'glb',
                        'is_active' => true
                    ],
                ]
            ],
            [
                'name' => 'BMW',
                'slug' => 'bmw',
                'order' => 9,
                'is_active' => true,
                'models' => [
                    [
                        'brand_id' => '',
                        'name' => 'Serie 3',
                        'slug' => 'serie 3',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Serie 5',
                        'slug' => 'serie 5',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Serie 7',
                        'slug' => 'serie 7',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'X1',
                        'slug' => 'x1',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'X3',
                        'slug' => 'x5',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'X5',
                        'slug' => 'x5',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'X7',
                        'slug' => 'x7',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'M2',
                        'slug' => 'm2',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'M4',
                        'slug' => 'm4',
                        'is_active' => true
                    ],
                ]
            ],
            [
                'name' => 'Volkwagen',
                'slug' => 'volkwagen',
                'order' => 10,
                'is_active' => true,
                'models' => [
                    [
                        'brand_id' => '',
                        'name' => 'Polo',
                        'slug' => 'polo',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Golf',
                        'slug' => 'golf',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Scriocco',
                        'slug' => 'scriocco',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Tiguan',
                        'slug' => 'tiguan',
                        'is_active' => true
                    ],
                ]
            ],
            [
                'name' => 'Ford',
                'slug' => 'ford',
                'order' => 11,
                'is_active' => true,
                'models' => [
                    [
                        'brand_id' => '',
                        'name' => 'Fiesta',
                        'slug' => 'fiesta',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Focus',
                        'slug' => 'focus',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Ranger',
                        'slug' => 'ranger',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Everest',
                        'slug' => 'everest',
                        'is_active' => true
                    ],
                ]
            ],
            [
                'name' => 'Mitsubitshi',
                'slug' => 'mitsubitshi',
                'order' => 12,
                'is_active' => true,
                'models' => [
                    [
                        'brand_id' => '',
                        'name' => 'Xpander',
                        'slug' => 'xpander',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Outlander',
                        'slug' => 'outlander',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Mirage',
                        'slug' => 'mirage',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Lancer',
                        'slug' => 'lancer',
                        'is_active' => true
                    ],
                ]
            ],
            [
                'name' => 'Nissan',
                'slug' => 'nissan',
                'order' => 13,
                'is_active' => true,
                'models' => [
                    [
                        'brand_id' => '',
                        'name' => 'Grand Livina',
                        'slug' => 'grand-livina',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'Livina',
                        'slug' => 'livina',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'X-Trail',
                        'slug' => 'x-trail',
                        'is_active' => true
                    ],
                    [
                        'brand_id' => '',
                        'name' => 'March',
                        'slug' => 'march',
                        'is_active' => true
                    ],
                ]
            ]
        ];

        foreach ($brands as $brand) {
            if (isset($brand['models'])) {

                $newBrand = \App\Models\ProductBrand::create([
                    'name' => $brand['name'],
                    'slug' => $brand['slug'],
                    'order' => $brand['order'],
                    'is_active' => $brand['is_active']
                ]);

                foreach ($brand['models'] as $model) {
                    $model['brand_id'] = $newBrand->id;
                    $model['order'] = 0;
                    \App\Models\ProductModel::create($model);
                }

            } else {
                $brand = \App\Models\ProductBrand::create($brand);
            }
        }

    }
}
