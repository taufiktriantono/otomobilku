<?php

namespace App\Repositories;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductOwner;
use App\Models\ProductModel;
use App\Models\BodyType;
use App\Models\City;
use App\Models\District;
use Illuminate\Support\Str;

class ProductRepository
{

  public function buildQuery($params) {
    $stmt = Product::select('*');

    if (isset($params['status'])) {
      if ($params['status'] == 'active') {
        $stmt->where('is_active', true);
      } else if ($params['status'] == 'inactive') {
        $stmt->where('is_active', false);
      }
    }

    if (isset($params['q'])) {
      $stmt->whereRaw('LOWER(slug) like ?', '%'.trim(strtolower($params['q'])).'%');
    }

    if (isset($params['sort'])) {
      $sort = explode('-', $params['sort']);
      $stmt->orderBy($sort[1], $sort[0]);
    }

    if (isset($params['created_at'])) {
      $stmt->whereDate('created_at', $params['created_at']);
    }

    if (isset($params['is_active'])) {
      $stmt->where('is_active', $params['is_active']);
    }

    if (isset($params['min_price']) && isset($params['max_price'])) {
      $stmt->whereBetween('price', [$params['min_price'], $params['max_price']]);
    }

    if (isset($params['city_ids'])) {
      $cities = City::whereIn('city_id', $params['city_ids'])->select('city_id')->get();
      $districtIds = District::whereIn('city_id', $cities)->select('district_id')->get();
      $stmt->whereIn('product_district_id', $districtIds);
    }

    if (isset($params['min_build_year']) && isset($params['max_build_year'])) {
      $stmt->whereBetween('build_year', [$params['min_build_year'], $params['max_build_year']]);
    }

    if (isset($params['body_types_ids'])) {
      $bodyType = BodyType::whereIn('id', $params['body_types_ids'])->select('id')->get();
      $stmt->whereIn('product_body_type_id', $bodyType);
    }

    if (isset($params['brand_ids'])) {
      $mnodelIds = ProductModel::whereIn('brand_id', $params['brand_ids'])->select('id')->get();
      $stmt->whereIn('product_model_id', $mnodelIds);
    }

    if (isset($params['models_ids'])) {
      $mnodelIds = ProductModel::whereIn('id', $params['models_ids'])->select('id')->get();
      $stmt->whereIn('product_model_id', $mnodelIds);
    }

    if (isset($params['phone_number'])) {
      $ownerIds = ProductOwner::where('phone_number', $params['phone_number'])->select('id')->get();
      $stmt->whereIn('product_owner_id', $ownerIds);
    }

    if (isset($params['archive'])) {
      $stmt->where('archive', $params['archive']);
    }

    if (isset($params['verified'])) {
      $stmt->where('verified', $params['verified']);
    }

    $stmt->orderBy('updated_at', 'desc');

    $stmt->with('bodyType')
      ->with('fuel')
      ->with('transmission')
      ->with('seller')
      ->with('models')
      ->with('district')
      ->with('images')
      ->with('owner');

    return $stmt;
  }

  public function count($params) {
    $stmt = $this->buildQuery($params);

    return $stmt->count();
  }

  public function findAll($params) {
    $stmt = $this->buildQuery($params);

    return $stmt->paginate($params['limit'])->withQueryString();
  }

  public function getProductById(String $id) {
    return Product::where('id', '=', $id)
      ->with('bodyType')
      ->with('fuel')
      ->with('transmission')
      ->with('seller')
      ->with('models')
      ->with('district')
      ->with('images')
      ->with('owner')->first();
  }

  public function getProductBySlug(String $slug) {
    return Product::where('slug', '=', $slug)
      ->with('bodyType')
      ->with('fuel')
      ->with('transmission')
      ->with('seller')
      ->with('models')
      ->with('district')
      ->with('images')
      ->with('owner')->first();
  }

  public function store($params) {

    $owner = ProductOwner::where('phone_number', '=', $params['phone_number'])->first();
    if (!$owner) {
      $owner = ProductOwner::create([
        'full_name' => $params['full_name'],
        'phone_number' => $params['phone_number']
      ]);
    }

    $model = ProductModel::where('id', '=', $params['product_model_id'])->with('brand')->first();
    $data = [
      'name' => $params['name'],
      'slug' => trim(strtolower(Str::slug($params['name'].'-'.$model->brand->slug.'-'.$model->slug.'-'.$params['build_year'].'-'.Str::random(6)))),
      'description' => $params['description'],
      'product_sub_category_id' => $params['product_sub_category_id'],
      'product_model_id' => $params['product_model_id'],
      'product_fuel_id' => $params['product_fuel_id'],
      'product_transmission_id' => $params['product_transmission_id'],
      'product_district_id' => $params['product_district_id'],
      'product_body_type_id' => $params['product_body_type_id'],
      'build_year' => $params['build_year'],
      'distance' => $params['distance'],
      'price' => $params['price'],
      'seller_id' => $params['seller_id'],
      'product_owner_id' => $owner->id,
      'is_active' => $params['is_active']
    ];

    if (isset($params['geo_point'])) {
      $data['geo_point'] = $params['geo_point'];
    }

    $product = Product::create($data);

    foreach ($params['image_path'] as $image) {
      $productImage = ProductImage::create([
        'product_id' => $product->id,
        'path' => $image['path']
      ]);
    }

    return $product;
  }

  public function updateProductByID($id, $params) {
    $product = Product::where('id', '=', $id)->first();

    $model = ProductModel::where('id', '=', $params['product_model_id'])->with('brand')->first();
    $str = explode('-', $product->slug);
    $key = array_key_last($str);

    $product->update([
      'name' => $params['name'],
      'slug' => trim(strtolower(Str::slug($params['name'].'-'.$model->brand->slug.'-'.$model->slug.'-'.$params['build_year'].'-'.$str[$key]))),
      'description' => $params['description'],
      'product_sub_category_id' => $params['product_sub_category_id'],
      'product_model_id' => $params['product_model_id'],
      'product_fuel_id' => $params['product_fuel_id'],
      'product_transmission_id' => $params['product_transmission_id'],
      'product_district_id' => $params['product_district_id'],
      'product_body_type_id' => $params['product_body_type_id'],
      'build_year' => $params['build_year'],
      'distance' => $params['distance'],
      'price' => $params['price'],
      'geo_point' => $params['geo_point'],
      'seller_id' => $params['seller_id'],
      'is_active' => $params['is_active'],
      'archive' => $params['archive'],
      'verified' => $params['verified']
    ]);

    if (isset($params['image_path'])) {
      $images = ProductImage::where('product_id', '=', $product->id)->get();
      foreach ($images as $image) {
        $image->delete();
      }

      foreach ($params['image_path'] as $image) {
        $productImage = ProductImage::create([
          'product_id' => $product->id,
          'path' => $image['path']
        ]);
      }
    }

    if (isset($params['owner'])) {
      $owner = ProductOwner::where('phone_number', '=', $params['owner']['phone_number'])->first();
      if (!$owner) {
        $owner = ProductOwner::create([
          'full_name' => $params['owner']['full_name'],
          'phone_number' => $params['owner']['phone_number']
        ]);
      } else {
        $owner->update([
          'full_name' => $params['owner']['full_name'],
          'phone_number' => $params['owner']['phone_number']
        ]);
      }
    } else {
      $owner = ProductOwner::where('phone_number', '=', $params['phone_number'])->first();
      if (!$owner) {
        $owner = ProductOwner::create([
          'full_name' => $params['full_name'],
          'phone_number' => $params['phone_number']
        ]);
      } else {
        $owner->update([
          'full_name' => $params['full_name'],
          'phone_number' => $params['phone_number']
        ]);
      }
    }

    return $product;
  }

  public function deleteProductByID(String $id) {}

}