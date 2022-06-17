<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <link rel="icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta name="theme-color" content="#000000"/>
        <meta name="description" content="Web site created using create-react-app"/>
        <meta http-equiv="Pragma" content="no-cache">
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
        <!--  -->
        <link rel="manifest" href="/manifest.json"/>
        <title>Synapse</title>
        <script defer="defer" src="/static/js/main.c07ca1f5.js"></script>
        <link href="/static/css/main.c91cf7fe.css" rel="stylesheet">
    </head>
    <body>
        @yield('content')
        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
            @csrf
        </form>
    </body>
</html>