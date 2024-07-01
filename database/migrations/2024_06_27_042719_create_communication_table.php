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
        Schema::create('communication', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('for_whom');
            $table->string('from_whom');
            $table->string('type');
            $table->string('writer_name');
            $table->text('message');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('communication');
    }
};
