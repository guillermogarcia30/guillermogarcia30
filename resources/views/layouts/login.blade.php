<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="{{ asset('assets/favicon.png') }}" type="image/x-icon">
    <!-- CSS STYLES -->
    <link rel="stylesheet" href="{{ asset('styles/styles.css') }}">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,400&display=swap" rel="stylesheet">
    <title>Synapse | @yield('title')</title>
</head>
<body>
    <main>
        <section class="main__container">
            <div class="synapse" >
                <div class="synapse__logo" >
                    <img src="{{ asset('assets/synapse-logo.png') }}" alt="Synapse">
                </div>
                @yield('content')
            </div>
            <div class="hero"></div>
            <div class="modal__sendemail" >
                <div class="modal__card">
                    <div class="top-side">
                        <div class="icon__container">
                            <img src="{{ asset('assets/bx-mail-send.svg') }}" alt="">
                        </div>
                    </div>
                    <div class="bottom-side">
                        <h3 class="msg">Exito</h3>
                        <p class="msg__description">Se le envio un correo de verificacion de Synapse</p>
                        <button class="btn__modal">Volver</button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</body>
</html>