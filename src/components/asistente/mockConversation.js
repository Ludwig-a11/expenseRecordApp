const INITIAL_MESSAGES = [
  {
    id: 'm1',
    role: 'user',
    text: '¿Puedo gastar $60 en una cena hoy sin pasarme?',
  },
  {
    id: 'm2',
    role: 'assistant',
    text: 'Ajustado pero posible. Te quedan $259.50 y 12 días de mes (~$21.60/día). Si gastas $60 hoy, tu margen diario baja a $16.60. Sugerencia: compensa recortando Diversión esta semana (llevas $114.50).',
    quickReplies: [
      { label: 'Registrar cena $60', action: 'register-dinner' },
      { label: 'Ver plan del mes', action: 'view-plan' },
    ],
  },
  {
    id: 'm3',
    role: 'user',
    text: '¿Cómo voy comparado con julio?',
  },
  {
    id: 'm4',
    role: 'assistant',
    text: 'Vas 6% arriba del ritmo de julio. Comida subió 18%; Transporte bajó 11%. Tu día más caro fue el 15 ($119.25).',
  },
];

const PREVIEW_REPLY = 'Estoy en modo vista previa — pronto podré responder preguntas como esta usando tus datos reales.';

const SUGGESTIONS = ['¿cómo voy este mes?', 'resumen semanal', 'café 3.50'];

export { INITIAL_MESSAGES, PREVIEW_REPLY, SUGGESTIONS };
