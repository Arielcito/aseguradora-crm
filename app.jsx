/* ============================================================
   App root + router
   ============================================================ */
function App() {
  const [route, setRoute] = useState('dashboard');
  const [clientId, setClientId] = useState(null);

  const nav = (id) => { setRoute(id); setClientId(null); window.scrollTo(0, 0); };
  const openClient = (id) => { setRoute('crm'); setClientId(id); };

  // re-render lucide icons on route change
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [route, clientId]);

  let screen;
  if (route === 'dashboard') screen = <window.DashboardScreen onOpenClient={openClient} onNav={nav} />;
  else if (route === 'crm') screen = clientId
    ? <window.CrmDetailScreen clientId={clientId} onBack={() => setClientId(null)} />
    : <window.CrmListScreen onOpenClient={openClient} />;
  else if (route === 'automations') screen = <window.AutomationsScreen />;
  else if (route === 'cotizador') screen = <window.CotizadorScreen />;
  else if (route === 'whatsapp') screen = <window.WhatsappScreen />;
  else if (route === 'fidelizacion') screen = <window.FidelizacionScreen />;

  return (
    <div className="app">
      <window.Sidebar current={route} onNav={nav} />
      <div className="main">{screen}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
