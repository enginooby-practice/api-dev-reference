<?php

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// * url base "/api/..."

Route::get("/tasks", function () {
    return Task::all();
});

Route::get("/tasks/{id}", function (int $id) {
    return Task::find($id);
});

Route::post("/tasks", function (Request $request) {
    $request->validate([
        "title" => "required",
    ]);

    return Task::create($request->all());
});

Route::patch("/tasks/{id}", function (Request $request, int $id) {
    $task = Task::find($id);
    $task->update($request->all());

    return $task;
});

Route::delete("tasks/{id}", function (int $id) {
    $isDestroy = Task::destroy($id);

    return "Deleted: " . $isDestroy;
});
