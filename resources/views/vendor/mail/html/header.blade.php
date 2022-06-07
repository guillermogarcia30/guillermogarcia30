<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src="https://laravel.com/img/notification-logo.png" class="logo" alt="Laravel Logo">
@else
<img src="https://auth.synapse-crm.com/assets/synapse-logo.png" style="width:50%;" alt="Synapse Logo">
{{-- $slot --}}
@endif
</a>
</td>
</tr>
