<strong>Clientes</strong>
<br>
<a href="{{ route('app.create') }}">
    Crear
</a>
<br>
<table border="1">
    <tr>
        <th>Name</th>
        <th>Client ID</th>
        <th>Secret</th>
        <th>Redirect URI</th>
        <th>Actions</th>
    </tr>
    @foreach($apps as $row)
    <tr>
        <td>{{ $row->name }}</td>
        <td>{{ $row->id }}</td>
        <td>{{ $row->secret }}</td>
        <td>{{ $row->redirect }}</td>
        <td>
            <form action="{{ route('app.destroy',$row->id) }}" method="post">
                @csrf
                @method('DELETE')
                <a href="{{ route('app.edit',$row->id) }}">
                    Modificar
                </a>
                <button>
                    Eliminar
                </button>
            </form>
        </td>
    </tr>
    @endforeach
</table>