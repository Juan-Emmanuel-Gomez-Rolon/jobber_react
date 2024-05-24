<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\File\File;

Route::get('/build/assets/{file}', function ($file) {

    $mime_array = [
        'js' => 'application/javascript',
        'css' => 'text/css',
    ];

    // split the file name and extension
    $file_parts = explode('.', $file);

    $mime = $mime_array[end($file_parts)];

    $body = file_get_contents(public_path('build/assets/' . $file));

    return response($body, 200, [
        'Content-Type' => $mime
    ]);
});

Route::get('/routes', function () {
    $routes = collect(Route::getRoutes())->map(function ($route) {
        return [
            'uri' => $route->uri,
            'methods' => $route->methods,
            'name' => $route->action['as'] ?? null,
        ];
    });

    return $routes;
});

Route::post('/{any}', function (Request $request) {
    // if request uri starts with '/api' pass request to the api routes
    if (strpos($request->getRequestUri(), '/api') === 0) {
        // edit the request uri to add api prefix
        $request->server->set('REQUEST_URI', '/api' . $request->getRequestUri());
        return app()->handle($request);
    }

    return response()->json(['message' => 'Fuck vercel'], 404);
})->where('any', '.*');

// put
Route::put('/{any}', function (Request $request) {
    // if request uri starts with '/api' pass request to the api routes
    if (strpos($request->getRequestUri(), '/api') === 0) {
        // edit the request uri to add api prefix
        $request->server->set('REQUEST_URI', '/api' . $request->getRequestUri());
        return app()->handle($request);
    }

    return response()->json(['message' => 'Fuck vercel'], 404);
})->where('any', '.*');

// delete
Route::delete('/{any}', function (Request $request) {
    // if request uri starts with '/api' pass request to the api routes
    if (strpos($request->getRequestUri(), '/api') === 0) {
        // edit the request uri to add api prefix
        $request->server->set('REQUEST_URI', '/api' . $request->getRequestUri());
        return app()->handle($request);
    }

    return response()->json(['message' => 'Fuck vercel'], 404);
})->where('any', '.*');


// redirect all requests to the SPA
Route::get('/{any}', function (Request $request) {
    // if request uri contains 'api' pass request to the api routes
    if (strpos($request->getRequestUri(), 'api') !== false) {
        // edit the request uri to add api prefix
        $request->server->set('REQUEST_URI', '/api' . $request->getRequestUri());
        return app()->handle($request);
    }

    return view('welcome');
})->where('any', '.*');
