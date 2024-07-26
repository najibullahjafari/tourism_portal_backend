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
        if (!Schema::hasTable('booking')) {
            Schema::create('booking', function (Blueprint $table) {
                $table->id();
                $table->timestamps();
                $table->string('obj_type');
                $table->string('obj_id');
                $table->unsignedBigInteger('user_id');
                $table->foreign('user_id')->references('id')->on('users')->nullable()->onDelete('cascade');
                $table->dateTime('start_date');

            });
        }
        //

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
