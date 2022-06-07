@extends('layouts.login')

@section('title', 'Recuperar Contraseña')

@section('content')
    <div class="synapse__introduce">
        <h2>Resetear Contraseña</h2>
    </div>
    <form class="synapse__form-register-a" method="POST" action="{{ route('password.update') }}">
        @csrf
        <input type="hidden" name="token" value="{{ $token }}">

        <div class="form__data-container">
            <!--<label for="email">Correo electrónico</label>-->
            <input id="email" type="hidden" class="@error('email') is-invalid @enderror" name="email" value="{{ $email ?? old('email') }}" required autocomplete="email" autofocus>
            @error('email')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>
        <div class="form__data-container">
            <label for="password">Contraseña</label>
            <input id="password" type="password" class="@error('password') is-invalid @enderror" name="password" required autocomplete="new-password">
            @error('password')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>
        <div class="form__data-container">
            <label for="password">Confirmar Contraseña</label>
            <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
        </div>
        <button class="btn" >Resetear Contraseña</button>
    </form>
    <footer class="synapse__footer" >
    </footer>
@endsection
