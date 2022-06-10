@extends('layouts.login')

@section('title', 'Registro de Usuario')

@section('content')
<div class="synapse__introduce" style="text-align: center;" >
    <p>Bienvenido</p>
    <h2>Registro</h2>
</div>
<form class="synapse__form-register-a" method="POST" action="{{ route('register') }}">
    @csrf
    <div class="form__data-container">
        <label for="name">Nombre</label>
        <input id="name" type="text" class="@error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus maxlength="255">
        @error('name')
            <span style="color:red;" role="alert">
                <strong>{{ str_replace("name","Nombre",$message) }}</strong>
            </span>
            <br>
        @enderror
    </div>
    <div class="form__data-container">
        <label for="email">Correo electrónico</label>
        <input id="email" id="email" type="email" class="@error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" maxlength="255">
        @error('email')
            <span style="color:red;" role="alert">
                <strong>{{ str_replace("email","Correo Electrónico",$message) }}</strong>
            </span>
            <br>
        @enderror
    </div>
    <div class="form__data-container">
        <label for="password">Contraseña</label>
        <input id="password" type="password" class="@error('password') is-invalid @enderror" name="password" required autocomplete="new-password" maxlength="255">
        @error('password')
            <span style="color:red;" role="alert">
                <strong>{{ str_replace("password","Contraseña",$message) }}</strong>
            </span>
            <br>
        @enderror
    </div>
    <div class="form__data-container">
        <label for="confirm-password">Confirmar contraseña</label>
        <input id="confirm-password" type="password" name="password_confirmation" required autocomplete="new-password">
    </div>
    <div class="form__options-container" >
        <div class="separador">
            <input id="check" type="checkbox"  name="terms" class="@error('terms') is-invalid @enderror" required="required" maxlength="255">
            @error('terms')
                <span style="color:red;" role="alert">
                    <strong>{{ str_replace("terms","Términos",$message) }}</strong>
                </span>
                <br>
            @enderror
            <label class="pink" for="check">Aceptar los términos</label>
        </div>
    </div>
    <button class="btn" >Registrarse</button>
</form>

<footer class="synapse__footer">
    <p>¿Ya posee una cuenta? <a href="{{ route('login') }}">Iniciar sesión</a></p>
</footer>
@endsection
