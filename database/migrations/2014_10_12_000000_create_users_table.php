<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id');
            $table->uuid('tenant_id');
            $table->uuid('country_id')->nullable();
            $table->string('name');
            $table->string('email')->unique();
            $table->date('birth_date')->nullable();
            $table->string('address',100)->nullable();
            $table->string('state',20)->nullable();
            $table->string('city',20)->nullable();
            $table->string('phone',15)->nullable();
            $table->string('position',30)->nullable();
            $table->string('profile_image',300)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->integer('status');
            $table->timestamps();

            $table->primary('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
