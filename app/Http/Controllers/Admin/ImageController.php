<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\ImageRepository;

class ImageController extends Controller
{
    public function upload(Request $request) {
        $images = $request->files('images')->store('public/images');

        return $images;
    }
}
