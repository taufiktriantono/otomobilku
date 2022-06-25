<?php

namespace App\Repositories;

use App\Models\ProductModel;
use App\Models\Variants;
use Illuminate\Support\Str;

use DB;

class ModelRepository
{

  public function findAll($params) {
    $stmt = ProductModel::select('*');

    if (isset($params['brand_ids'])) {
      $stmt->whereIn('brand_id', $params['brand_ids']);
    }

    if (isset($params['brand_id'])) {
      $stmt->where('brand_id', $params['brand_id']);
    }

    $stmt->orderBy('name', 'asc');

    return $stmt->with('variants');

  }

  public function findOneByID($id) {
    return ProductModel::where('id', '=', $id)->with('variants');
  }

  public function updateByID($id, $params) {
    DB::beginTransaction();

    $model = $this->findOneByID($id)->first();

    $model->name = $params['name'];
    $model->slug = trim(strtolower(Str::slug($params['name'])));

    if (isset($params['variants'])) {
      Variants::where('model_id', '=', $id)->delete();

      foreach ($params['variants'] as $variant) {
        Variants::create([
          'model_id' => $id,
          'name' => $variant['name'],
          'slug' => trim(strtolower(Str::slug($variant['name'])))
        ]);
      }
    }

    $model->save();

    DB::commit();
  }

}