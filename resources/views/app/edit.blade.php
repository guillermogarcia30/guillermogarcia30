<strong>Modificar Clientes</strong>
<br><br>
<form action="{{ route('app.update',$app->id) }}" method="post">
    @csrf
    @method('PUT')
    Nombre
    <input type="text" name="name" value="{{ $app->name }}" required>
    <br><br>
    URL Callback
    <input type="url" name="redirect" value="{{ $app->redirect }}" required>
    <br><br>
    <button>Modificar</button>
</form>