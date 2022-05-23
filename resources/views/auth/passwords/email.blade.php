@extends('layouts.login')

@section('content')
    <div class="synapse__introduce">
        <p>Bienvenido nuevamente</p>
        <h2>Recupera tu contraseña</h2>
    </div>
    <form class="synapse__form-register-a" method="POST" action="{{ route('password.email') }}">
        @csrf
        <div class="form__data-container">
            <label for="email">Correo electronico</label>
            <input id="email" type="email" name="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
            @error('email')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>
        <button class="btn" >Enviar Link de Restaurar Contraseña</button>
    </form>
    <footer class="synapse__footer" >
        <p>Recordate tu contraseña? <a href="{{ route('login') }}">Iniciar Sesión</a></p>
    </footer>
@endsection
