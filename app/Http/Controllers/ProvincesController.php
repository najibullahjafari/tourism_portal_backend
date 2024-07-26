<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\provinces;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProvincesController extends Controller
{
    //
    public function index(Request $request)
    {
        $data = provinces::get();

        return Inertia::render('Provinces/AddProvinces', [
            'data' => $data,
        ]);

    }

    public function getProvinces()
    {
        $data = provinces::get();

        return Inertia::render('Provinces/ShowProvinces', [
            'data' => $data,
        ]);
    }
    public function store(Request $data)
    {
        $province = provinces::updateOrCreate(
            ['id' => $data['id']],
            [
                'name' => $data['name'],
                'nameFa' => $data['nameFa'],
                'namePa' => $data['namePa'],
                'latitude' => $data['latitude'],
                'longitude' => $data['longitude'],
                'districts' => $data['districts'],
            ]
        );

        return Inertia::render('Provinces/AddProvinces', [
            'province' => $province,
        ]);
    }


    public function importProvincesFromJson()
    {
        // Read the JSON file
        $filePath = 'C:\Users\najib\Downloads\provinces.json';
        $json = File::get($filePath);
        $provinces = json_decode($json, true);
        // Insert or update data into the database
        DB::transaction(function () use ($provinces) {
            foreach ($provinces as $province) {
                // Insert or update province with districts as JSON
                DB::table('provinces')->updateOrInsert(
                    ['id' => $province['id']], // Condition to check for existing record
                    [
                        'name' => $province['name'],
                        'nameFa' => $province['nameFa'],
                        'namePa' => $province['namePa'],
                        'latitude' => $province['latitude'],
                        'longitude' => $province['longitude'],
                        'districts' => json_encode($province['districts']) // Store districts as JSON
                    ]
                );
            }
        });

        return response()->json(['message' => 'Provinces and districts imported successfully.']);
    }

    public function importProvinces()
    {
        $filePath = storage_path('app/provinces-and-districts.json');
        return $this->importProvincesFromJson($filePath);
    }

    public function getProvincesApi()
    {
        $data = provinces::get();

        return response()->json($data);
    }

    public function apidocumentation()
    {
        return Inertia::render('Provinces/ApiDocumentation');
    }
}
