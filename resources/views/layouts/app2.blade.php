<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <link rel="icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta name="theme-color" content="#000000"/>
        <meta name="description" content="Web site created using create-react-app"/>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,400&display=swap" rel="stylesheet">
        <link rel="manifest" href="/manifest.json"/>
        <title>Synapse</title>
        <script defer="defer" src="/static/js/main.4c0d531b.js"></script>
        <link href="/static/css/main.e3ffd190.css" rel="stylesheet">
    </head>
    <body>
        @yield('content')
        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
            @csrf
        </form>
    </body>
</html>