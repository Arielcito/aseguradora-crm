/* ============================================================
   Screen: Cotizador automatizado
   ============================================================ */
const { Icon: I_q, Topbar: TB_q, SectionHead: SH_q } = window;

function Field({ label, children, full }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: full ? '1 / -1' : 'auto' }}>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)' }}>{label}</span>
      {children}
    </label>
  );
}
const inputStyle = {
  border: '1px solid var(--line-2)', borderRadius: 'var(--r-sm)', padding: '10px 12px',
  fontSize: 13.5, color: 'var(--ink)', background: 'var(--surface)', outline: 'none', width: '100%',
};

function CotizadorScreen() {
  const [step, setStep] = useState(0); // 0 ramo, 1 datos, 2 resultado
  const [ramo, setRamo] = useState(null);
  const [result, setResult] = useState(null); // 'pre' | 'derivar'

  const reset = () => { setStep(0); setRamo(null); setResult(null); };

  return (
    <>
      <TB_q title="Cotizador automatizado" sub="Cargá los datos y el sistema arma la pre-cotización o la deriva ordenada"
        actions={<button className="btn btn-ghost" onClick={reset}><I_q name="rotate-ccw" />Reiniciar</button>} />
      <div className="scroll-area">
        <div className="page-pad screen" style={{ maxWidth: 940 }}>

          {/* stepper */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 26 }}>
            {['Tipo de seguro', 'Datos', 'Resultado'].map((s, i) => (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{
                    width: 26, height: 26, borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: 12.5, fontWeight: 700,
                    background: step >= i ? 'var(--emerald)' : 'var(--paper-2)', color: step >= i ? '#fff' : 'var(--ink-3)',
                    fontFamily: 'var(--font-display)',
                  }}>{step > i ? <I_q name="check" size={14} /> : i + 1}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: step >= i ? 'var(--ink)' : 'var(--ink-3)' }}>{s}</span>
                </div>
                {i < 2 && <div style={{ flex: 1, height: 2, background: step > i ? 'var(--emerald)' : 'var(--line)', margin: '0 14px', borderRadius: 2 }} />}
              </React.Fragment>
            ))}
          </div>

          {/* STEP 0 — choose ramo */}
          {step === 0 && (
            <div>
              <SH_q title="¿Qué querés cotizar?" sub="Elegí el ramo para empezar la carga manual" />
              <div className="grid-3" style={{ gap: 14 }}>
                {window.COTIZA_RAMOS.map(r => (
                  <button key={r.key} onClick={() => { setRamo(r.key); setStep(1); }} className="card card-pad"
                    style={{ textAlign: 'left', cursor: 'pointer', border: ramo === r.key ? '1.5px solid var(--emerald)' : '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', transition: 'all 160ms var(--ease)' }}>
                    {r.popular && <span className="badge badge-clay" style={{ position: 'absolute', top: 14, right: 14, fontSize: 10.5 }}>Popular</span>}
                    <span className="ic-chip" style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--emerald-100)', color: 'var(--emerald-deep)' }}><I_q name={r.icon} size={22} /></span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>{r.label}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 2 }}>{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Cotización automática por WhatsApp */}
              <div style={{ marginTop: 30 }}>
                <SH_q title="Cotización automática por WhatsApp" sub="El cliente manda los datos por WhatsApp y el sistema pre-cotiza solo, con tus credenciales"
                  action={<span className="badge badge-clay">Beta</span>} />
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 20 }}>
                  {/* flujo */}
                  <div className="card card-pad">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {[
                        { ic: 'key-round', t: '1 · Cargás credenciales', d: 'Conectás tus accesos de cada aseguradora (ej: Sancor Seguros) una sola vez en el CRM.' },
                        { ic: 'camera', t: '2 · El cliente envía foto + cédula', d: 'Por WhatsApp manda la foto del auto y la cédula verde; el bot extrae los datos.' },
                        { ic: 'zap', t: '3 · Pre-cotización automática', d: 'El sistema cotiza con tus credenciales y devuelve el comparativo al instante.' },
                      ].map((s, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <span className="ic-chip" style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--emerald-100)', color: 'var(--emerald-deep)' }}><I_q name={s.ic} size={18} /></span>
                          <div>
                            <div style={{ fontSize: 13.5, fontWeight: 600 }}>{s.t}</div>
                            <div style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.45 }}>{s.d}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* credenciales */}
                  <div className="card">
                    <div className="card-head"><I_q name="shield-check" size={18} style={{ color: 'var(--emerald)' }} /><h3>Credenciales de aseguradoras</h3></div>
                    <div style={{ padding: '6px 0' }}>
                      {window.ASEGURADORA_CREDS.map((cr, i) => {
                        const map = { 'conectada': ['success', 'Conectada'], 'scraping': ['warning', 'Vía scraping'], 'sin-credenciales': ['neutral', 'Sin credenciales'] };
                        const [kind, label] = map[cr.estado];
                        return (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 18px', borderBottom: i < window.ASEGURADORA_CREDS.length - 1 ? '1px solid var(--line)' : 'none' }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13, fontWeight: 600 }}>{cr.aseg}</div>
                              <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{cr.metodo}{cr.ramos.length ? ` · ${cr.ramos.length} ramos` : ''}</div>
                            </div>
                            {cr.estado === 'sin-credenciales'
                              ? <button className="btn btn-ghost btn-sm"><I_q name="plus" />Conectar</button>
                              : <span className={`badge badge-${kind}`}><span className="dot" />{label}</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* nota de limitaciones */}
                <div className="card card-pad" style={{ marginTop: 16, background: 'var(--warning-100)', border: '1px solid #EAD9AE' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <I_q name="info" size={18} style={{ color: 'var(--warning)', marginTop: 1, flex: 'none' }} />
                    <div style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>
                      <b style={{ color: 'var(--ink)' }}>Limitaciones técnicas.</b> La mayoría de las aseguradoras no exponen una API pública: la cotización automática requiere acuerdos comerciales y acceso al portal de productores. Como alternativa se puede hacer <b>scraping</b> de los cotizadores públicos (ej: San Cristóbal), más frágil y de desarrollo más complejo que la carga manual actual.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1 — form */}
          {step === 1 && (
            <div className="card card-pad">
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 20, paddingBottom: 18, borderBottom: '1px solid var(--line)' }}>
                <span className="ic-chip" style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--emerald-100)', color: 'var(--emerald-deep)' }}><I_q name={window.RAMOS[ramo].icon} size={19} /></span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>Cotización de {window.RAMOS[ramo].label}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>Completá los datos del cliente y del riesgo</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Field label="Nombre y apellido / Razón social" full><input style={inputStyle} placeholder="Ej: Carlos Méndez" /></Field>
                <Field label="DNI / CUIT"><input style={inputStyle} placeholder="20-12345678-9" /></Field>
                <Field label="Teléfono / WhatsApp"><input style={inputStyle} placeholder="+54 9 …" /></Field>
                {ramo === 'auto' && <>
                  <Field label="Marca y modelo"><input style={inputStyle} placeholder="Toyota Corolla" /></Field>
                  <Field label="Año"><input style={inputStyle} placeholder="2025" /></Field>
                  <Field label="Patente"><input style={inputStyle} placeholder="AB123CD" /></Field>
                  <Field label="Uso"><select style={inputStyle}><option>Particular</option><option>Comercial</option><option>App de transporte</option></select></Field>
                </>}
                {ramo === 'hogar' && <>
                  <Field label="Tipo de vivienda"><select style={inputStyle}><option>Casa</option><option>Departamento</option><option>PH</option></select></Field>
                  <Field label="Metros cubiertos"><input style={inputStyle} placeholder="120 m²" /></Field>
                  <Field label="Suma asegurada contenido"><input style={inputStyle} placeholder="$ 8.000.000" /></Field>
                </>}
                {ramo === 'art' && <>
                  <Field label="Cantidad de empleados"><input style={inputStyle} placeholder="12" /></Field>
                  <Field label="Actividad / CIIU"><input style={inputStyle} placeholder="Comercio minorista" /></Field>
                  <Field label="Masa salarial mensual"><input style={inputStyle} placeholder="$ 4.200.000" /></Field>
                </>}
                {(ramo === 'comercio' || ramo === 'caucion' || ramo === 'vida' || ramo === 'retiro') && <>
                  <Field label="Detalle del riesgo" full><textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} placeholder="Describí el bien, actividad o cobertura buscada…" /></Field>
                </>}
                <Field label="Código postal"><input style={inputStyle} placeholder="5000" /></Field>
                <Field label="Aseguradora preferida"><select style={inputStyle}><option>Cualquiera (comparar)</option>{window.ASEGURADORAS.map(a => <option key={a}>{a}</option>)}</select></Field>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'space-between' }}>
                <button className="btn btn-ghost" onClick={() => setStep(0)}><I_q name="arrow-left" />Cambiar ramo</button>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn-ghost" onClick={() => { setResult('derivar'); setStep(2); }}><I_q name="user-round-check" />Derivar al productor</button>
                  <button className="btn btn-primary" onClick={() => { setResult('pre'); setStep(2); }}><I_q name="zap" />Generar pre-cotización</button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 — result */}
          {step === 2 && result === 'pre' && (
            <div>
              <div className="card card-pad" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14, background: 'var(--emerald-100)', border: '1px solid var(--emerald-200)' }}>
                <span className="ic-chip" style={{ width: 40, height: 40, borderRadius: 11, background: 'var(--emerald)', color: '#fff' }}><I_q name="check" size={22} /></span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--emerald-deep)' }}>Pre-cotización lista</div>
                  <div style={{ fontSize: 13, color: 'var(--emerald-deep)' }}>Comparamos {window.RAMOS[ramo].label} en 3 aseguradoras. Enviada al cliente por WhatsApp.</div>
                </div>
              </div>
              <div className="grid-3" style={{ gap: 16 }}>
                {[
                  { aseg: 'Sancor Seguros', prima: 48200, cob: 'Todo riesgo c/ franquicia', best: false },
                  { aseg: 'La Caja', prima: 44900, cob: 'Todo riesgo c/ franquicia', best: true },
                  { aseg: 'San Cristóbal', prima: 51300, cob: 'Todo riesgo premium', best: false },
                ].map((o, i) => (
                  <div key={i} className="card card-pad" style={{ border: o.best ? '1.5px solid var(--emerald)' : '1px solid var(--line)', position: 'relative' }}>
                    {o.best && <span className="badge badge-emerald" style={{ position: 'absolute', top: 16, right: 16 }}>Mejor precio</span>}
                    <div style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 600 }}>{o.aseg}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 2px' }}>{window.money(o.prima)}<span style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 400 }}> /mes</span></div>
                    <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginBottom: 16 }}>{o.cob}</div>
                    <button className={`btn ${o.best ? 'btn-primary' : 'btn-ghost'}`} style={{ width: '100%' }}>Emitir póliza</button>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button className="btn btn-ghost" onClick={reset}><I_q name="plus" />Nueva cotización</button>
                <button className="btn btn-ghost"><I_q name="send" />Reenviar al cliente</button>
              </div>
            </div>
          )}

          {step === 2 && result === 'derivar' && (
            <div className="card card-pad" style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center', padding: 40 }}>
              <span className="ic-chip" style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--clay-100)', color: 'var(--clay-deep)', margin: '0 auto 18px' }}><I_q name="user-round-check" size={28} /></span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, margin: '0 0 8px' }}>Derivado a Pablo Reyes</h2>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5, margin: '0 auto 22px', maxWidth: 420 }}>
                La solicitud de <b>{window.RAMOS[ramo].label}</b> llegó al productor con todos los datos ordenados. Tiempo estimado de respuesta: <b>2 horas hábiles</b>.
              </p>
              <div style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: 16, textAlign: 'left', fontSize: 13, marginBottom: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span style={{ color: 'var(--ink-3)' }}>Ramo</span><b>{window.RAMOS[ramo].label}</b></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span style={{ color: 'var(--ink-3)' }}>Prioridad</span><span className="badge badge-warning">Normal</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span style={{ color: 'var(--ink-3)' }}>Canal de respuesta</span><b>WhatsApp</b></div>
              </div>
              <button className="btn btn-primary" onClick={reset}><I_q name="plus" />Nueva cotización</button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

Object.assign(window, { CotizadorScreen });
