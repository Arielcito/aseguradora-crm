/* ============================================================
   Screen: Bot de WhatsApp
   ============================================================ */
const { Icon: I_w, Topbar: TB_w, Avatar: Av_w } = window;

const WA_URGENCY = {
  alta: { kind: 'danger', label: 'Urgente' },
  media: { kind: 'warning', label: 'Media' },
  baja: { kind: 'neutral', label: 'Baja' },
};
const WA_STATUS = {
  bot: { kind: 'info', label: 'Atiende el bot' },
  derivado: { kind: 'clay', label: 'Derivado a vos' },
  resuelto: { kind: 'success', label: 'Resuelto' },
};

function WhatsappScreen() {
  const [sel, setSel] = useState('w1');
  const chat = window.WA_CHATS.find(c => c.id === sel);

  // scripted conversation per intent
  const CONVOS = {
    w1: [
      { from: 'them', t: 'Hola! Necesito renovar el seguro del auto antes del 14' },
      { from: 'bot', t: 'Hola Lucía 👋 Veo tu póliza AUT-77321 de La Caja, vence el 14/06. Te preparo la renovación.' },
      { from: 'bot', t: 'La prima renovada queda en $64.500 (ajuste por inflación). ¿Querés que la confirme?' },
      { from: 'them', t: 'Sí, pero quería ver si me conviene cambiar de compañía' },
      { from: 'sys', t: 'Consulta comercial — derivada a Pablo Reyes' },
    ],
    w2: [
      { from: 'them', t: 'Quiero asegurar mi auto 0km' },
      { from: 'bot', t: '¡Felicitaciones por el 0km! Para cotizar necesito 3 datos: marca y modelo, año, y código postal. ¿Me los pasás?' },
      { from: 'them', t: 'Toyota Corolla 2025, CP 5000' },
      { from: 'bot', t: 'Listo. Te armo una pre-cotización en 3 coberturas y te la mando acá mismo en un minuto.' },
    ],
    w3: [
      { from: 'them', t: 'Tuve un choque, ¿qué hago?' },
      { from: 'bot', t: 'Lamento lo ocurrido. ¿Hay personas heridas? Si es una emergencia llamá al 911.' },
      { from: 'them', t: 'No, solo daños materiales' },
      { from: 'bot', t: 'Tranquilo. Sacá fotos del vehículo y del otro auto, y los datos del conductor. Te derivo con tu productor para abrir el siniestro.' },
      { from: 'sys', t: 'Siniestro — derivado URGENTE a Pablo Reyes' },
    ],
    w4: [
      { from: 'them', t: 'Quiero pagar la cuota' },
      { from: 'bot', t: 'Claro. Tu cuota de junio es de $52.900. Te dejo el link de pago seguro 👇' },
      { from: 'bot', t: 'pagos.aseguradora.com/AUT-30156', link: true },
      { from: 'them', t: 'Listo, pagué' },
      { from: 'bot', t: '¡Recibido! Pago acreditado ✅ Te envío el comprobante por mail.' },
    ],
    w5: [
      { from: 'them', t: 'Necesito la póliza en PDF' },
      { from: 'bot', t: 'Te la mando ahora mismo 📄' },
      { from: 'bot', t: 'Poliza_VID-88210.pdf', link: true },
      { from: 'bot', t: '¿Necesitás algo más?' },
    ],
  };
  const msgs = CONVOS[sel] || [];

  return (
    <>
      <TB_w title="Bot de WhatsApp" sub="Atiende consultas 24/7 y deriva según urgencia"
        actions={<button className="btn btn-ghost"><I_w name="settings-2" />Configurar bot</button>} />
      <div className="scroll-area" style={{ padding: 0, display: 'flex', overflow: 'hidden' }}>
        {/* chat list */}
        <div style={{ width: 340, borderRight: '1px solid var(--line)', background: 'var(--surface)', overflowY: 'auto', flex: 'none' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-success"><span className="dot" />Bot en línea</span>
            <span style={{ fontSize: 12, color: 'var(--ink-3)', marginLeft: 'auto' }}>5 conversaciones</span>
          </div>
          {window.WA_CHATS.map(c => {
            const u = WA_URGENCY[c.urgency];
            return (
              <button key={c.id} onClick={() => setSel(c.id)} style={{
                display: 'flex', gap: 12, padding: '13px 18px', width: '100%', textAlign: 'left', border: 'none',
                borderBottom: '1px solid var(--line)', borderLeft: sel === c.id ? '3px solid var(--emerald)' : '3px solid transparent',
                background: sel === c.id ? 'var(--surface-2)' : 'transparent', alignItems: 'center',
              }}>
                <Av_w name={c.name.startsWith('+') ? 'N N' : c.name} size={38} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-3)', marginLeft: 'auto', flex: 'none' }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>{c.last}</div>
                  <div style={{ display: 'flex', gap: 5, marginTop: 6 }}>
                    <span className="badge badge-neutral" style={{ fontSize: 10.5 }}>{c.intent}</span>
                    <span className={`badge badge-${u.kind}`} style={{ fontSize: 10.5 }}>{u.label}</span>
                  </div>
                </div>
                {c.unread > 0 && <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--clay)', color: '#fff', fontSize: 10.5, fontWeight: 700, display: 'grid', placeItems: 'center', flex: 'none' }}>{c.unread}</span>}
              </button>
            );
          })}
        </div>

        {/* conversation */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--paper-2)' }}>
          <div style={{ padding: '13px 22px', borderBottom: '1px solid var(--line)', background: 'var(--surface)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Av_w name={chat.name.startsWith('+') ? 'N N' : chat.name} size={36} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{chat.name}</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>Intención detectada: <b style={{ color: 'var(--ink-2)' }}>{chat.intent}</b></div>
            </div>
            <span className={`badge badge-${WA_STATUS[chat.status].kind}`} style={{ marginLeft: 'auto' }}>{WA_STATUS[chat.status].label}</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '22px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.map((m, i) => {
              if (m.from === 'sys') return (
                <div key={i} style={{ alignSelf: 'center', background: 'var(--clay-100)', color: 'var(--clay-deep)', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 999, margin: '6px 0', display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                  <I_w name="git-branch" size={13} />{m.t}
                </div>
              );
              const mine = m.from === 'bot';
              return (
                <div key={i} style={{ alignSelf: mine ? 'flex-end' : 'flex-start', maxWidth: '72%' }}>
                  {mine && <div style={{ fontSize: 10.5, color: 'var(--ink-3)', textAlign: 'right', marginBottom: 3, fontWeight: 600 }}>BOT</div>}
                  <div style={{
                    background: mine ? 'var(--emerald)' : 'var(--surface)', color: mine ? '#fff' : 'var(--ink)',
                    padding: '9px 13px', borderRadius: mine ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    fontSize: 13.5, lineHeight: 1.45, boxShadow: 'var(--sh-xs)', border: mine ? 'none' : '1px solid var(--line)',
                    textDecoration: m.link ? 'underline' : 'none', wordBreak: 'break-word',
                  }}>{m.t}</div>
                </div>
              );
            })}
          </div>

          <div style={{ padding: '14px 22px', borderTop: '1px solid var(--line)', background: 'var(--surface)', display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ flex: 1, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 999, padding: '10px 16px', fontSize: 13.5, color: 'var(--ink-3)' }}>Escribí para intervenir manualmente…</div>
            <button className="btn btn-primary btn-icon" style={{ borderRadius: '50%', width: 40, height: 40 }}><I_w name="send" /></button>
          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { WhatsappScreen });
