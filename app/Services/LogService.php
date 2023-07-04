<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class LogService
{
    public function info($message, $context = [])
    {
        Log::info($message, $context);
    }

    public function error($message, $context = [])
    {
        Log::error($message, $context);
    }

    // Agrega más métodos según tus necesidades
}