<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class messageController extends Controller
{
    public function index()
    {
        $user = User()::get();
        return Inertia::render('Message/Message', ['users' => $user]);
    }
}
