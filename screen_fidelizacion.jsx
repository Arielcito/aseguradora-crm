/* ============================================================
   Screen: Fidelización
   ============================================================ */
const { Icon: I_f, Topbar: TB_f, SectionHead: SH_f } = window;

function FidelizacionScreen() {
  const [camps, setCamps] = useState(window.CAMPAIGNS);
  const set = (id, v) => setCamps(c => c.map(x => x.id === id ? { ...x, active: v } : x));
  const COLOR = {
    emerald: ['var(--emerald-100)', 'var(--emerald-deep)'], clay: ['var(--clay-100)', 'var(--clay-deep)'],
    info: ['var(--info-100)', 'var(--info)'], warning: ['var(--warning-100)', 'var(--warning)'],
  };
  const enviados = camps.reduce((s, c) => s + c.enviados, 0);

  return (
    <>
      <TB_f title="Fidelización" sub="Mensajes y campañas que mantienen viva la relación con el cliente"
        actions={<button className="btn btn-primary"><I_f name="plus" />Nueva campaña</button>} />
      <div className="scroll-area">
        <div className="page-pad screen">

          <div className="kpi-grid" style={{ marginBottom: 24 }}>
            <window.Kpi label="Campañas activas" value="5" icon="heart-handshake" iconBg="var(--emerald-100)" iconFg="var(--emerald-deep)" foot="de 6 configuradas" />
            <window.Kpi label="Mensajes enviados (mes)" value={enviados} icon="send" iconBg="var(--clay-100)" iconFg="var(--clay-deep)" delta={22} foot="vs. mes anterior" />
            <window.Kpi label="Tasa de apertura" value="63%" icon="mail-open" iconBg="var(--info-100)" iconFg="var(--info)" delta={4} foot="promedio de campañas" />
            <window.Kpi label="Cross-sell potencial" value="47" icon="arrow-left-right" iconBg="var(--warning-100)" iconFg="var(--warning)" foot="clientes mono-producto" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>

            <div>
              <SH_f title="Campañas de relación" sub="Se disparan en el momento justo del ciclo de vida del cliente" />
              <div className="grid-2" style={{ gap: 14 }}>
                {camps.map(c => {
                  const [bg, fg] = COLOR[c.color];
                  return (
                    <div key={c.id} className="card card-pad" style={{ opacity: c.active ? 1 : 0.7, display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <span className="ic-chip" style={{ width: 40, height: 40, borderRadius: 11, background: bg, color: fg }}><I_f name={c.icon} size={20} /></span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span className="badge badge-neutral" style={{ fontSize: 10.5, marginBottom: 5 }}>{c.type}</span>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 14.5, fontWeight: 600, lineHeight: 1.25 }}>{c.name}</div>
                        </div>
                        <window.Toggle on={c.active} onChange={(v) => set(c.id, v)} />
                      </div>
                      <div style={{ fontSize: 12.5, color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <I_f name="users" size={13} />{c.audiencia}
                      </div>
                      <div style={{ borderTop: '1px solid var(--line)', paddingTop: 11, display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>ENVIADOS</div>
                          <div className="tnum" style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600 }}>{c.enviados}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>APERTURA</div>
                          <div className="tnum" style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: c.apertura >= 60 ? 'var(--success)' : 'var(--ink)' }}>{c.apertura ? c.apertura + '%' : '—'}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <SH_f title="Cross-sell sugerido" sub="Próximas oportunidades automáticas" />
              <div className="card" style={{ marginBottom: 20 }}>
                <div className="card-head" style={{ background: 'var(--clay-100)' }}>
                  <I_f name="arrow-left-right" size={18} style={{ color: 'var(--clay-deep)' }} />
                  <h3 style={{ color: 'var(--clay-deep)' }}>Tenés auto, ¿querés hogar?</h3>
                </div>
                <div style={{ padding: '6px 0' }}>
                  {window.CLIENTS.filter(c => c.policies.some(p => p.ramo === 'auto') && !c.policies.some(p => p.ramo === 'hogar') && c.status === 'activo').slice(0, 4).map(c => (
                    <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 18px' }}>
                      <window.Avatar name={c.name} size={32} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                        <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>Cliente desde {c.since} · {c.city}</div>
                      </div>
                      <button className="btn btn-ghost btn-sm">Enviar oferta</button>
                    </div>
                  ))}
                </div>
              </div>

              <SH_f title="Mensaje de muestra" />
              <div className="card card-pad">
                <div style={{ display: 'flex', gap: 9, alignItems: 'center', marginBottom: 12 }}>
                  <span className="ic-chip" style={{ width: 30, height: 30, background: 'var(--emerald-100)', color: 'var(--emerald-deep)' }}><I_f name="message-circle" size={16} /></span>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>Check-in trimestral · WhatsApp</div>
                </div>
                <div style={{ background: 'var(--emerald)', color: '#fff', padding: '11px 14px', borderRadius: '14px 14px 14px 4px', fontSize: 13.5, lineHeight: 1.5 }}>
                  Hola Martín 👋 Pasaron tres meses desde que renovaste tu cobertura. ¿Está todo bien con tu auto y tu hogar? Si necesitás algo, estoy a un mensaje.
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
                  <I_f name="info" size={13} />Se personaliza con nombre, productos y fecha de renovación.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { FidelizacionScreen });
