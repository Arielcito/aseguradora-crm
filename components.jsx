/* ============================================================
   Shared components
   ============================================================ */
const { useState, useEffect, useRef } = React;

// Lucide icon wrapper — renders by name after lucide loads
function Icon({ name, size, style, className }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({ nameAttr: 'data-lucide', icons: window.lucide.icons, attrs: {} });
      const svg = ref.current.querySelector('svg');
      if (svg && size) { svg.setAttribute('width', size); svg.setAttribute('height', size); }
    }
  }, [name, size]);
  return <span ref={ref} className={className} style={{ display: 'inline-flex', ...style }} />;
}

function Badge({ kind = 'neutral', children, dot }) {
  return (
    <span className={`badge badge-${kind}`}>
      {dot && <span className="dot" />}
      {children}
    </span>
  );
}

function Avatar({ name, size = 32 }) {
  const [bg, fg] = window.avColor(name);
  return (
    <span className="av" style={{ width: size, height: size, background: bg, color: fg, fontSize: size * 0.38 }}>
      {window.initials(name)}
    </span>
  );
}

function Btn({ variant = 'ghost', sm, icon, children, onClick, style }) {
  return (
    <button className={`btn btn-${variant} ${sm ? 'btn-sm' : ''}`} onClick={onClick} style={style}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
}

function Delta({ value, suffix = '%' }) {
  const up = value >= 0;
  return (
    <span className={`delta ${up ? 'up' : 'down'}`}>
      <Icon name={up ? 'trending-up' : 'trending-down'} />
      {up ? '+' : ''}{value}{suffix}
    </span>
  );
}

function Kpi({ label, value, icon, iconBg, iconFg, delta, deltaLabel, foot }) {
  return (
    <div className="kpi">
      <div className="kpi-top">
        <span className="kpi-label">{label}</span>
        <span className="kpi-ic" style={{ background: iconBg, color: iconFg }}><Icon name={icon} /></span>
      </div>
      <div className="kpi-val">{value}</div>
      <div className="kpi-foot">
        {delta !== undefined && <Delta value={delta} />}
        <span>{foot}</span>
      </div>
    </div>
  );
}

function Meter({ pct, color }) {
  return <div className="meter"><span style={{ width: `${pct}%`, background: color || 'var(--emerald)' }} /></div>;
}

// ramo pill with icon
function RamoTag({ ramo }) {
  const r = window.RAMOS[ramo];
  if (!r) return null;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>
      <span className="ic-chip" style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--emerald-100)', color: 'var(--emerald-deep)' }}>
        <Icon name={r.icon} size={15} />
      </span>
      {r.label}
    </span>
  );
}

// status mapping
const STATUS_BADGE = {
  activo:   { kind: 'success', label: 'Activo' },
  moroso:   { kind: 'danger', label: 'Moroso' },
  inactivo: { kind: 'neutral', label: 'Inactivo' },
};
const POL_BADGE = {
  vigente:     { kind: 'success', label: 'Vigente' },
  'por-vencer':{ kind: 'warning', label: 'Por vencer' },
  'falta-pago':{ kind: 'danger', label: 'Falta de pago' },
};

// pipeline / etapa comercial badge
function PipelineBadge({ etapa }) {
  const s = window.pipelineStage(etapa);
  return <span className={`badge badge-${s.kind}`}>{s.label}</span>;
}

// método de cobro: débito automático vs cobro manual (aviso por WhatsApp)
function CobroChip({ debito }) {
  return debito
    ? <span className="badge badge-emerald" title="Se cobra por débito automático"><Icon name="repeat" size={12} />Débito autom.</span>
    : <span className="badge badge-warning" title="Sin débito: se cobra manual y se avisa por WhatsApp"><Icon name="hand-coins" size={12} />Cobro manual</span>;
}

function SectionHead({ title, sub, action }) {
  return (
    <div className="sec-head">
      <div>
        <h2>{title}</h2>
        {sub && <div className="sec-sub">{sub}</div>}
      </div>
      {action}
    </div>
  );
}

// ---- Sidebar ----
const NAV = [
  { id: 'dashboard', label: 'Panel comercial', icon: 'layout-dashboard' },
  { id: 'crm', label: 'Clientes y pólizas', icon: 'users', count: 8 },
  { id: 'automations', label: 'Seguimiento', icon: 'zap', count: 6 },
  { id: 'cotizador', label: 'Cotizador', icon: 'calculator' },
  { id: 'whatsapp', label: 'Bot de WhatsApp', icon: 'message-circle', count: 3 },
  { id: 'fidelizacion', label: 'Fidelización', icon: 'heart-handshake' },
];

function Sidebar({ current, onNav }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark" />
        <div>
          <div className="brand-name">Aseguradora</div>
          <div className="brand-tag">CRM · Productor</div>
        </div>
      </div>

      <div className="nav-label">Operación</div>
      {NAV.slice(0, 5).map(n => (
        <button key={n.id} className={`nav-item ${current === n.id ? 'active' : ''}`} onClick={() => onNav(n.id)}>
          <Icon name={n.icon} />
          <span>{n.label}</span>
          {n.count && <span className="nav-count">{n.count}</span>}
        </button>
      ))}

      <div className="nav-label">Crecimiento</div>
      {NAV.slice(5).map(n => (
        <button key={n.id} className={`nav-item ${current === n.id ? 'active' : ''}`} onClick={() => onNav(n.id)}>
          <Icon name={n.icon} />
          <span>{n.label}</span>
          {n.count && <span className="nav-count">{n.count}</span>}
        </button>
      ))}

      <div className="sidebar-footer">
        <div className="user-chip">
          <span className="avatar">PR</span>
          <div style={{ minWidth: 0 }}>
            <div className="un">Pablo Reyes</div>
            <div className="ur">Productor matriculado</div>
          </div>
          <Icon name="chevrons-up-down" size={15} style={{ marginLeft: 'auto', color: 'var(--ink-3)' }} />
        </div>
      </div>
    </aside>
  );
}

function Topbar({ title, sub, actions }) {
  return (
    <header className="topbar">
      <div>
        <div className="page-title">{title}</div>
        {sub && <div className="page-sub">{sub}</div>}
      </div>
      <div className="topbar-spacer" />
      <label className="search">
        <Icon name="search" />
        <input placeholder="Buscar cliente, póliza o DNI…" />
      </label>
      {actions}
      <button className="btn btn-icon btn-ghost" title="Notificaciones" style={{ position: 'relative' }}>
        <Icon name="bell" />
        <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', background: 'var(--clay)', border: '1.5px solid #fff' }} />
      </button>
    </header>
  );
}

Object.assign(window, {
  Icon, Badge, Avatar, Btn, Delta, Kpi, Meter, RamoTag,
  STATUS_BADGE, POL_BADGE, SectionHead, Sidebar, Topbar, NAV,
  PipelineBadge, CobroChip,
});
