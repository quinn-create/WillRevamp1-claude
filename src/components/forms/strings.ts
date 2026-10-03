// Contact form strings (EN + ES). Build-time only: the error messages reach the browser as data-* attributes
// on each field, so the form script stays language-agnostic and tiny.
// Fields follow inventory/forms.json gform_1 (same 7 fields, plain-language labels). Required set follows the
// approved copy ("Leave your name and phone number… Email and a short note are optional"; D-A14-20).
import type { Lang } from '../../lib/site';

export interface FieldText { label: string; help?: string; required?: string; invalid?: string; placeholder?: string }
export interface FormText {
  intro: string;
  optional: string;
  first: FieldText;
  last: FieldText;
  email: FieldText;
  phone: FieldText;
  time: FieldText & { choose: string; options: string[] };
  client: FieldText & { choose: string; options: string[] };
  message: FieldText;
  legend: string;
  honeypot: string;
  submit: string;
  sending: string;
  orCall: string;
  /** Configured-off note: (tel link, mailto link). */
  offTitle: string;
  off: [string, string, string];
  /** Error summary + submission failures. */
  summaryTitle: string;
  failTitle: string;
  /** Always shown under the reason: (before tel link, after). */
  fail: [string, string];
  network: string;
  tooFast: string;
  spam: string;
  captcha: string;
  successTitle: string;
  success: string;
  /** Fallback non-confidentiality notice (used only when the page passes no copy block for it). */
  notice: string;
  noticeBody: string;
  noticeSee: string;
  privacy: string;
  subject: string;
}

const en: FormText = {
  intro: 'Fields are required unless marked optional.',
  optional: '(optional)',
  first: { label: 'First name', required: 'Enter your first name.' },
  last: { label: 'Last name', required: 'Enter your last name.' },
  email: {
    label: 'Email',
    help: 'Used only to reply to you.',
    invalid: 'Enter an email address like name@example.com, or leave it blank.',
  },
  phone: {
    label: 'Phone',
    help: 'Include the area code. The office will call this number.',
    required: 'Enter your phone number so the office can call you back.',
    invalid: 'Enter a full phone number, including the area code.',
  },
  time: {
    label: 'Best time to reach you',
    choose: 'Choose a time',
    options: ['As soon as possible', 'Morning', 'Noon', 'Afternoon', 'Evening', 'No preference'],
  },
  client: {
    label: 'Are you a new client?',
    choose: 'Choose one',
    options: ['Yes, I may be a new client', 'No, I am a current client', 'Neither'],
  },
  message: {
    label: 'How can we help?',
    help: 'A line or two about what happened is enough. Up to 600 characters.',
  },
  legend: 'Your message',
  honeypot: 'Leave this field empty',
  submit: 'Send message',
  sending: 'Sending…',
  orCall: 'Or call',
  offTitle: 'Online messages are not switched on yet',
  off: ['Please call ', ' or email ', '. The fields below will open once online messages are switched on.'],
  summaryTitle: 'Please fix the following:',
  failTitle: 'Your message was not sent',
  fail: ['Your message is still here, so you can try again, or call ', '.'],
  network: 'Something went wrong while sending.',
  tooFast: 'That was very fast. Please wait a moment and press Send again.',
  spam: 'It looks like an automatic submission.',
  captcha: 'Please complete the security check above the Send button.',
  successTitle: 'Message sent',
  success: 'Thank you. Taking you to the confirmation page…',
  notice: 'Please read before you send.',
  noticeBody: 'Do not include confidential information in this form. Sending a message does not create an attorney-client relationship.',
  noticeSee: 'See our',
  privacy: 'Privacy Policy',
  subject: 'New message from willfraleylaw.com',
};

const es: FormText = {
  intro: 'Todos los campos son obligatorios, salvo los marcados como opcionales.',
  optional: '(opcional)',
  first: { label: 'Nombre', required: 'Escriba su nombre.' },
  last: { label: 'Apellido', required: 'Escriba su apellido.' },
  email: {
    label: 'Correo electrónico',
    help: 'Solo se usa para responderle.',
    invalid: 'Escriba un correo como nombre@ejemplo.com, o déjelo en blanco.',
  },
  phone: {
    label: 'Teléfono',
    help: 'Incluya el código de área. La oficina le llamará a este número.',
    required: 'Escriba su número de teléfono para que la oficina pueda llamarle.',
    invalid: 'Escriba el número completo, con el código de área.',
  },
  time: {
    label: 'Mejor hora para llamarle',
    choose: 'Elija una hora',
    options: ['Lo antes posible', 'Por la mañana', 'Al mediodía', 'Por la tarde', 'Por la noche', 'Sin preferencia'],
  },
  client: {
    label: '¿Es usted un cliente nuevo?',
    choose: 'Elija una opción',
    options: ['Sí, podría ser un cliente nuevo', 'No, ya soy cliente', 'Ninguna de las dos'],
  },
  message: {
    label: '¿Cómo podemos ayudarle?',
    help: 'Basta con una o dos líneas sobre lo que pasó. Hasta 600 caracteres.',
  },
  legend: 'Su mensaje',
  honeypot: 'Deje este campo vacío',
  submit: 'Enviar mensaje',
  sending: 'Enviando…',
  orCall: 'O llame al',
  offTitle: 'Los mensajes en línea todavía no están activados',
  off: ['Llame al ', ' o escriba a ', '. Los campos de abajo se abrirán cuando se activen los mensajes en línea.'],
  summaryTitle: 'Corrija lo siguiente:',
  failTitle: 'Su mensaje no se envió',
  fail: ['Su mensaje sigue aquí, así que puede intentarlo de nuevo, o llame al ', '.'],
  network: 'Algo falló al enviar.',
  tooFast: 'Fue muy rápido. Espere un momento y pulse Enviar otra vez.',
  spam: 'Parece un envío automático.',
  captcha: 'Complete la verificación de seguridad que está encima del botón Enviar.',
  successTitle: 'Mensaje enviado',
  success: 'Gracias. Le llevamos a la página de confirmación…',
  notice: 'Lea esto antes de enviar.',
  noticeBody: 'No incluya información confidencial en este formulario. Enviar un mensaje no crea una relación entre abogado y cliente.',
  noticeSee: 'Consulte nuestra',
  privacy: 'Política de privacidad',
  subject: 'Nuevo mensaje desde willfraleylaw.com (español)',
};

export const FORM_TEXT: Record<Lang, FormText> = { en, es };
