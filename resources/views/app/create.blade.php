<strong>Crear Clientes</strong>
<br><br>
<form action="{{ route('app.store') }}" method="post">
    @csrf
    Nombre
    <input type="text" name="name" required>
    <br><br>
    URL Callback
    <input type="url" name="redirect" required>
    <br><br>
    <button>Crear</button>
</form>