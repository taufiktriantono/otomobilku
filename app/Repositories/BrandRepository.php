<?php

namespace App\Repositories;

use App\Models\ProductBrand;

class BrandRepository
{

  public function findAll() {
    return ProductBrand::orderBy('order', 'asc')->get();
  }

}