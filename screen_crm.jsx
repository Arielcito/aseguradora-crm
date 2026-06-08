/* ============================================================
   Screen: CRM — clientes y pólizas (lista + detalle)
   ============================================================ */
const { Icon: I_c, Avatar: Av_c, Topbar: TB_c, RamoTag: RT_c,
        STATUS_BADGE: SB_c, POL_BADGE: PB_c } = window;

function ClientStatus({ status }) {
  const s = SB_c[status];
  return <span className={`badge badge-${s.kind}`}><span className="dot" />{s.label}</span>;
}

/* ---------- LIST ---------- */
function CrmListScreen({ onOpenClient }) {
  const [filter, setFilter] = useState('todos');
  const [stage, setStage] = useState('todas');
  const filters = [
    { id: 'todos', label: 'Todos' },
    { id: 'activo', label: 'Activos' },
    { id: 'moroso', label: 'Morosos' },
    { id: 'inactivo', label: 'Inactivos' },
  ];
  const list = window.CLIENTS.filter(c => filter === 'todos' || c.status === filter);
  const opps = window.opportunities().filter(o => stage === 'todas' || o.etapa === stage);

  return (
    <>
      <TB_c title="Clientes y pólizas" sub="312 clientes en cartera · 540 pólizas activas"
        actions={<button className="btn btn-primary"><I_c name="user-plus" />Nuevo cliente</button>} />
      <div className="scroll-area">
        <div className="page-pad screen">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div className="seg">
              {filters.map(f => (
                <button key={f.id} className={filter === f.id ? 'active' : ''} onClick={() => setFilter(f.id)}>{f.label}</button>
              ))}
            </div>
            <div style={{ flex: 1 }} />
            <button className="btn btn-ghost btn-sm"><I_c name="sliders-horizontal" />Filtros</button>
            <button className="btn btn-ghost btn-sm"><I_c name="download" />Exportar</button>
          </div>

          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>Cliente</th><th>Estado</th><th>Pólizas</th><th>Aseguradoras</th>
                  <th>Próx. venc.</th><th className="t-right">Valor cartera</th><th></th>
                </tr>
              </thead>
              <tbody>
                {list.map(c => {
                  const nextVenc = c.policies.slice().sort((a, b) => a.venc.localeCompare(b.venc))[0];
                  const asegs = [...new Set(c.policies.map(p => p.aseg))];
                  return (
                    <tr key={c.id} onClick={() => onOpenClient(c.id)}>
                      <td>
                        <div className="cell-user">
                          <Av_c name={c.name} />
                          <div className="nm">
                            <div className="t-strong">{c.name}</div>
                            <div className="n2">{c.type} · {c.city}</div>
                          </div>
                        </div>
                      </td>
                      <td><ClientStatus status={c.status} /></td>
                      <td>
                        <div style={{ display: 'flex', gap: 5 }}>
                          {c.policies.length === 0
                            ? <span style={{ color: 'var(--ink-3)', fontSize: 13 }}>—</span>
                            : c.policies.slice(0, 3).map((p, i) => (
                              <span key={i} className="ic-chip" title={window.RAMOS[p.ramo].label} style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--paper-2)', color: 'var(--ink-2)' }}>
                                <I_c name={window.RAMOS[p.ramo].icon} size={14} />
                              </span>
                            ))}
                          {c.policies.length > 3 && <span style={{ fontSize: 12, color: 'var(--ink-3)', alignSelf: 'center' }}>+{c.policies.length - 3}</span>}
                        </div>
                      </td>
                      <td style={{ fontSize: 12.5 }}>{asegs.length ? asegs.join(', ') : '—'}</td>
                      <td>{nextVenc ? <span className="tnum">{window.fmtDate(nextVenc.venc)}</span> : <span style={{ color: 'var(--ink-3)' }}>—</span>}</td>
                      <td className="t-right tnum t-strong">{window.money(c.ltv)}</td>
                      <td className="t-right"><I_c name="chevron-right" size={17} style={{ color: 'var(--ink-3)' }} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pipeline comercial — oportunidades con estado y criterio explícito */}
          <div style={{ marginTop: 28 }}>
            <div className="sec-head">
              <div>
                <h2>Pipeline comercial</h2>
                <div className="sec-sub">Oportunidades por etapa. Cada una muestra el criterio por el que se clasifica como oportunidad.</div>
              </div>
              <div className="seg">
                {[['todas', 'Todas'], ...window.PIPELINE.map(s => [s.key, s.label])].map(([id, l]) => (
                  <button key={id} className={stage === id ? 'active' : ''} onClick={() => setStage(id)}>{l}</button>
                ))}
              </div>
            </div>
            <div className="card">
              <table className="table">
                <thead><tr><th>Cliente</th><th>Ramo</th><th>Etapa</th><th>Criterio</th><th className="t-right">Valor estimado</th><th></th></tr></thead>
                <tbody>
                  {opps.length === 0
                    ? <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--ink-3)', padding: 28 }}>Sin oportunidades en esta etapa.</td></tr>
                    : opps.map((o, i) => (
                      <tr key={i} onClick={() => onOpenClient(o.clientId)}>
                        <td><div className="cell-user"><Av_c name={o.client} size={28} /><div className="nm"><div className="t-strong">{o.client}</div></div></div></td>
                        <td><RT_c ramo={o.ramo} /></td>
                        <td><window.PipelineBadge etapa={o.etapa} /></td>
                        <td style={{ fontSize: 12.5, maxWidth: 300 }}>{o.motivo}</td>
                        <td className="t-right tnum t-strong">{window.money(o.valor)}</td>
                        <td className="t-right"><I_c name="chevron-right" size={17} style={{ color: 'var(--ink-3)' }} /></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- DETAIL ---------- */
function CrmDetailScreen({ clientId, onBack }) {
  const c = window.CLIENTS.find(x => x.id === clientId) || window.CLIENTS[0];
  const [tab, setTab] = useState('resumen');
  const totalPrima = c.policies.reduce((s, p) => s + p.prima, 0);

  const history = [
    { kind: 'is-emerald', meta: 'Hoy · 09:14', title: 'Renovación enviada', body: `Propuesta de renovación de ${c.policies[0]?.aseg || 'la póliza'} enviada por WhatsApp.` },
    { kind: 'is-clay', meta: 'Hace 3 días', title: 'Llamada de seguimiento', body: 'Consultó por cobertura de granizo. Interesado en sumar producto.' },
    { kind: '', meta: 'Hace 2 semanas', title: 'Pago registrado', body: 'Cuota de junio acreditada por débito automático.' },
    { kind: 'is-warning', meta: 'Hace 1 mes', title: 'Documentación solicitada', body: 'Se pidió cédula verde actualizada. Recibida.' },
  ];

  return (
    <>
      <TB_c title="Ficha de cliente" sub="Clientes y pólizas"
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" onClick={onBack}><I_c name="arrow-left" />Volver</button>
            <button className="btn btn-primary"><I_c name="message-circle" />Contactar</button>
          </div>
        } />
      <div className="scroll-area">
        <div className="page-pad screen" style={{ maxWidth: 1120 }}>

          {/* header card */}
          <div className="card card-pad" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 20 }}>
            <Av_c name={c.name} size={64} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>{c.name}</h2>
                <ClientStatus status={c.status} />
              </div>
              <div style={{ display: 'flex', gap: 18, marginTop: 8, color: 'var(--ink-2)', fontSize: 13, flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><I_c name="badge-check" size={15} style={{ color: 'var(--ink-3)' }} />{c.type}</span>
                <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><I_c name="hash" size={15} style={{ color: 'var(--ink-3)' }} />{c.dni}</span>
                <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><I_c name="map-pin" size={15} style={{ color: 'var(--ink-3)' }} />{c.city}</span>
                <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><I_c name="calendar" size={15} style={{ color: 'var(--ink-3)' }} />Cliente desde {c.since}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right', borderLeft: '1px solid var(--line)', paddingLeft: 24 }}>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>Valor de cartera</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 2 }}>{window.money(c.ltv)}</div>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginTop: 8 }}>
                {c.tags.slice(0, 2).map((t, i) => <span key={i} className="badge badge-neutral">{t}</span>)}
              </div>
            </div>
          </div>

          {/* tabs */}
          <div className="seg" style={{ marginBottom: 18 }}>
            {[['resumen', 'Resumen'], ['polizas', `Pólizas (${c.policies.length})`], ['historial', 'Historial'], ['oportunidades', `Oportunidades (${c.opps.length})`]].map(([id, l]) => (
              <button key={id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>{l}</button>
            ))}
          </div>

          {tab === 'resumen' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
              <div className="card">
                <div className="card-head"><I_c name="shield-check" size={18} style={{ color: 'var(--emerald)' }} /><h3>Pólizas activas</h3><span className="card-sub" style={{ marginLeft: 'auto' }}>Prima anual {window.money(totalPrima)}</span></div>
                {c.policies.length === 0
                  ? <div style={{ padding: 32, textAlign: 'center', color: 'var(--ink-3)', fontSize: 13.5 }}>Sin pólizas activas. Cliente candidato a reactivación.</div>
                  : <PolicyList policies={c.policies} />}
              </div>
              <div className="stack" style={{ gap: 20 }}>
                <div className="card card-pad">
                  <div className="card-sub" style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, marginBottom: 6 }}>Salud del cliente</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600 }}>{c.score}</span>
                    <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>/ 100</span>
                  </div>
                  <div style={{ marginTop: 10 }}><window.Meter pct={c.score} color={c.score >= 75 ? 'var(--emerald)' : c.score >= 50 ? 'var(--warning)' : 'var(--danger)'} /></div>
                  <p style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 10, lineHeight: 1.45, marginBottom: 0 }}>
                    {c.score >= 75 ? 'Cliente fiel y al día. Buen candidato para cross-sell.' : c.score >= 50 ? 'Atención: revisar pagos y contacto reciente.' : 'En riesgo. Priorizar re-contacto.'}
                  </p>
                </div>
                <div className="card card-pad">
                  <div className="card-sub" style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, marginBottom: 10 }}>Contacto</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 13.5 }}>
                    <span style={{ display: 'inline-flex', gap: 9, alignItems: 'center' }}><I_c name="mail" size={16} style={{ color: 'var(--ink-3)' }} />{c.email}</span>
                    <span style={{ display: 'inline-flex', gap: 9, alignItems: 'center' }}><I_c name="phone" size={16} style={{ color: 'var(--ink-3)' }} />{c.phone}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}><I_c name="message-circle" />WhatsApp</button>
                    <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}><I_c name="phone" />Llamar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'polizas' && (
            <div className="card"><PolicyList policies={c.policies} full /></div>
          )}

          {tab === 'historial' && (
            <div className="card card-pad">
              <div className="tl" style={{ marginTop: 4 }}>
                {history.map((h, i) => (
                  <div key={i} className={`tl-item ${h.kind}`}>
                    <div className="tl-meta">{h.meta}</div>
                    <div className="tl-title">{h.title}</div>
                    <div className="tl-body">{h.body}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'oportunidades' && (
            <div className="card">
              {c.opps.length === 0
                ? <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-3)' }}>Sin oportunidades abiertas.</div>
                : <table className="table"><thead><tr><th>Ramo</th><th>Etapa</th><th>Criterio</th><th className="t-right">Valor estimado</th><th></th></tr></thead>
                  <tbody>{c.opps.map((o, i) => (
                    <tr key={i}>
                      <td><RT_c ramo={o.ramo} /></td>
                      <td><window.PipelineBadge etapa={o.etapa} /></td>
                      <td style={{ fontSize: 12.5, maxWidth: 280 }}>{o.motivo}</td>
                      <td className="t-right tnum t-strong">{window.money(o.valor)}</td>
                      <td className="t-right"><button className="btn btn-ghost btn-sm">Avanzar etapa</button></td>
                    </tr>
                  ))}</tbody></table>}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

function PolicyList({ policies, full }) {
  return (
    <table className="table">
      <thead><tr><th>Ramo</th><th>Aseguradora</th>{full && <th>N° póliza</th>}<th>Vencimiento</th><th>Cobro</th><th>Estado</th><th className="t-right">Prima anual</th></tr></thead>
      <tbody>
        {policies.map((p, i) => {
          const d = window.daysTo(p.venc);
          const s = PB_c[p.estado];
          return (
            <tr key={i}>
              <td><RT_c ramo={p.ramo} /></td>
              <td>{p.aseg}</td>
              {full && <td className="tnum" style={{ color: 'var(--ink-3)' }}>{p.nro}</td>}
              <td><span className="tnum">{window.fmtDate(p.venc)}</span> <span style={{ color: 'var(--ink-3)', fontSize: 12 }}>· {d}d</span></td>
              <td><window.CobroChip debito={p.debito} /></td>
              <td><span className={`badge badge-${s.kind}`}>{s.label}</span></td>
              <td className="t-right tnum t-strong">{window.money(p.prima)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

Object.assign(window, { CrmListScreen, CrmDetailScreen });
