@extends('layouts.login')

@section('content')
    <div class="synapse__introduce">
        <p>Bienvenido nuevamente</p>
        <h2>Recupera tu contraseña</h2>
    </div>
    @if (session('status'))
        <div style="font-weight: bold;">
            {{ session('status') }}
        </div>
    @endif
    <div class="recovery__img" >
        <img src="{{ asset('assets/llaves.svg') }}" alt="llaves">
    </div>
    <div class="synapse__introduce">
        <h2>Se te olvidó la contraseña?</h2>
        <p class="dont__worry" >No te preocupes, solo sigue estas instrucciones</p>
    </div>
    <form class="synapse__form" method="POST" action="{{ route('password.email') }}">
        @csrf
        <div class="form__data-container">
            <label for="email">Correo electrónico</label>
            <input id="email" type="email" name="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
        </div>
        <button class="btn-recuperar">Enviar Correo</button>
    </form>
    <footer class="synapse__footer" >
         <p><a href="{{ route('login') }}"> <i class="fa fa-arrow-left" aria-hidden="true"></i> Volver a iniciar sesion</a></p>
    </footer>
@endsection
