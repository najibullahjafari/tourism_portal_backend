<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('foot')) {
            Schema::create('foot', function (Blueprint $table) {
                $table->id();
                $table->timestamps();
                $table->integer('hotel_id');
                $table->string('name');
                $table->integer('category_id');
                $table->text('description');
                $table->string('cost');
                $table->string('image');
            });
        }

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {


        Schema::dropIfExists('foot');
    }
};
