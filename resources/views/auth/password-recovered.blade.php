@extends('layouts.login')

@section('title', 'Recuperar Contraseña')

@section('content')
    <div class="recovery__img" >
        <img src="{{ asset('assets/correo.svg') }}" alt="llaves">
    </div>
    <div class="synapse__introduce">
        <h2 align="center">Su contraseña ha sido actualizada</h2>
    </div>
    <footer class="synapse__footer" >
        <p><a href="{{ route('login') }}"> <i class="fa fa-arrow-left" aria-hidden="true"></i> Iniciar sesión</a></p>
    </footer>
@endsection