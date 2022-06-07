@extends('layouts.login')

@section('title', 'Registro de Usuario')

@section('content')
<div class="synapse__introduce">
    <p>Bienvenido</p>
    <h2>Registrate</h2>
</div>
<form class="synapse__form-register-a" method="POST" action="{{ route('register') }}">
    @csrf
    <div class="form__data-container">
        <label for="name">Nombre</label>
        <input required id="name" type="text" class="@error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>
        @error('name')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror
    </div>
    <div class="form__data-container">
        <label for="email">Correo electrónico</label>
        <input required id="email" id="email" type="email" class="@error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">
        @error('email')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror
    </div>
    <div class="form__data-container">
        <label for="password">Contraseña</label>
        <input required id="password" type="password" class="@error('password') is-invalid @enderror" name="password" required autocomplete="new-password">
        @error('password')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror
    </div>
    <div class="form__data-container">
        <label for="confirm-password">Confirmar contraseña</label>
        <input required id="confirm-password" type="password" name="password_confirmation" required autocomplete="new-password">
    </div>
    <div class="form__options-container" >
        <div class="separador">
            <input id="check" type="checkbox">
            <label class="pink" for="check">Acepto los terminos</label>
        </div>
    </div>
    <button class="btn" >Registrate</button>
</form>

<footer class="synapse__footer">
    <p>Ya tienes cuenta? <a href="{{ route('login') }}">Inicia sesion</a></p>
</footer>
@endsection
