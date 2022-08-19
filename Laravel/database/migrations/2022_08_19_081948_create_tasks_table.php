<?php

use App\Models\TaskStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->integer("priority");
            $table->boolean("isArchived");
            $table->string("status");
//            $table->enum(["Not started", "In progress", "Completed"]);
            $table->json("tags");
            $table->timestamps(); // include "created_at" & "updated_at"
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
};
