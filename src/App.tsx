import React, { useState, useEffect } from 'react';

const NetworkMap = () => {
  const nodes = [
    { label: 'IMSS ZM1', x: 500, y: 80, color: '#dc2626' },
    { label: 'ISSSTE', x: 500, y: 350, color: '#10b981' },
    { label: 'Hub GDL', x: 80, y: 80, color: '#10b981' },
    { label: 'INCAN', x: 80, y: 350, color: '#f59e0b' },
    { label: 'Hub Norte', x: 560, y: 215, color: '#f59e0b' },
    { label: 'Hub Sur', x: 20, y: 215, color: '#dc2626' },
  ];
  return (
    <section style={{margin:'2rem',background:'white',borderRadius:16,padding:'1.5rem'}}>
      <h2 style={{color:'#1f2937',marginBottom:'1rem'}}>Red de Distribución Nacional</h2>
      <svg viewBox="0 0 600 430" style={{width:'100%',height:'auto'}}>
        <style>{'@keyframes dash{to{stroke-dashoffset:-20}}'}</style>
        {nodes.map((n,i)=>(
          <line key={i} x1="300" y1="215" x2={n.x} y2={n.y}
            stroke={n.color} strokeWidth="3" strokeDasharray="8 6"
            style={{animation:'dash 1.5s linear infinite'}}/>
        ))}
        <circle cx="300" cy="215" r="40" fill="#0f3d6e"/>
        <text x="300" y="210" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Campus Maypo</text>
        <text x="300" y="225" textAnchor="middle" fill="white" fontSize="10">CDMX</text>
        {nodes.map((n,i)=>(
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="22" fill={n.color}/>
            <text x={n.x} y={n.y+4} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{n.label}</text>
          </g>
        ))}
      </svg>
    </section>
  );
};

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const kpiData = [
    { label: 'Total en tránsito', value: '18.4M', unit: 'piezas', color: 'teal' },
    { label: 'Alertas críticas activas', value: '5', unit: '', color: 'red' },
    { label: 'Cumplimiento cadena fría', value: '94.2%', unit: '', color: 'teal' },
    { label: 'Hospitales abastecidos', value: '23/27', unit: '', color: 'navy' }
  ];

  const alertsMedications = [
    { name: 'Insulina Glargina', status: 'Crítico', severity: 'red', temp: '-18°C' },
    { name: 'Imatinib', status: 'Crítico', severity: 'red', temp: '2-8°C' },
    { name: 'Levetiracetam', status: 'Advertencia', severity: 'amber', temp: '15-25°C' },
    { name: 'Factor VIII', status: 'Crítico', severity: 'red', temp: '-20°C' },
    { name: 'Metotrexato', status: 'Advertencia', severity: 'amber', temp: '20-25°C' }
  ];

  const temperatureZones = [
    { name: 'Zona Ultra Fría', temp: '-25 a -15°C', units: 12, status: 'optimal' },
    { name: 'Zona Congelada', temp: '-15 a -5°C', units: 18, status: 'optimal' },
    { name: 'Zona Refrigerada', temp: '2 a 8°C', units: 45, status: 'optimal' },
    { name: 'Zona Ambiental', temp: '15 a 25°C', units: 34, status: 'warning' }
  ];

  return (
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(135deg, #f3f4f6 0%, #f0f9fa 100%)', padding: 0 }}>
      <style>{`
        @keyframes dash-move { to { stroke-dashoffset: -20; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
      `}</style>
      {/* Header */}
      <header style={{ background: 'linear-gradient(135deg, #0f3d6e 0%, #1e5a8e 100%)', color: 'white', padding: '2rem 3rem', boxShadow: '0 4px 12px rgba(15, 61, 110, 0.15)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: -1, marginBottom: '0.25rem' }}>VitalChain</h1>
            <p style={{ fontSize: '0.95rem', opacity: 0.9, fontWeight: 300 }}>Cadena de Suministro Farmacéutica</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.75rem', fontFamily: 'Courier New, monospace', fontWeight: 600, letterSpacing: 2, marginBottom: '0.25rem' }}>{formatTime(currentTime)}</div>
            <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Hora del Sistema</p>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <section style={{ padding: '2.5rem 3rem', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {kpiData.map((kpi, idx) => (
            <div key={idx} style={{ background: 'white', borderRadius: 12, padding: '2rem', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', borderLeft: '5px solid', borderLeftColor: kpi.color === 'teal' ? '#00a8a8' : kpi.color === 'red' ? '#dc2626' : '#0f3d6e', transition: 'transform 0.2s, box-shadow 0.2s' }}>
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{kpi.label}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 700, background: 'linear-gradient(135deg, #00a8a8, #0f3d6e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{kpi.value}</div>
                {kpi.unit && <p style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 500 }}>{kpi.unit}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: 1400, margin: '0 auto', padding: '0 3rem 3rem', width: '100%' }}>
        {/* Alerts Panel */}
        <section style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)', padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 600 }}>Medicamentos en Riesgo</h2>
            <span style={{ fontSize: '0.85rem', background: '#eef7fb', color: '#0f3d6e', padding: '0.4rem 0.8rem', borderRadius: 6, fontWeight: 600 }}>5 alertas</span>
          </div>
          <div style={{ padding: 0 }}>
            {alertsMedications.map((med, idx) => (
              <div key={idx} style={{ padding: '1.25rem 1.5rem', borderBottom: idx < alertsMedications.length - 1 ? '1px solid #e5e7eb' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background-color 0.2s', borderLeft: med.severity === 'red' ? '4px solid #dc2626' : '4px solid #f59e0b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: med.severity === 'red' ? '#dc2626' : '#f59e0b', animation: 'pulse 2s infinite' }}></div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.25rem' }}>{med.name}</p>
                    <p style={{ fontSize: '0.85rem', color: '#6b7280', fontFamily: 'Courier New, monospace' }}>{med.temp}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', backgroundColor: med.severity === 'red' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(217, 119, 6, 0.1)', color: med.severity === 'red' ? '#dc2626' : '#f59e0b' }}>{med.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cold Chain Monitoring */}
        <section style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)', padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 600 }}>Monitoreo Cadena Fría</h2>
            <span style={{ fontSize: '0.85rem', background: '#eef7fb', color: '#0f3d6e', padding: '0.4rem 0.8rem', borderRadius: 6, fontWeight: 600 }}>4 zonas</span>
          </div>
          <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {temperatureZones.map((zone, idx) => (
              <div key={idx} style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)', border: '2px solid #e5e7eb', borderRadius: 10, padding: '1.25rem', transition: 'all 0.2s', borderLeft: zone.status === 'optimal' ? '4px solid #10b981' : '4px solid #f59e0b' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>{zone.name}</p>
                  <span style={{ display: 'inline-block', fontSize: '0.8rem', background: 'white', color: '#0f3d6e', padding: '0.3rem 0.7rem', borderRadius: 4, fontFamily: 'Courier New, monospace', fontWeight: 600 }}>{zone.temp}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f3d6e' }}>{zone.units} unidades</div>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: zone.status === 'optimal' ? '#10b981' : '#f59e0b', boxShadow: zone.status === 'optimal' ? '0 0 12px rgba(16, 185, 129, 0.4)' : '0 0 12px rgba(217, 119, 6, 0.4)', animation: zone.status === 'warning' ? 'pulse 2s infinite' : 'none' }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <NetworkMap />
    </main>
  );
}

export default App;
