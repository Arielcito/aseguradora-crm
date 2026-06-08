/* ============================================================
   Mock data — Aseguradora CRM (contexto Argentina)
   ============================================================ */

// helper: iniciales + color de avatar consistente
const AV_COLORS = [
  ['var(--emerald-100)', 'var(--emerald-deep)'],
  ['var(--clay-100)', 'var(--clay-deep)'],
  ['var(--info-100)', 'var(--info)'],
  ['var(--warning-100)', 'var(--warning)'],
  ['var(--success-100)', 'var(--success)'],
];
function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}
function avColor(seed) {
  let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return AV_COLORS[Math.abs(h) % AV_COLORS.length];
}

const RAMOS = {
  auto:     { label: 'Automotor', icon: 'car' },
  hogar:    { label: 'Hogar', icon: 'house' },
  comercio: { label: 'Comercio', icon: 'store' },
  art:      { label: 'ART', icon: 'hard-hat' },
  caucion:  { label: 'Caución', icon: 'file-signature' },
  vida:     { label: 'Vida', icon: 'heart-pulse' },
  retiro:   { label: 'Retiro', icon: 'piggy-bank' },
};

const ASEGURADORAS = ['Sancor Seguros', 'La Caja', 'Federación Patronal', 'San Cristóbal', 'Zurich', 'Mercantil Andina', 'Allianz', 'Provincia Seguros'];

// ---- Clientes ----
const CLIENTS = [
  {
    id: 'c1', name: 'Martín Quiroga', type: 'Persona física', dni: '28.345.112',
    email: 'martin.quiroga@gmail.com', phone: '+54 9 351 244-8190', city: 'Córdoba',
    status: 'activo', since: '2019', score: 92, ltv: 1840000,
    policies: [
      { ramo: 'auto', aseg: 'Sancor Seguros', nro: 'AUT-44120', prima: 48200, venc: '2026-06-21', estado: 'vigente' },
      { ramo: 'hogar', aseg: 'Sancor Seguros', nro: 'HOG-10883', prima: 21500, venc: '2026-09-02', estado: 'vigente' },
    ],
    opps: [{ ramo: 'vida', etapa: 'Propuesta enviada', valor: 36000 }],
    tags: ['Multi-producto', 'Pago al día'],
  },
  {
    id: 'c2', name: 'Lucía Fernández', type: 'Persona física', dni: '33.901.450',
    email: 'lu.fernandez@outlook.com', phone: '+54 9 11 5567-2204', city: 'CABA',
    status: 'activo', since: '2021', score: 78, ltv: 690000,
    policies: [
      { ramo: 'auto', aseg: 'La Caja', nro: 'AUT-77321', prima: 61300, venc: '2026-06-14', estado: 'por-vencer' },
    ],
    opps: [{ ramo: 'hogar', etapa: 'Cotización pedida', valor: 19800 }],
    tags: ['Renovación próxima'],
  },
  {
    id: 'c3', name: 'Distribuidora del Sur SRL', type: 'Persona jurídica', dni: '30-71184502-3',
    email: 'admin@delsur.com.ar', phone: '+54 9 341 410-7765', city: 'Rosario',
    status: 'activo', since: '2018', score: 88, ltv: 4250000,
    policies: [
      { ramo: 'art', aseg: 'Federación Patronal', nro: 'ART-22019', prima: 312000, venc: '2026-07-31', estado: 'vigente' },
      { ramo: 'comercio', aseg: 'Federación Patronal', nro: 'INT-55012', prima: 184000, venc: '2026-06-18', estado: 'por-vencer' },
      { ramo: 'caucion', aseg: 'San Cristóbal', nro: 'CAU-09921', prima: 95000, venc: '2026-11-10', estado: 'vigente' },
    ],
    opps: [{ ramo: 'caucion', etapa: 'Negociación', valor: 142000 }],
    tags: ['Cuenta clave', 'Multi-producto'],
  },
  {
    id: 'c4', name: 'Sofía Medina', type: 'Persona física', dni: '36.220.781',
    email: 'sofiamedina@gmail.com', phone: '+54 9 261 533-1188', city: 'Mendoza',
    status: 'moroso', since: '2022', score: 54, ltv: 240000,
    policies: [
      { ramo: 'auto', aseg: 'Mercantil Andina', nro: 'AUT-30156', prima: 52900, venc: '2026-08-09', estado: 'falta-pago' },
    ],
    opps: [],
    tags: ['Cuota vencida'],
  },
  {
    id: 'c5', name: 'Tomás Ibáñez', type: 'Persona física', dni: '25.118.090',
    email: 'tomas.ibanez@yahoo.com.ar', phone: '+54 9 11 6041-9923', city: 'CABA',
    status: 'activo', since: '2017', score: 95, ltv: 2980000,
    policies: [
      { ramo: 'vida', aseg: 'Zurich', nro: 'VID-88210', prima: 74000, venc: '2026-12-01', estado: 'vigente' },
      { ramo: 'retiro', aseg: 'Zurich', nro: 'RET-12044', prima: 120000, venc: '2027-01-15', estado: 'vigente' },
      { ramo: 'auto', aseg: 'Allianz', nro: 'AUT-91002', prima: 88500, venc: '2026-06-26', estado: 'por-vencer' },
    ],
    opps: [{ ramo: 'hogar', etapa: 'Propuesta enviada', valor: 41000 }],
    tags: ['Cuenta clave', 'Multi-producto', 'Referidor'],
  },
  {
    id: 'c6', name: 'Valentina Ríos', type: 'Persona física', dni: '39.554.013',
    email: 'valen.rios@gmail.com', phone: '+54 9 381 277-6650', city: 'Tucumán',
    status: 'inactivo', since: '2020', score: 41, ltv: 180000,
    policies: [],
    opps: [{ ramo: 'auto', etapa: 'Re-contacto', valor: 55000 }],
    tags: ['Sin pólizas activas', 'Inactivo 8 meses'],
  },
  {
    id: 'c7', name: 'Agropecuaria La Verde SA', type: 'Persona jurídica', dni: '30-69920114-7',
    email: 'seguros@laverde.agro', phone: '+54 9 3492 41-2200', city: 'Rafaela',
    status: 'activo', since: '2016', score: 90, ltv: 6100000,
    policies: [
      { ramo: 'art', aseg: 'Sancor Seguros', nro: 'ART-11003', prima: 540000, venc: '2026-10-01', estado: 'vigente' },
      { ramo: 'comercio', aseg: 'Sancor Seguros', nro: 'INT-77810', prima: 220000, venc: '2026-06-30', estado: 'por-vencer' },
    ],
    opps: [{ ramo: 'caucion', etapa: 'Cotización pedida', valor: 310000 }],
    tags: ['Cuenta clave'],
  },
  {
    id: 'c8', name: 'Diego Sosa', type: 'Persona física', dni: '31.770.642',
    email: 'diegososa88@gmail.com', phone: '+54 9 299 612-3341', city: 'Neuquén',
    status: 'activo', since: '2023', score: 70, ltv: 320000,
    policies: [
      { ramo: 'auto', aseg: 'San Cristóbal', nro: 'AUT-66721', prima: 57400, venc: '2026-06-12', estado: 'por-vencer' },
    ],
    opps: [],
    tags: ['Cumple este mes'],
  },
];

// pólizas por vencer (derivado, ordenado por fecha)
function policiesExpiring() {
  const rows = [];
  CLIENTS.forEach(c => c.policies.forEach(p => {
    rows.push({ ...p, client: c.name, clientId: c.id, clientType: c.type });
  }));
  return rows
    .filter(p => p.estado === 'por-vencer' || p.estado === 'falta-pago')
    .sort((a, b) => a.venc.localeCompare(b.venc));
}

// ---- Automatizaciones ----
const AUTOMATIONS = [
  { id: 'a1', name: 'Vencimiento de póliza', desc: 'Aviso al cliente y al productor 30 / 15 / 5 días antes del vencimiento.', icon: 'calendar-clock', color: 'warning', active: true, trigger: '30 días antes', channel: 'WhatsApp + Email', enColas: 14, ejecutadas: 312 },
  { id: 'a2', name: 'Renovación automática', desc: 'Genera propuesta de renovación y la envía para confirmación con un toque.', icon: 'refresh-cw', color: 'emerald', active: true, trigger: '10 días antes', channel: 'WhatsApp', enColas: 9, ejecutadas: 188 },
  { id: 'a3', name: 'Saludo de cumpleaños', desc: 'Mensaje personalizado el día del cumpleaños del cliente.', icon: 'cake', color: 'clay', active: true, trigger: 'Día del cumpleaños', channel: 'WhatsApp', enColas: 3, ejecutadas: 96 },
  { id: 'a4', name: 'Falta de pago', desc: 'Recordatorio escalonado ante cuota impaga, con link de pago.', icon: 'circle-alert', color: 'danger', active: true, trigger: 'Cuota vencida +2 días', channel: 'WhatsApp + SMS', enColas: 5, ejecutadas: 73 },
  { id: 'a5', name: 'Nuevos productos', desc: 'Detecta perfil y propone cross-sell relevante (ej: tenés auto → hogar).', icon: 'sparkles', color: 'info', active: false, trigger: 'Mensual / por perfil', channel: 'Email', enColas: 0, ejecutadas: 41 },
  { id: 'a6', name: 'Clientes inactivos', desc: 'Re-contacto automático a clientes sin movimientos hace +6 meses.', icon: 'user-round-x', color: 'info', active: true, trigger: 'Sin actividad 6 meses', channel: 'WhatsApp', enColas: 7, ejecutadas: 54 },
  { id: 'a7', name: 'Recordatorio de documentación', desc: 'Solicita papeles faltantes para emitir o renovar (DNI, cédula, etc.).', icon: 'file-text', color: 'warning', active: true, trigger: 'Doc. pendiente', channel: 'WhatsApp', enColas: 11, ejecutadas: 129 },
];

// ---- Cotizador: ramos ----
const COTIZA_RAMOS = [
  { key: 'auto', label: 'Automotor', icon: 'car', desc: 'Patente, marca y uso', popular: true },
  { key: 'hogar', label: 'Hogar', icon: 'house', desc: 'Vivienda y contenido', popular: true },
  { key: 'comercio', label: 'Comercio', icon: 'store', desc: 'Local y mercadería' },
  { key: 'art', label: 'ART', icon: 'hard-hat', desc: 'Riesgos del trabajo' },
  { key: 'caucion', label: 'Caución', icon: 'file-signature', desc: 'Garantías y fianzas' },
  { key: 'vida', label: 'Vida', icon: 'heart-pulse', desc: 'Individual y colectivo' },
  { key: 'retiro', label: 'Retiro', icon: 'piggy-bank', desc: 'Ahorro y previsión' },
];

// cotizaciones pendientes
const COTIZACIONES = [
  { id: 'q1', client: 'Lucía Fernández', ramo: 'hogar', estado: 'pre-cotizado', fecha: 'Hace 2 h', monto: 19800, origen: 'Bot WhatsApp' },
  { id: 'q2', client: 'Prospecto — Carlos M.', ramo: 'auto', estado: 'derivado', fecha: 'Hace 5 h', monto: 64500, origen: 'Formulario web' },
  { id: 'q3', client: 'Agropecuaria La Verde SA', ramo: 'caucion', estado: 'en-revision', fecha: 'Ayer', monto: 310000, origen: 'Productor' },
  { id: 'q4', client: 'Prospecto — Romina T.', ramo: 'vida', estado: 'pre-cotizado', fecha: 'Ayer', monto: 38000, origen: 'Bot WhatsApp' },
  { id: 'q5', client: 'Tomás Ibáñez', ramo: 'hogar', estado: 'derivado', fecha: 'Hace 2 días', monto: 41000, origen: 'Productor' },
];

// ---- Bot WhatsApp: conversaciones ----
const WA_CHATS = [
  { id: 'w1', name: 'Lucía Fernández', intent: 'Renovar', urgency: 'alta', last: 'Necesito renovar el auto antes del 14', time: '10:42', unread: 2, status: 'derivado' },
  { id: 'w2', name: '+54 9 11 4490-2231', intent: 'Cotizar auto', urgency: 'media', last: 'Quiero asegurar mi auto 0km', time: '10:31', unread: 1, status: 'bot' },
  { id: 'w3', name: 'Diego Sosa', intent: 'Siniestro', urgency: 'alta', last: 'Tuve un choque, ¿qué hago?', time: '09:58', unread: 0, status: 'derivado' },
  { id: 'w4', name: 'Sofía Medina', intent: 'Pagar', urgency: 'media', last: 'Quiero pagar la cuota', time: '09:20', unread: 0, status: 'resuelto' },
  { id: 'w5', name: '+54 9 351 700-1122', intent: 'Pedir póliza', urgency: 'baja', last: 'Necesito la póliza en PDF', time: 'Ayer', unread: 0, status: 'resuelto' },
];

// ---- Fidelización: campañas ----
const CAMPAIGNS = [
  { id: 'f1', name: 'Post-venta nueva póliza', type: 'Post-venta', icon: 'package-check', active: true, audiencia: 'Altas últimos 7 días', enviados: 142, apertura: 71, color: 'emerald' },
  { id: 'f2', name: 'Felicitación de renovación', type: 'Renovación', icon: 'party-popper', active: true, audiencia: 'Renovaron este mes', enviados: 88, apertura: 64, color: 'clay' },
  { id: 'f3', name: 'Campaña educativa: ¿Qué cubre tu ART?', type: 'Educativa', icon: 'graduation-cap', active: true, audiencia: 'Clientes con ART', enviados: 54, apertura: 58, color: 'info' },
  { id: 'f4', name: 'Beneficios del mes', type: 'Beneficios', icon: 'gift', active: false, audiencia: 'Todos los activos', enviados: 0, apertura: 0, color: 'warning' },
  { id: 'f5', name: 'Check-in trimestral', type: 'Check-in', icon: 'calendar-check', active: true, audiencia: 'Cuentas clave', enviados: 31, apertura: 82, color: 'emerald' },
  { id: 'f6', name: 'Cross-sell: tenés auto → cotizá hogar', type: 'Cross-sell', icon: 'arrow-left-right', active: true, audiencia: 'Solo auto, sin hogar', enviados: 96, apertura: 47, color: 'clay' },
];

// money fmt
function money(n, opts = {}) {
  const v = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(n);
  return (opts.bare ? '' : '$') + v;
}
function moneyShort(n) {
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(n >= 1e7 ? 0 : 1) + 'M';
  if (n >= 1e3) return '$' + Math.round(n / 1e3) + 'k';
  return '$' + n;
}
// fecha venc -> días restantes
function daysTo(dateStr) {
  const today = new Date('2026-06-08');
  const d = new Date(dateStr);
  return Math.round((d - today) / 86400000);
}
function fmtDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' });
}

Object.assign(window, {
  RAMOS, ASEGURADORAS, CLIENTS, AUTOMATIONS, COTIZA_RAMOS, COTIZACIONES,
  WA_CHATS, CAMPAIGNS, policiesExpiring,
  initials, avColor, money, moneyShort, daysTo, fmtDate,
});
