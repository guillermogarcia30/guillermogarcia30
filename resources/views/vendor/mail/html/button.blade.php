<style>
.ps-b{
    background-color: #FF2B44;
    padding: .5rem 1.3rem;
    width: 22rem;
    margin: 1rem auto;
    text-decoration: none;
    color: #ffffff;
    text-align: center;
    border-radius: 5px;
}
</style>
<table class="action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td align="center">
<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td align="center">
<table border="0" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td>
<!--<a href="{{-- $url --}}" class="button button-{{-- $color ?? 'primary' --}}" target="_blank" rel="noopener">{{-- $slot --}}</a>-->
<a href="{{ $url }}" class="ps-b" target="_blank" rel="noopener">{{ $slot }}</a>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
