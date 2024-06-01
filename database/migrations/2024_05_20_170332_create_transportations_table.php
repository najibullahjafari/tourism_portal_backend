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

        Schema::create('transportations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('tazkira_no')->nullable();
            $table->string('passport')->nullable();
            $table->string('image')->nullable();
            $table->string('phone')->nullable();
            $table->string('discription')->nullable();
            $table->string('location')->nullable();
            $table->enum('status', ['accepted', 'rejected', 'pending'])->default('pending');
            // $table->enum('type', ['Taxi', 'Van', 'Land cruiser', 'SUV', 'Limousine']);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transportations');
    }
};
