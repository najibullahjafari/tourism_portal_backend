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
                $table->string('booker_id');
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
