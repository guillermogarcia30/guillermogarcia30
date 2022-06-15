<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class TenantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'id' => $this->faker->unique()->uuid(),
            'domain' => strtoupper($this->faker->unique()->buildingNumber()),
            'name' =>  $this->faker->company(),
            'image' => $this->faker->imageUrl($width = 640, $height = 480),
            'status' => $this->faker->randomElement($array = array (1,0)),
        ];
    }
}
