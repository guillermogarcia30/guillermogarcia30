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
            ->line(new HtmlString("Se solicitó un restablecimiento de contraseña para tu cuenta <strong style='color:#000000;'>" .$notifiable->getEmailForPasswordReset(). "</strong>, haz clic en el botón que aparece a continuación para cambiar tu contraseña."))
            ->action(Lang::get('Cambiar contraseña'), url(config('app.url') . route('password.reset', ['token' => $this->token, 'email' => $notifiable->getEmailForPasswordReset()], false)))
            ->line(Lang::get('Si tu no realizaste la solicitud de cambio de contraseña, solo ignora este mensaje. '))
            ->line(Lang::get('Este enlace solo es válido dentro de los proximos :count minutos.', ['count' => config('auth.passwords.' . config('auth.defaults.passwords') . '.expire')]))
            ->salutation('Synapse');
    }
}