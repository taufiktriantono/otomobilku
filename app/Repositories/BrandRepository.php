<?php

namespace App\Repositories;

use App\Models\ProductBrand;

class BrandRepository
{

  public function findAll() {
    return ProductBrand::orderBy('order', 'asc')->with('models');
  }

  public function findOneByID($id) {
    return ProductBrand::where('id', '=', $id)->with('models');
  }

}