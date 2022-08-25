<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->email = 'aboutkanes@gmail.com';
        $user->username = 'josegranado';
        $user->role = 0;
        $user->type = 0;
        $user->verified = 1;
        $user->password = Hash::make('alfonzo97');
        $user->deleted = 0;
        $user->save();
        $user = new User();
        $user->email = 'vicvalsoftware@gmail.com';
        $user->username = 'robertocardiel';
        $user->role = 0;
        $user->type = 0;
        $user->verified = 1;
        $user->deleted = 0;
        $user->password = Hash::make('Roberto123');
        $user->save();
    }
}
