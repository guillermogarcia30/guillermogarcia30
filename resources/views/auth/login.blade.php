@extends('layouts.login')

@section('title', 'Inicio de Sesión')

@section('content')
    <div class="synapse__introduce">
        <p>Bienvenido</p>
        <h2>Inicia sesion con tu cuenta</h2>
    </div>
    <form class="synapse__form" action="{{ route('login') }}" method="POST">
        <div class="form__data-container">
            <label for="email">Correo electrónico</label>
            <input id="email" type="email" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus class="@error('email') is-invalid @enderror">
            @error('email')
                <span style="color:red;" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>
        <div class="form__data-container">
            <label for="password">Contraseña</label>
            <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
            @error('password')
                <span style="color:red;" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>
        <div class="form__options-container" >
            <div class="separador">
                <input id="check" type="checkbox">
                <label for="check">Recordar contraseña</label>
            </div>
            @if (Route::has('password.request'))
                <a href="{{ route('password.request') }}">Se me olvido la contraseña</a>
            @endif
        </div>
        <button class="btn" >Iniciar sesion</button>
    </form>
    <footer class="synapse__footer" >
        <p>No tienes cuenta? <a href="{{ route('register') }}">Registrate aquí</a></p>
    </footer>
@endsection
