@extends('layouts.login')

@section('title', 'Recuperar Contraseña')

@section('content')
    <div class="recovery__img" >
        <img src="{{ asset('assets/llaves.svg') }}" alt="">
    </div>
    <div class="synapse__introduce">
        <h2>Ingrese una nueva conraseña</h2>
        <p class="dont__worry-d" >Su nueva contraseña debe ser diferente a la contraseña utilizada anteriormente</p>
    </div>
    <form class="synapse__form" method="POST" action="{{ route('password.update') }}">
        @csrf
        <input type="hidden" name="token" value="{{ $token }}">
        
        <input id="email" type="hidden" class="@error('email') is-invalid @enderror" name="email" value="{{ $email ?? old('email') }}" required autocomplete="email" autofocus>
        @error('email')
            <span style="color:red;" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror

        <div class="form__data-container">
            <label for="password">Contraseña</label>
            <input class="password__recovery @error('password') is-invalid @enderror" id="password" type="password" name="password" required autocomplete="new-password">
            <small class="dont__worry-s" >Tiene que tener mas de 8 caracteres</small>
            @error('password')
                <span style="color:red;" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>
        <div class="form__data-container">
            <label for="password-confirm">Repite la contraseña</label>
            <input class="password__recovery" id="password-confirm" type="password" name="password_confirmation" required autocomplete="new-password">
            <small class="dont__worry-s" >Confirme otra vez la contraseña</small>
        </div>
        <button class="btn-recuperar" >Recuperar</button>
    </form>
    <footer class="synapse__footer" >
        <p>Ya recuerdas tu contraseña? <a href="{{ route('login') }}">Inicia sesión</a></p>
    </footer>
@endsection
