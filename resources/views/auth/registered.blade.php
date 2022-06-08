@extends('layouts.login')

@section('title', 'Recuperar Contraseña')

@section('content')
    <div class="recovery__img" >
        <img src="{{ asset('assets/verificaicon.svg') }}" alt="verificacion">
    </div>
    <div class="synapse__introduce">
        <h2 style="text-align: center;" >Ya te registraste</h2>
        <p class="dont__worry-d" >
            <span class="span__blue" >¡Felicidades!</span> 
            ya te registraste en <span class="bolder-black" >Synapse</span>, 
            dale al boton de <span class="pink">Iniciar sesion</span>
        </p>
    </div>
    <footer class="synapse__footer-d" >
        <a class="btn-fake" href="{{ route('login') }}"> Iniciar sesión </a>
    </footer>
@endsection