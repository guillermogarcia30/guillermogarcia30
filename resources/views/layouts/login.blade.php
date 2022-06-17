<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Pragma" content="no-cache">
    <link rel="shortcut icon" href="{{ asset('assets/favicon.png') }}" type="image/x-icon">
    <!-- CSS STYLES -->
    <link rel="stylesheet" href="{{ asset('styles/styles.css') }}">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
    <script defer src="https://kit.fontawesome.com/bee5d29894.js" crossorigin="anonymous"></script>
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
        </section>
    </main>
</body>
</html>