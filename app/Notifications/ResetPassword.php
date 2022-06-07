<?php
 
namespace App\Notifications;
 
use \Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\HtmlString;
class ResetPassword extends ResetPasswordNotification
{
 
    /**
     * Build the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->greeting('Hola '.$notifiable->name)
            ->subject(Lang::get('Solicitud de restablecimiento de contraseña'))
            ->line(new HtmlString("Estás recibiendo este correo electronico porque recibimos una solicitud de restablecimiento de contraseña para su cuenta de Synapse."))
            ->action(Lang::get('Cambiar contraseña'), url(config('app.url') . route('password.reset', ['token' => $this->token, 'email' => $notifiable->getEmailForPasswordReset()], false)))
            ->line(new HtmlString("Su correo afiliado de <strong style='color:#000000;'>Synapse</strong> es: <p style='color:#FF2B44;'>" .$notifiable->getEmailForPasswordReset(). "</p>."))
            ->line(Lang::get('Este enlace de restablecimiento de contraseña caducará en :count minutos.', ['count' => config('auth.passwords.' . config('auth.defaults.passwords') . '.expire')]))
            ->line(Lang::get('Si tu no realizaste la solicitud de cambio de contraseña, solo ignore este mensaje. '))
            ->line(Lang::get('Si no solicitó un restablecimiento de contraseña, no se requiere ninguna otra accion.'))
            ->salutation(new HtmlString("<strong style='color:#000000;'>Saludos,</br> Equipo de Synapse CRM</strong>"));
    }
}