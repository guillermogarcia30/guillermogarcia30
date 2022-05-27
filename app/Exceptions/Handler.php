<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    //funcion para sobreescribir la repuesta por defecto { "message": "Unauthenticated" }
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        //$error = ['message' => $exception->getMessage()];
        $error = [
            'error' => true,
            'data' => 'Token is Expired'
        ];
        return $request->expectsJson()
                    ? response()->json($error, 401)
                    : redirect()->guest(route('login'));
    }
    //fin
}
