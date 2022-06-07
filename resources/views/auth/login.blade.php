@extends('layouts.login')

@section('title', 'Inicio de Sesión')

@section('content')
    <div class="synapse__introduce">
        <p>Bienvenido nuevamente</p>
        <h2>Inicia Sesión</h2>
    </div>
    <form class="synapse__form-register-a" action="{{ route('login') }}" method="POST" >
        @csrf
        <input type="hidden" name="app" value="{{env('APP_URL')}}">
        <div class="form__data-container">
            <label for="email">Correo electrónico</label>
            <input id="email" type="email" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus class="@error('email') is-invalid @enderror">
            @error('email')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>
        <div class="form__data-container">
            <label for="password">Contraseña</label>
            <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
            @error('password')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>
        <button class="btn" >Iniciar Sesión</button>
    </form>
    <footer class="synapse__footer" >
        @if (Route::has('password.request'))
            <p>Olvidaste tu contraseña? <a href="{{ route('password.request') }}">Recuperala Aquí</a></p>
        @endif
        <br>
        <p>No tienes cuenta? Registrate <a href="{{ route('register') }}">Registrate</a></p>
    </footer>
@endsection
