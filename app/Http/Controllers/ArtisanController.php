<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;

class ArtisanController extends Controller
{
    public function migrate()
    {
        \Artisan::call('migrate:fresh', [
            '--seed' => true // <--- add this line
        ]);

        return 'Migrated all tables';
    }

    public function passport()
    {
        set_time_limit(0);

        DB::table('oauth_access_tokens')->truncate();
        DB::table('oauth_auth_codes')->truncate();
        DB::table('oauth_clients')->truncate();
        DB::table('oauth_personal_access_clients')->truncate();
        DB::table('oauth_refresh_tokens')->truncate();

        \Artisan::call('passport:install', [
            '--force' => true // <--- add this line
        ]);

        return "Passport Restarted";
    }
}
