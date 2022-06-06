<?php

namespace Database\Seeders;

use DB;
use App\Models\User;
use App\Models\Role;
use App\Models\RoleUser;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //creamos los roles de usuario
        $id = '';
        $name = '';
        $description = '';

        $roles = array(
            array("id" => "716a08b7-d877-11ec-af4a-509a4c58c04f", "name" => "super_admin", "description" => "Super Administrador"),
            array("id" => "0ef848ac-e5cd-11ec-b469-509a4c58c04f", "name" => "admin", "description" => "Administrador"),
            array("id" => "85184d07-0b9c-4d5e-b5ae-cbe83585304b", "name" => "user", "description" => "Usuario"),
        );

        foreach ($roles as $key => $row) {
            $exists = Role::where('name','=',$roles[$key]['name'])->exists();
            if ($exists != 1) {
                $role = new Role;
                $role->id = $roles[$key]['id'];
                $role->name = $roles[$key]['name'];
                $role->description = $roles[$key]['description'];
                $role->save();
            }
        }
        //fin

        //creamos usuarios predeterminados (uno por cada rol definido en la variable $roles)
        $users = array(
            array(
                "id" => "cea113d8-e5ca-11ec-b469-509a4c58c04f",
                "name" => "Jon Due",
                "role" => "super_admin",
                "email" => "superadmin@betaboxtechnologies.com",
                "password"=>"12345678"
            ),    
            array(
                "id" => "eebd7f43-e5ca-11ec-b469-509a4c58c04f",
                "name" => "Jon Due",
                "role" => "admin",
                "email" => "admin@betaboxtechnologies.com",
                "password"=>"12345678"
            ),        
            array(
                "id" => "f99a2380-e5ca-11ec-b469-509a4c58c04f",
                "name" => "Jon Due",
                "role" => "user",
                "email" => "user@betaboxtechnologies.com",
                "password"=>"12345678"
            ),        
        );

        foreach($users as $key=> $row){
            $exists = User::where('email','=',$users[$key]['email'])->exists();
            if ($exists!=1) {
                //creamos el usuario si no existe
                $user = new User;
                $user->id = $users[$key]['id'];
                $user->tenant_id = '';
                $user->name = $users[$key]['name'];
                $user->email = $users[$key]['email'];
                $user->password = Hash::make($users[$key]['password']);
                $user->save();
                //fin

                //creamos el rol del usuario en caso de que no tenga uno
                $exists_role = RoleUser::where('user_id','=',$users[$key]['id'])->exists();
                if ($exists_role!=1) {
                    $role_user_id = Str::uuid()->toString();
                    $role_user = new RoleUser;
                    $role_user->id = $role_user_id;
                    $role_user->role_id = Role::where('name','=',$users[$key]['role'])->first()->id;
                    $role_user->user_id = $users[$key]['id'];
                    $role_user->save();
                } 
                //fin   
            }
        }
        //fin
    }
}
