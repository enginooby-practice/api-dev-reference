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
            $table->integer("priority")->default(1);
            $table->boolean("isArchived")->default(false);
            $table->string("status")->default("In progress");
//            $table->string("status")->default(TaskStatus::InProgress->value); // FIX: TaskStatus not found
//            $table->enum(["Not started", "In progress", "Completed"]);
            $table->json("tags")->nullable();
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
