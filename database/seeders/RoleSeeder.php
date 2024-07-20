<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Role::create(['name' => 'super-admin']);
        Role::create(['name' => 'hotel-admin']);
        Role::create(['name' => 'transport-admin']);
        Role::create(['name' => 'user']);
        Role::create(['name' => 'tour-guide']);

    }
}
