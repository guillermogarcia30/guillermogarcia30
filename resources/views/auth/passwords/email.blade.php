@extends('layouts.login')

@section('content')
    @if (session('status'))
        <div style="font-weight: bold;">
            {{ session('status') }}
        </div>
    @endif
    <div class="recovery__img" >
        <img src="{{ asset('assets/llaves.svg') }}" alt="llaves">
    </div>
    <div class="synapse__introduce" style="text-align: center;" >
        <h2 align="center">¿Olvidó su contraseña?</h2>
    </div>
    <form class="synapse__form" method="POST" action="{{ route('password.email') }}">
        @csrf
        <div class="form__data-container">
            <label for="email">Correo electrónico</label>
            <input id="email" type="email" name="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
            @error('email')
            <span style="color:red;" role="alert">
                <strong>{{ str_replace("email","Correo Electrónico",$message) }}</strong>
            </span>
        @enderror
        </div>
        <button class="btn-recuperar">Enviar Correo</button>
    </form>
    <footer class="synapse__footer" style="text-align:center;">
         <p><a href="{{ route('login') }}"> <i class="fa fa-arrow-left" aria-hidden="true"></i> Iniciar sesión</a></p>
    </footer>
@endsection
