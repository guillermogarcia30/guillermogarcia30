<?php

namespace Database\Seeders;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        for ($i = 1; $i <= 20; $i++) {
            $tenant = new Tenant;
            $tenant->id = $faker->unique()->uuid();
            $tenant->domain = strtoupper($faker->unique()->buildingNumber());
            $tenant->name = $faker->company();
            $tenant->image = $faker->imageUrl($width = 640, $height = 480);
            $tenant->status = $faker->randomElement($array = array (1,0));
            $tenant->save();
        }
        //Tenant::factory(20)->create();
    }
}
