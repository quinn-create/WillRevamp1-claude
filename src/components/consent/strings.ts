// A22 P600 consent UI strings, EN + ES. Build-time strings render into the markup; the few the client script
// needs at run time (status lines) travel as data-* attributes on the controls, so the script holds no copy.
import type { Lang } from '../../lib/site';

const en = {
  region: 'Cookie choices',
  sentence: {
    both: 'With your OK, this site would use analytics cookies to see which pages help people and marketing cookies to measure its ads; nothing loads unless you choose it.',
    analytics: 'With your OK, this site would use analytics cookies to see which pages help people; nothing loads unless you choose it.',
    marketing: 'With your OK, this site would use marketing cookies to measure its ads; nothing loads unless you choose it.',
  },
  privacy: 'Privacy Policy',
  acceptAll: 'Accept all',
  rejectAll: 'Reject all',
  settings: 'Settings',
  save: 'Save my choices',
  morePage: 'All cookie details',
  legend: 'Cookie categories',
  necessary: 'Strictly necessary',
  alwaysOn: 'Always on',
  necessaryDesc: 'These keep the site working and remember your answer here. They can’t be switched off, and they do not track you.',
  analytics: 'Analytics',
  analyticsDesc: 'These show the firm which pages help people. They never receive what you type into the contact form.',
  marketing: 'Marketing',
  marketingDesc: 'These let the firm measure its ads and show ads to people who have visited the site. They never receive what you type into the contact form.',
  offUnless: 'Off unless you say yes',
  tools: 'Tools:',
  noAnalytics: 'No analytics tools are turned on at the moment.',
  noMarketing: 'No marketing tools are turned on at the moment.',
  gpc: 'Your browser is sending a Global Privacy Control signal, so analytics and marketing stay off on this site.',
  noscript: 'JavaScript is off in this browser, so no analytics or marketing tool can load here. There is nothing to switch off.',
  saved: 'Your choices are saved.',
  on: 'on',
  off: 'off',
  current: 'Saved on this device:',
  none: 'You have not saved a choice on this device yet.',
};

type Dict = typeof en;

const es: Dict = {
  region: 'Opciones de cookies',
  sentence: {
    both: 'Con su permiso, este sitio usaría cookies de analítica para ver qué páginas le sirven a la gente y cookies de publicidad para medir sus anuncios; nada se carga a menos que usted lo elija.',
    analytics: 'Con su permiso, este sitio usaría cookies de analítica para ver qué páginas le sirven a la gente; nada se carga a menos que usted lo elija.',
    marketing: 'Con su permiso, este sitio usaría cookies de publicidad para medir sus anuncios; nada se carga a menos que usted lo elija.',
  },
  privacy: 'Política de privacidad',
  acceptAll: 'Aceptar todo',
  rejectAll: 'Rechazar todo',
  settings: 'Configuración',
  save: 'Guardar mis preferencias',
  morePage: 'Todos los detalles de las cookies',
  legend: 'Categorías de cookies',
  necessary: 'Estrictamente necesarias',
  alwaysOn: 'Siempre activas',
  necessaryDesc: 'Hacen que el sitio funcione y recuerdan su respuesta aquí. No se pueden apagar y no lo rastrean a usted.',
  analytics: 'Analítica',
  analyticsDesc: 'Le muestran a la firma qué páginas le sirven a la gente. Nunca reciben lo que usted escribe en el formulario de contacto.',
  marketing: 'Publicidad',
  marketingDesc: 'Le permiten a la firma medir sus anuncios y mostrar anuncios a quienes han visitado el sitio. Nunca reciben lo que usted escribe en el formulario de contacto.',
  offUnless: 'Apagada a menos que usted acepte',
  tools: 'Herramientas:',
  noAnalytics: 'En este momento no hay ninguna herramienta de analítica activada.',
  noMarketing: 'En este momento no hay ninguna herramienta de publicidad activada.',
  gpc: 'Su navegador envía una señal de Global Privacy Control, así que la analítica y la publicidad se quedan apagadas en este sitio.',
  noscript: 'JavaScript está desactivado en este navegador, así que aquí no se puede cargar ninguna herramienta de analítica ni de publicidad. No hay nada que apagar.',
  saved: 'Sus preferencias quedaron guardadas.',
  on: 'activada',
  off: 'apagada',
  current: 'Guardado en este dispositivo:',
  none: 'Todavía no ha guardado ninguna elección en este dispositivo.',
};

export const C = (lang: Lang): Dict => (lang === 'es' ? es : en);
