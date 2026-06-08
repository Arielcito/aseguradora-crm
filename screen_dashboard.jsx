/* ============================================================
   Screen: Panel comercial (dashboard)
   ============================================================ */
const { Icon: I_d, Badge: B_d, Kpi: Kpi_d, Delta: Delta_d, Meter: Meter_d,
        SectionHead: SH_d, RamoTag: RT_d, Topbar: TB_d, POL_BADGE: PB_d } = window;

function MiniBars({ data, max }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 90, marginTop: 8 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: 70 }}>
            <div style={{
              width: '100%', borderRadius: '5px 5px 3px 3px',
              height: `${(d.v / max) * 100}%`,
              background: d.hot ? 'var(--clay)' : 'var(--emerald)',
              opacity: d.hot ? 1 : 0.85,
            }} />
          </div>
          <span style={{ fontSize: 10.5, color: 'var(--ink-3)', fontWeight: 600 }}>{d.l}</span>
        </div>
      ))}
    </div>
  );
}

// donut for renewal rate
function Donut({ pct, size = 132, label }) {
  const r = size / 2 - 12, c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--paper-2)" strokeWidth="13" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--emerald)" strokeWidth="13"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 }}>{pct}%</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 3 }}>{label}</div>
        </div>
      </div>
    </div>
  );
}

function DashboardScreen({ onOpenClient, onNav }) {
  const expiring = window.policiesExpiring();
  const opps = [];
  window.CLIENTS.forEach(c => c.opps.forEach(o => opps.push({ ...o, client: c.name, clientId: c.id })));
  const oppsValue = opps.reduce((s, o) => s + o.valor, 0);

  const barData = [
    { l: 'Ene', v: 18 }, { l: 'Feb', v: 22 }, { l: 'Mar', v: 19 },
    { l: 'Abr', v: 27 }, { l: 'May', v: 24 }, { l: 'Jun', v: 31, hot: true },
  ];

  return (
    <>
      <TB_d title="Panel comercial" sub="Lunes 8 de junio, 2026 · Resumen de tu cartera"
        actions={<button className="btn btn-primary"><I_d name="plus" />Nueva operación</button>} />
      <div className="scroll-area">
        <div className="page-pad screen">

          {/* KPIs */}
          <div className="kpi-grid" style={{ marginBottom: 24 }}>
            <Kpi_d label="Clientes activos" value="312" icon="users" iconBg="var(--emerald-100)" iconFg="var(--emerald-deep)" delta={3.4} foot="vs. mes anterior" />
            <Kpi_d label="Pólizas por vencer (30 d)" value="18" icon="calendar-clock" iconBg="var(--warning-100)" iconFg="var(--warning)" foot="6 esta semana" />
            <Kpi_d label="Comisiones estimadas" value="$1,94M" icon="wallet" iconBg="var(--clay-100)" iconFg="var(--clay-deep)" delta={11.2} foot="proyección de junio" />
            <Kpi_d label="Tasa de renovación" value="88%" icon="refresh-cw" iconBg="var(--info-100)" iconFg="var(--info)" delta={2.1} foot="últimos 90 días" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 20, marginBottom: 20 }}>

            {/* Pólizas por vencer */}
            <div className="card">
              <div className="card-head">
                <I_d name="calendar-clock" size={18} style={{ color: 'var(--warning)' }} />
                <h3>Pólizas por vencer</h3>
                <span className="card-sub">próximos 30 días</span>
                <button className="link-btn" style={{ marginLeft: 'auto' }} onClick={() => onNav('crm')}>Ver todas</button>
              </div>
              <table className="table">
                <thead>
                  <tr><th>Cliente</th><th>Ramo</th><th>Aseguradora</th><th>Vence</th><th className="t-right">Prima</th><th></th></tr>
                </thead>
                <tbody>
                  {expiring.slice(0, 6).map((p, i) => {
                    const d = window.daysTo(p.venc);
                    return (
                      <tr key={i} onClick={() => onOpenClient(p.clientId)}>
                        <td className="t-strong">{p.client}</td>
                        <td><RT_d ramo={p.ramo} /></td>
                        <td>{p.aseg}</td>
                        <td>
                          <span className="tnum">{window.fmtDate(p.venc)}</span>{' '}
                          <span style={{ color: d <= 7 ? 'var(--danger)' : 'var(--ink-3)', fontWeight: 600, fontSize: 12 }}>· {d}d</span>
                        </td>
                        <td className="t-right tnum t-strong">{window.money(p.prima)}</td>
                        <td className="t-right"><button className="btn btn-ghost btn-sm" onClick={(e) => e.stopPropagation()}>Renovar</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Tasa de renovación + comisiones */}
            <div className="stack" style={{ gap: 20 }}>
              <div className="card card-pad" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <Donut pct={88} label="renovadas" />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600 }}>Renovaciones de junio</h3>
                  <p style={{ margin: '0 0 14px', fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.45 }}>24 de 27 pólizas renovadas a tiempo.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    <RenewRow label="Renovadas" n={24} color="var(--emerald)" total={27} />
                    <RenewRow label="En gestión" n={2} color="var(--warning)" total={27} />
                    <RenewRow label="Caídas" n={1} color="var(--danger)" total={27} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>

            {/* Producción mensual */}
            <div className="card card-pad">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="kpi-label" style={{ fontSize: 12.5 }}>Producción 2026</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 4 }}>31 pólizas</div>
                </div>
                <Delta_d value={29} suffix="%" />
              </div>
              <MiniBars data={barData} max={31} />
            </div>

            {/* Oportunidades abiertas */}
            <div className="card">
              <div className="card-head">
                <I_d name="target" size={18} style={{ color: 'var(--clay)' }} />
                <h3>Oportunidades</h3>
                <span className="badge badge-clay" style={{ marginLeft: 'auto' }}>{window.moneyShort(oppsValue)}</span>
              </div>
              <div style={{ padding: '6px 0' }}>
                {opps.slice(0, 4).map((o, i) => (
                  <div key={i} onClick={() => onOpenClient(o.clientId)} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 18px', cursor: 'pointer' }}>
                    <span className="ic-chip" style={{ width: 28, height: 28, background: 'var(--paper-2)', color: 'var(--ink-2)' }}><I_d name={window.RAMOS[o.ramo].icon} size={15} /></span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.client}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{o.etapa}</div>
                    </div>
                    <span className="tnum" style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-display)' }}>{window.moneyShort(o.valor)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cotizaciones pendientes */}
            <div className="card">
              <div className="card-head">
                <I_d name="calculator" size={18} style={{ color: 'var(--emerald)' }} />
                <h3>Cotizaciones</h3>
                <button className="link-btn" style={{ marginLeft: 'auto' }} onClick={() => onNav('cotizador')}>Abrir</button>
              </div>
              <div style={{ padding: '6px 0' }}>
                {window.COTIZACIONES.slice(0, 4).map((q) => (
                  <div key={q.id} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 18px' }}>
                    <span className="ic-chip" style={{ width: 28, height: 28, background: 'var(--emerald-100)', color: 'var(--emerald-deep)' }}><I_d name={window.RAMOS[q.ramo].icon} size={15} /></span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{q.client}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{q.fecha} · {q.origen}</div>
                    </div>
                    <CotEstado estado={q.estado} />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

function RenewRow({ label, n, color, total }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flex: 'none' }} />
      <span style={{ fontSize: 12.5, color: 'var(--ink-2)' }}>{label}</span>
      <span className="tnum" style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)' }}>{n}</span>
    </div>
  );
}

const COT_ESTADO = {
  'pre-cotizado': { kind: 'emerald', label: 'Pre-cotizado' },
  'derivado': { kind: 'info', label: 'Derivado' },
  'en-revision': { kind: 'warning', label: 'En revisión' },
};
function CotEstado({ estado }) {
  const e = COT_ESTADO[estado];
  return <span className={`badge badge-${e.kind}`}>{e.label}</span>;
}

Object.assign(window, { DashboardScreen, CotEstado, COT_ESTADO });
