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
        // if (!Schema::hasTable('users')) {
        Schema::create('transportations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('father_name')->nullable();
            $table->string('tazkira_no')->nullable();
            $table->string('passport')->nullable();
            $table->string('image')->nullable();
            $table->string('phone')->nullable();
            $table->string('discription')->nullable();
            $table->string('location')->nullable();
            $table->string('email')->unique()->nullable();
            // here add status enum('pending, 'accepted', 'rejected'    )
            $table->enum('status', ['pending', 'accepted', 'rejected']);


            $table->rememberToken();
            $table->timestamps();
        });
        // }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transportations');
    }
};
