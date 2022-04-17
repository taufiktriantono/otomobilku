<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\ProductImage;

class ImageController extends Controller
{
    public function upload(Request $request) {
        $images = $request->file('images');
        $files = [];

        foreach ($images as $image) {
            $files[] = [
                'path' => $image->store('cars/images', 'public')
            ];
        }

        return response()->json($files, 200);
    }
}
