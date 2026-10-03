// Page-template strings (A20 P400) that the shared dictionary in src/lib/i18n.ts (A19) does not carry.
// Facts (phone, email, name) are never written here; they come from src/lib/site.ts `firm`.
import type { Lang } from '../../lib/site';

const en = {
  homeEyebrow: 'Attorney at Law · Murfreesboro, Tennessee',
  practiceEyebrow: 'Practice areas',
  aboutEyebrow: 'About Will Fraley',
  spanishEyebrow: 'En español',
  processEyebrow: 'The process',
  expectEyebrow: 'What to expect',
  caseTypesEyebrow: 'Case types',
  newsEyebrow: 'In the news',
  findQuestion: 'Jump to a group of questions',
  lastReviewed: 'Last reviewed:',
  willDeskAlt: 'Will Fraley at his desk with a pen and a legal pad',
  willDoorAlt: 'Will Fraley in a dark suit, standing at a brick doorway',
  katieAlt: 'Katie Fults',
  cert2019Alt:
    'Certificate of completion from the Tennessee Association of Criminal Defense Lawyers for the 2019 TACDL Advanced Cross Examination Training, awarded to Will Fraley and dated September 20, 2019',
  cert2006Alt:
    'Tennessee Association of Criminal Defense Lawyers certificate issued to R. Wilford Fraley, III for completing the 5th Annual Tennessee Criminal Defense College, March 30 to April 1, 2006',
  formOff: (tel: string, email: string) => `Online messages are not switched on yet. Please call ${tel} or email ${email}.`,
  formOffTitle: 'Messages by phone or email for now',
};
type Strings = typeof en;
const es: Strings = {
  homeEyebrow: 'Abogado · Murfreesboro, Tennessee',
  practiceEyebrow: 'Áreas de práctica',
  aboutEyebrow: 'Sobre Will Fraley',
  spanishEyebrow: 'English',
  processEyebrow: 'El proceso',
  expectEyebrow: 'Qué esperar',
  caseTypesEyebrow: 'Tipos de casos',
  newsEyebrow: 'En las noticias',
  findQuestion: 'Ir a un grupo de preguntas',
  lastReviewed: 'Última revisión:',
  willDeskAlt: 'Will Fraley en su escritorio, con una pluma y un bloc de notas',
  willDoorAlt: 'Will Fraley de traje oscuro, de pie junto a una puerta de ladrillo',
  katieAlt: 'Katie Fults',
  cert2019Alt:
    'Certificado de finalización de la Tennessee Association of Criminal Defense Lawyers por la 2019 TACDL Advanced Cross Examination Training, otorgado a Will Fraley y fechado el 20 de septiembre de 2019',
  cert2006Alt:
    'Certificado de la Tennessee Association of Criminal Defense Lawyers otorgado a R. Wilford Fraley, III por completar el 5th Annual Tennessee Criminal Defense College, del 30 de marzo al 1 de abril de 2006',
  formOff: (tel: string, email: string) => `Los mensajes en línea todavía no están activados. Llame al ${tel} o escriba a ${email}.`,
  formOffTitle: 'Por ahora, por teléfono o correo electrónico',
};
export const S = (lang: Lang): Strings => (lang === 'es' ? es : en);
