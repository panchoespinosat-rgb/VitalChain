import React, { useState, useEffect } from 'react';

const NetworkMap = ({
  nodes,
  onNodeClick,
}: {
  nodes: Array<{ label: string; x: number; y: number; color: string }>;
  onNodeClick?: (label: string) => void;
}) => {
  return (
    <section style={{ margin: '2rem', background: 'white', borderRadius: 16, padding: '1.5rem' }}>
      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>Red de Distribución Nacional</h2>
      <svg viewBox="0 0 600 430" style={{ width: '100%', height: 'auto' }}>
        <style>{'@keyframes dash{to{stroke-dashoffset:-20}}'}</style>
        {nodes.map((n, i) => (
          <line
            key={i}
            x1="300"
            y1="215"
            x2={n.x}
            y2={n.y}
            stroke={n.color}
            strokeWidth="3"
            strokeDasharray="8 6"
            style={{ animation: 'dash 1.5s linear infinite' }}
          />
        ))}
        <circle cx="300" cy="215" r="40" fill="#0f3d6e" />
        <text x="300" y="210" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
          Campus Maypo
        </text>
        <text x="300" y="225" textAnchor="middle" fill="white" fontSize="10">
          CDMX
        </text>
        {nodes.map((n, i) => (
          <g
            key={i}
            style={{ cursor: onNodeClick ? 'pointer' : 'default', pointerEvents: onNodeClick ? 'all' : 'none' }}
            onClick={() => {
              console.log('NetworkMap node clicked:', n.label);
              onNodeClick?.(n.label);
            }}
          >
            <circle
              cx={n.x}
              cy={n.y}
              r="22"
              fill={n.color}
            />
            <text
              x={n.x}
              y={n.y + 4}
              textAnchor="middle"
              fill="white"
              fontSize="9"
              fontWeight="bold"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </section>
  );
};

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 3>(1);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const nationalKpis = [
    { label: 'Total en tránsito', value: '18.4M', unit: 'piezas', color: 'teal' },
    { label: 'Alertas críticas activas', value: '5', unit: '', color: 'red' },
    { label: 'Cumplimiento cadena fría', value: '94.2%', unit: '', color: 'teal' },
    { label: 'Hospitales abastecidos', value: '23/27', unit: '', color: 'navy' },
  ];

  const nationalAlerts = [
    { name: 'Insulina Glargina', status: 'Crítico', severity: 'red', temp: '-18°C' },
    { name: 'Imatinib', status: 'Crítico', severity: 'red', temp: '2-8°C' },
    { name: 'Levetiracetam', status: 'Advertencia', severity: 'amber', temp: '15-25°C' },
    { name: 'Factor VIII', status: 'Crítico', severity: 'red', temp: '-20°C' },
    { name: 'Metotrexato', status: 'Advertencia', severity: 'amber', temp: '20-25°C' },
  ];

  const temperatureZones = [
    { name: 'Zona Ultra Fría', temp: '-25 a -15°C', units: 12, status: 'optimal' },
    { name: 'Zona Congelada', temp: '-15 a -5°C', units: 18, status: 'optimal' },
    { name: 'Zona Refrigerada', temp: '2 a 8°C', units: 45, status: 'optimal' },
    { name: 'Zona Ambiental', temp: '15 a 25°C', units: 34, status: 'warning' },
  ];

  const nodes = [
    { label: 'IMSS ZM1', x: 500, y: 80, color: '#dc2626' },
    { label: 'ISSSTE', x: 500, y: 350, color: '#10b981' },
    { label: 'Hub GDL', x: 80, y: 80, color: '#10b981' },
    { label: 'INCAN', x: 80, y: 350, color: '#f59e0b' },
    { label: 'Hub Norte', x: 560, y: 215, color: '#f59e0b' },
    { label: 'Hub Sur', x: 20, y: 215, color: '#dc2626' },
  ];

  const regionData: Record<string, any> = {
    'IMSS ZM1': {
      kpis: [
        { label: 'Transacciones hoy', value: '5.8M', color: 'teal' },
        { label: 'Alertas activas', value: '2', color: 'red' },
        { label: 'Cumplimiento', value: '96.1%', color: 'teal' },
      ],
      alerts: [
        { name: 'Insulina Lispro', status: 'Crítico', severity: 'red', temp: '-18°C' },
        { name: 'Morfina', status: 'Advertencia', severity: 'amber', temp: '2-8°C' },
      ],
      hospitals: [
        {
          name: 'Hospital General ZM1',
          address: 'Av. División del Norte 5900, CDMX',
          inventory: [
            { medication: 'Insulina Glargina', qty: '220 viales', temp: '-18°C' },
            { medication: 'Vacuna Influenza', qty: '900 dosis', temp: '2-8°C' },
          ],
          lastDelivery: '07/05/2026',
          coldChainStatus: 'Verde - Estable',
        },
        {
          name: 'Centro Médico Sur',
          address: 'Eje 10 Sur 123, CDMX',
          inventory: [
            { medication: 'Heparina', qty: '420 frascos', temp: '2-8°C' },
            { medication: 'Glucosa', qty: '160 cajas', temp: '15-25°C' },
          ],
          lastDelivery: '06/05/2026',
          coldChainStatus: 'Ámbar - Requiere revisión',
        },
      ],
    },
    ISSSTE: {
      kpis: [
        { label: 'Transacciones hoy', value: '4.2M', color: 'teal' },
        { label: 'Alertas activas', value: '1', color: 'red' },
        { label: 'Cumplimiento', value: '93.8%', color: 'teal' },
      ],
      alerts: [
        { name: 'Imatinib', status: 'Crítico', severity: 'red', temp: '2-8°C' },
      ],
      hospitals: [
        {
          name: 'Hospital de Especialidades ISSSTE',
          address: 'Lago Meru 42, CDMX',
          inventory: [
            { medication: 'Imatinib', qty: '140 frascos', temp: '2-8°C' },
            { medication: 'Prednisona', qty: '540 tabletas', temp: '15-25°C' },
          ],
          lastDelivery: '07/05/2026',
          coldChainStatus: 'Verde - Estable',
        },
        {
          name: 'Clínica Familiar ISSSTE',
          address: 'Av. de los Insurgentes Sur 1314, CDMX',
          inventory: [
            { medication: 'Vitamina B12', qty: '280 ampolletas', temp: '2-8°C' },
            { medication: 'Vacuna COVID-19', qty: '320 dosis', temp: '2-8°C' },
          ],
          lastDelivery: '05/05/2026',
          coldChainStatus: 'Verde - Estable',
        },
      ],
    },
    'Hub GDL': {
      kpis: [
        { label: 'Transacciones hoy', value: '2.7M', color: 'teal' },
        { label: 'Alertas activas', value: '1', color: 'red' },
        { label: 'Cumplimiento', value: '95.4%', color: 'teal' },
      ],
      alerts: [
        { name: 'Levetiracetam', status: 'Advertencia', severity: 'amber', temp: '15-25°C' },
      ],
      hospitals: [
        {
          name: 'Hospital General GDL',
          address: 'Av. Vallarta 7000, Guadalajara',
          inventory: [
            { medication: 'Levetiracetam', qty: '320 tabletas', temp: '15-25°C' },
            { medication: 'Antibiótico IV', qty: '180 bolsas', temp: '2-8°C' },
          ],
          lastDelivery: '07/05/2026',
          coldChainStatus: 'Verde - Estable',
        },
        {
          name: 'Clínica de Urgencias GDL',
          address: 'Calle Hidalgo 210, Guadalajara',
          inventory: [
            { medication: 'Naproxeno', qty: '360 tabletas', temp: '15-25°C' },
            { medication: 'Vacuna Hepatitis B', qty: '120 dosis', temp: '2-8°C' },
          ],
          lastDelivery: '06/05/2026',
          coldChainStatus: 'Verde - Estable',
        },
      ],
    },
    INCAN: {
      kpis: [
        { label: 'Transacciones hoy', value: '1.9M', color: 'teal' },
        { label: 'Alertas activas', value: '3', color: 'red' },
        { label: 'Cumplimiento', value: '91.7%', color: 'teal' },
      ],
      alerts: [
        { name: 'Factor VIII', status: 'Crítico', severity: 'red', temp: '-20°C' },
        { name: 'Metotrexato', status: 'Advertencia', severity: 'amber', temp: '20-25°C' },
      ],
      hospitals: [
        {
          name: 'Instituto Nacional de Cancerología',
          address: 'Av. San Fernando 22, CDMX',
          inventory: [
            { medication: 'Factor VIII', qty: '90 kits', temp: '-20°C' },
            { medication: 'Metotrexato', qty: '240 ampollas', temp: '20-25°C' },
          ],
          lastDelivery: '07/05/2026',
          coldChainStatus: 'Ámbar - Atención',
        },
      ],
    },
    'Hub Norte': {
      kpis: [
        { label: 'Transacciones hoy', value: '2.3M', color: 'teal' },
        { label: 'Alertas activas', value: '1', color: 'red' },
        { label: 'Cumplimiento', value: '94.9%', color: 'teal' },
      ],
      alerts: [
        { name: 'Vacuna SRP', status: 'Advertencia', severity: 'amber', temp: '2-8°C' },
      ],
      hospitals: [
        {
          name: 'Hospital Central Norte',
          address: 'Blvd. Manuel Ávila Camacho 108, CDMX',
          inventory: [
            { medication: 'Vacuna SRP', qty: '420 dosis', temp: '2-8°C' },
            { medication: 'IgG Humana', qty: '68 frascos', temp: '2-8°C' },
          ],
          lastDelivery: '07/05/2026',
          coldChainStatus: 'Verde - Estable',
        },
      ],
    },
    'Hub Sur': {
      kpis: [
        { label: 'Transacciones hoy', value: '1.6M', color: 'teal' },
        { label: 'Alertas activas', value: '1', color: 'red' },
        { label: 'Cumplimiento', value: '92.3%', color: 'teal' },
      ],
      alerts: [
        { name: 'Antígeno COVID', status: 'Advertencia', severity: 'amber', temp: '2-8°C' },
      ],
      hospitals: [
        {
          name: 'Hospital Regional Sur',
          address: 'Calz. de Tlalpan 3100, CDMX',
          inventory: [
            { medication: 'Antígeno COVID', qty: '520 kits', temp: '2-8°C' },
            { medication: 'Paracetamol', qty: '780 tabletas', temp: '15-25°C' },
          ],
          lastDelivery: '06/05/2026',
          coldChainStatus: 'Verde - Estable',
        },
      ],
    },
  };

  const activeRegion = selectedRegion ? regionData[selectedRegion] : null;
  const activeHospital = activeRegion && selectedHospital
    ? activeRegion.hospitals.find((hospital: any) => hospital.name === selectedHospital)
    : null;

  const breadcrumbLabels = ['Nacional'];
  if (selectedRegion) breadcrumbLabels.push(selectedRegion);
  if (selectedHospital) breadcrumbLabels.push(selectedHospital);
  const breadcrumb = breadcrumbLabels.join(' > ');

  const handleRegionClick = (label: string) => {
    console.log('handleRegionClick:', label);
    setCurrentLevel(2);
    setSelectedRegion(label);
    setSelectedHospital(null);
  };

  const handleHospitalClick = (name: string) => {
    setCurrentLevel(3);
    setSelectedHospital(name);
  };

  const handleBack = () => {
    if (currentLevel === 3) {
      setCurrentLevel(2);
      setSelectedHospital(null);
    } else if (currentLevel === 2) {
      setCurrentLevel(1);
      setSelectedRegion(null);
      setSelectedHospital(null);
    }
  };

  return (
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(135deg, #f3f4f6 0%, #f0f9fa 100%)', padding: 0 }}>
      <style>{`
        @keyframes dash-move { to { stroke-dashoffset: -20; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
      `}</style>

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

      <section style={{ padding: '2rem 3rem', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>Ruta</p>
            <h2 style={{ margin: '0.3rem 0 0', fontSize: '1.4rem', fontWeight: 700, color: '#0f3d6e' }}>{breadcrumb}</h2>
          </div>
          {currentLevel !== 1 && (
            <button
              onClick={handleBack}
              style={{
                border: 'none',
                borderRadius: 10,
                background: '#0f3d6e',
                color: 'white',
                padding: '0.9rem 1.4rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(15, 61, 110, 0.18)',
              }}
            >
              Volver
            </button>
          )}
        </div>
      </section>

      {currentLevel === 1 && (
        <>
          <section style={{ padding: '2.5rem 3rem', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {nationalKpis.map((kpi, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'white',
                    borderRadius: 12,
                    padding: '2rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    borderLeft: '5px solid',
                    borderLeftColor: kpi.color === 'teal' ? '#00a8a8' : kpi.color === 'red' ? '#dc2626' : '#0f3d6e',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                >
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: 1400, margin: '0 auto', padding: '0 3rem 3rem', width: '100%' }}>
            <section style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)', padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 600 }}>Medicamentos en Riesgo</h2>
                <span style={{ fontSize: '0.85rem', background: '#eef7fb', color: '#0f3d6e', padding: '0.4rem 0.8rem', borderRadius: 6, fontWeight: 600 }}>5 alertas</span>
              </div>
              <div style={{ padding: 0 }}>
                {nationalAlerts.map((med, idx) => (
                  <div key={idx} style={{ padding: '1.25rem 1.5rem', borderBottom: idx < nationalAlerts.length - 1 ? '1px solid #e5e7eb' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background-color 0.2s', borderLeft: med.severity === 'red' ? '4px solid #dc2626' : '4px solid #f59e0b' }}>
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

          <NetworkMap nodes={nodes} onNodeClick={handleRegionClick} />
        </>
      )}

      {currentLevel === 2 && activeRegion && (
        <section style={{ padding: '2.5rem 3rem', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {activeRegion.kpis.map((kpi: any, idx: number) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: 12,
                  padding: '1.75rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  borderLeft: '5px solid',
                  borderLeftColor: kpi.color === 'teal' ? '#00a8a8' : '#0f3d6e',
                }}
              >
                <p style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.8rem' }}>{kpi.label}</p>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0f3d6e' }}>{kpi.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
            <section style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)', padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 600 }}>Alertas de {selectedRegion}</h2>
              </div>
              <div style={{ padding: '1.5rem' }}>
                {activeRegion.alerts.map((med: any, idx: number) => (
                  <div key={idx} style={{ padding: '1rem 0', borderBottom: idx < activeRegion.alerts.length - 1 ? '1px solid #e5e7eb' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>{med.name}</p>
                      <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>{med.temp}</p>
                    </div>
                    <span style={{ display: 'inline-block', padding: '0.4rem 0.8rem', borderRadius: 6, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: med.severity === 'red' ? '#dc2626' : '#f59e0b', backgroundColor: med.severity === 'red' ? 'rgba(220, 38, 38, 0.12)' : 'rgba(249, 115, 22, 0.12)' }}>{med.status}</span>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)', padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 600 }}>Hospitales en {selectedRegion}</h2>
              </div>
              <div style={{ padding: '1.5rem' }}>
                {activeRegion.hospitals.map((hospital: any, idx: number) => (
                  <div
                    key={idx}
                    onClick={() => handleHospitalClick(hospital.name)}
                    style={{
                      padding: '1rem',
                      marginBottom: idx < activeRegion.hospitals.length - 1 ? '1rem' : 0,
                      borderRadius: 10,
                      background: '#f8fafc',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, background-color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#eef2ff')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                      <div>
                        <p style={{ fontSize: '1rem', fontWeight: 700, color: '#0f3d6e', marginBottom: '0.3rem' }}>{hospital.name}</p>
                        <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>{hospital.address}</p>
                      </div>
                      <span style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: 700, color: '#0f3d6e', background: '#e2e8f0', borderRadius: 999, padding: '0.4rem 0.75rem' }}>Ver detalles</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      )}

      {currentLevel === 3 && activeRegion && activeHospital && (
        <section style={{ padding: '2.5rem 3rem', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
          <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)', padding: '2rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ minWidth: 320 }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>Hospital</p>
                <h2 style={{ margin: '0.5rem 0 0', fontSize: '2rem', fontWeight: 700, color: '#0f3d6e' }}>{activeHospital.name}</h2>
                <p style={{ marginTop: '0.75rem', fontSize: '0.95rem', color: '#4b5563' }}>{activeHospital.address}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', width: '100%', maxWidth: 520 }}>
                <div style={{ background: '#eef7fb', borderRadius: 12, padding: '1rem 1.25rem' }}>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#0f3d6e', fontWeight: 700 }}>Última entrega</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '1.35rem', fontWeight: 700, color: '#0f3d6e' }}>{activeHospital.lastDelivery}</p>
                </div>
                <div style={{ background: '#eef7fb', borderRadius: 12, padding: '1rem 1.25rem' }}>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#0f3d6e', fontWeight: 700 }}>Estado Cadena Fría</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '1.35rem', fontWeight: 700, color: '#0f3d6e' }}>{activeHospital.coldChainStatus}</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <section style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)', padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 600 }}>Inventario de Medicamentos</h2>
              </div>
              <div style={{ overflowX: 'auto', padding: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#4b5563', fontSize: '0.85rem', fontWeight: 700, borderBottom: '2px solid #e5e7eb' }}>Medicación</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#4b5563', fontSize: '0.85rem', fontWeight: 700, borderBottom: '2px solid #e5e7eb' }}>Cantidad</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#4b5563', fontSize: '0.85rem', fontWeight: 700, borderBottom: '2px solid #e5e7eb' }}>Temperatura</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeHospital.inventory.map((item: any, idx: number) => (
                      <tr key={idx}>
                        <td style={{ padding: '0.9rem 1rem', borderBottom: '1px solid #e5e7eb', color: '#1f2937' }}>{item.medication}</td>
                        <td style={{ padding: '0.9rem 1rem', borderBottom: '1px solid #e5e7eb', color: '#1f2937' }}>{item.qty}</td>
                        <td style={{ padding: '0.9rem 1rem', borderBottom: '1px solid #e5e7eb', color: '#1f2937' }}>{item.temp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
