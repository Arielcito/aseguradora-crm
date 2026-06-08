/* ============================================================
   Screen: Seguimiento automático (automatizaciones)
   ============================================================ */
const { Icon: I_a, Topbar: TB_a, SectionHead: SH_a } = window;

function Toggle({ on, onChange }) {
  return (
    <button onClick={(e) => { e.stopPropagation(); onChange(!on); }}
      style={{
        width: 40, height: 23, borderRadius: 999, border: 'none', padding: 2,
        background: on ? 'var(--emerald)' : 'var(--line-2)', transition: 'background 180ms var(--ease)',
        display: 'inline-flex', justifyContent: on ? 'flex-end' : 'flex-start', alignItems: 'center', flex: 'none',
      }}>
      <span style={{ width: 19, height: 19, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.2)', transition: 'all 180ms var(--ease)' }} />
    </button>
  );
}

function AutomationsScreen() {
  const [autos, setAutos] = useState(window.AUTOMATIONS);
  const set = (id, v) => setAutos(a => a.map(x => x.id === id ? { ...x, active: v } : x));
  const activeN = autos.filter(a => a.active).length;
  const enCola = autos.reduce((s, a) => s + a.enColas, 0);
  const ejecutadas = autos.reduce((s, a) => s + a.ejecutadas, 0);

  const COLOR = {
    warning: ['var(--warning-100)', 'var(--warning)'], emerald: ['var(--emerald-100)', 'var(--emerald-deep)'],
    clay: ['var(--clay-100)', 'var(--clay-deep)'], danger: ['var(--danger-100)', 'var(--danger)'], info: ['var(--info-100)', 'var(--info)'],
  };

  // próximos envíos (cola)
  const queue = [
    { who: 'Lucía Fernández', what: 'Vencimiento de póliza', when: 'Hoy 14:00', ramo: 'auto', color: 'warning' },
    { who: 'Diego Sosa', what: 'Saludo de cumpleaños', when: 'Mañana 09:00', ramo: 'auto', color: 'clay' },
    { who: 'Sofía Medina', what: 'Falta de pago (2° aviso)', when: 'Mañana 10:00', ramo: 'auto', color: 'danger' },
    { who: 'Agropecuaria La Verde SA', what: 'Recordatorio de documentación', when: 'Mié 11:30', ramo: 'comercio', color: 'warning' },
    { who: 'Valentina Ríos', what: 'Re-contacto cliente inactivo', when: 'Jue 16:00', ramo: 'auto', color: 'info' },
  ];

  return (
    <>
      <TB_a title="Seguimiento automático" sub="Automatizaciones que trabajan tu cartera sin que muevas un dedo"
        actions={<button className="btn btn-primary"><I_a name="plus" />Nueva automatización</button>} />
      <div className="scroll-area">
        <div className="page-pad screen">

          <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 24 }}>
            <window.Kpi label="Automatizaciones activas" value={`${activeN} / ${autos.length}`} icon="zap" iconBg="var(--emerald-100)" iconFg="var(--emerald-deep)" foot="trabajando ahora" />
            <window.Kpi label="En cola para enviar" value={enCola} icon="send" iconBg="var(--clay-100)" iconFg="var(--clay-deep)" foot="próximos 7 días" />
            <window.Kpi label="Ejecutadas (90 d)" value={ejecutadas} icon="check-check" iconBg="var(--info-100)" iconFg="var(--info)" delta={18} foot="mensajes enviados" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
            <div>
              <SH_a title="Reglas de automatización" sub="Activá o pausá cada flujo. Cada uno se dispara solo." />
              <div className="stack" style={{ gap: 12 }}>
                {autos.map(a => {
                  const [bg, fg] = COLOR[a.color];
                  return (
                    <div key={a.id} className="card card-pad" style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: a.active ? 1 : 0.72 }}>
                      <span className="ic-chip" style={{ width: 42, height: 42, borderRadius: 11, background: bg, color: fg }}><I_a name={a.icon} size={20} /></span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                          <span style={{ fontWeight: 600, fontSize: 14.5, fontFamily: 'var(--font-display)' }}>{a.name}</span>
                          {a.active ? <span className="badge badge-success"><span className="dot" />Activa</span> : <span className="badge badge-neutral">Pausada</span>}
                        </div>
                        <p style={{ margin: '4px 0 8px', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.4 }}>{a.desc}</p>
                        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--ink-3)' }}>
                          <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}><I_a name="clock" size={13} />{a.trigger}</span>
                          <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}><I_a name="radio" size={13} />{a.channel}</span>
                          {a.enColas > 0 && <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}><I_a name="users" size={13} />{a.enColas} en cola</span>}
                        </div>
                      </div>
                      <Toggle on={a.active} onChange={(v) => set(a.id, v)} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <SH_a title="Próximos envíos" sub="Cola en vivo" />
              <div className="card">
                <div style={{ padding: '6px 0' }}>
                  {queue.map((q, i) => {
                    const [bg, fg] = COLOR[q.color];
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderBottom: i < queue.length - 1 ? '1px solid var(--line)' : 'none' }}>
                        <span className="ic-chip" style={{ width: 30, height: 30, background: bg, color: fg }}><I_a name={window.RAMOS[q.ramo].icon} size={15} /></span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{q.who}</div>
                          <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{q.what}</div>
                        </div>
                        <span style={{ fontSize: 11.5, color: 'var(--ink-3)', fontWeight: 600, whiteSpace: 'nowrap' }}>{q.when}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="card card-pad" style={{ marginTop: 16, background: 'var(--emerald-100)', border: '1px solid var(--emerald-200)' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <I_a name="sparkles" size={18} style={{ color: 'var(--emerald-deep)', marginTop: 2 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--emerald-deep)' }}>Sugerencia</div>
                    <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'var(--emerald-deep)', lineHeight: 1.45 }}>Activá <b>Nuevos productos</b>: 47 clientes con solo auto son candidatos a hogar.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

Object.assign(window, { AutomationsScreen, Toggle });
