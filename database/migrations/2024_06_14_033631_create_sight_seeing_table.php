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
        Schema::create('sight_seeing', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->string('province');
            $table->string('address');
            $table->text('description');
            $table->date('close_time');
            $table->date('open_time');
            $table->text('image');
            $table->string('ticket_cost');
            $table->unsignedBigInteger('hotel_id');
            $table->unsignedBigInteger('province_id')->nullable(); // Added province_id column
            $table->foreign('province_id')->references('id')->on('provinces')->onDelete('cascade');
            $table->string('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sight_seeing');
    }
};
