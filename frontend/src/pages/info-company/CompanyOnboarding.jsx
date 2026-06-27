import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  FiHome, FiFile, FiTag, FiMonitor, FiHeart, FiBook,
  FiShoppingCart, FiDollarSign, FiTool, FiGlobe,
  FiBarChart2, FiCheck,
  FiArrowLeft, FiSkipForward, FiBriefcase
} from 'react-icons/fi';

const BLUE = '#1A66FF';
const BLUE_LIGHT = '#EEF4FF';
const WHITE = '#FFFFFF';
const GRAY_BG = '#F5F5F5';
const GRAY_BORDER = '#E0E0E0';
const TEXT_DARK = '#333333';
const TEXT_GRAY = '#888888';
const TEXT_LIGHT = '#AAAAAA';

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    backgroundColor: WHITE,
  },
  leftPanel: {
    flex: '0 0 420px',
    background: `linear-gradient(135deg, #0a2e5c, #1d4ed8)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 40px',
    position: 'relative',
    overflow: 'hidden',
  },
  leftPanelDecor: {
    position: 'absolute',
    top: '-60px',
    right: '-60px',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.06)',
  },
  leftPanelDecor2: {
    position: 'absolute',
    bottom: '-80px',
    left: '-80px',
    width: '280px',
    height: '280px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.04)',
  },
  iconCircle: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    border: '3px solid rgba(255,255,255,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: WHITE,
    fontSize: '38px',
    marginBottom: '32px',
    position: 'relative',
    zIndex: 1,
  },
  leftTitle: {
    color: WHITE,
    fontSize: '24px',
    fontWeight: 700,
    textAlign: 'center',
    lineHeight: 1.3,
    marginBottom: '12px',
    position: 'relative',
    zIndex: 1,
  },
  leftSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '14px',
    textAlign: 'center',
    lineHeight: 1.6,
    maxWidth: '300px',
    position: 'relative',
    zIndex: 1,
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 56px',
    overflowY: 'auto',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: TEXT_GRAY,
    fontSize: '13px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'inherit',
    padding: '6px 0',
  },
  skipBtn: {
    background: 'none',
    border: 'none',
    color: TEXT_GRAY,
    fontSize: '13px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'inherit',
    padding: '6px 0',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0',
    marginBottom: '32px',
  },
  stepCircle: (active, completed) => ({
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 700,
    color: completed || active ? WHITE : TEXT_LIGHT,
    backgroundColor: active ? BLUE : completed ? BLUE : '#E8E8E8',
    transition: 'all 0.3s ease',
    boxShadow: active ? `0 2px 8px rgba(26,102,255,0.25)` : 'none',
  }),
  stepLine: (active) => ({
    width: '60px',
    height: '3px',
    backgroundColor: active ? BLUE : '#E8E8E8',
    borderRadius: '2px',
    transition: 'background 0.3s ease',
  }),
  stepIndicator: {
    color: BLUE,
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '4px',
  },
  formTitle: {
    color: TEXT_DARK,
    fontSize: '26px',
    fontWeight: 700,
    marginBottom: '6px',
  },
  formSubtitle: {
    color: TEXT_GRAY,
    fontSize: '14px',
    marginBottom: '28px',
  },
  fieldGroup: {
    marginBottom: '22px',
  },
  fieldLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: TEXT_DARK,
    marginBottom: '6px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: GRAY_BG,
    border: `1px solid ${GRAY_BORDER}`,
    borderRadius: '10px',
    padding: '0 14px',
    height: '48px',
    transition: 'border-color 0.2s ease',
  },
  inputWrapperFocused: {
    borderColor: BLUE,
    boxShadow: `0 0 0 3px rgba(255,102,0,0.08)`,
  },
  inputIcon: {
    color: TEXT_LIGHT,
    fontSize: '16px',
    flexShrink: 0,
  },
  input: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '14px',
    color: TEXT_DARK,
    width: '100%',
    height: '100%',
    fontFamily: 'inherit',
  },
  btnRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 'auto',
    paddingTop: '24px',
  },
  primaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: BLUE,
    color: WHITE,
    border: 'none',
    borderRadius: '10px',
    padding: '14px 32px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    boxShadow: `0 4px 14px rgba(26,102,255,0.25)`,
  },
  sectorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '12px',
  },
  sectorCard: (selected) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '20px 12px',
    borderRadius: '12px',
    border: `2px solid ${selected ? BLUE : GRAY_BORDER}`,
    backgroundColor: selected ? BLUE_LIGHT : WHITE,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center',
  }),
  sectorIcon: (selected) => ({
    fontSize: '24px',
    color: selected ? BLUE : TEXT_GRAY,
  }),
  sectorLabel: (selected) => ({
    fontSize: '12px',
    fontWeight: 600,
    color: selected ? BLUE : TEXT_DARK,
    lineHeight: 1.3,
  }),
  sizeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '12px',
  },
  sizeCard: (selected) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '18px 20px',
    borderRadius: '12px',
    border: `2px solid ${selected ? BLUE : GRAY_BORDER}`,
    backgroundColor: selected ? BLUE_LIGHT : WHITE,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }),
  sizeIconWrap: (selected) => ({
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    backgroundColor: selected ? BLUE : GRAY_BG,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    color: selected ? WHITE : TEXT_GRAY,
    flexShrink: 0,
    transition: 'all 0.2s ease',
  }),
  sizeText: {
    flex: 1,
  },
  sizeTitle: (selected) => ({
    fontSize: '15px',
    fontWeight: 700,
    color: selected ? BLUE : TEXT_DARK,
    marginBottom: '2px',
  }),
  sizeDesc: {
    fontSize: '13px',
    color: TEXT_GRAY,
  },
  sizeRadio: (selected) => ({
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    border: `2px solid ${selected ? BLUE : GRAY_BORDER}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.2s ease',
    backgroundColor: selected ? BLUE : 'transparent',
  }),
  sizeRadioDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: WHITE,
  },
};

const SECTORS = [
  { id: 'tecnologia', label: 'Tecnología e Informática', icon: FiMonitor },
  { id: 'salud', label: 'Salud', icon: FiHeart },
  { id: 'educacion', label: 'Educación', icon: FiBook },
  { id: 'comercio', label: 'Comercio', icon: FiShoppingCart },
  { id: 'financiero', label: 'Financiero', icon: FiDollarSign },
  { id: 'manufactura', label: 'Manufactura', icon: FiTool },
  { id: 'servicios', label: 'Servicios', icon: FiGlobe },
];

const SIZES = [
  { id: 'micro', title: 'Microempresa', desc: 'Hasta 10 empleados' },
  { id: 'pequena', title: 'Pequeña empresa', desc: 'De 11 a 50 empleados' },
  { id: 'mediana', title: 'Mediana o grande empresa', desc: 'Más de 50 empleados' },
];

const LeftPanel = ({ step }) => {
  const configs = [
    { icon: FiHome, title: 'Cuéntanos sobre tu empresa', subtitle: 'Esta información nos ayudará a personalizar tu experiencia.' },
    { icon: FiTag, title: 'Selecciona el sector al que pertenece tu empresa', subtitle: 'Esto nos permite adaptar el diagnóstico a tu industria.' },
    { icon: FiBarChart2, title: '¿Cuál es el tamaño de tu empresa?', subtitle: 'Esta información es confidencial y será utilizada únicamente con fines de diagnóstico.' },
  ];
  const { icon: Icon, title, subtitle } = configs[step - 1];

  return (
    <div style={styles.leftPanel}>
      <div style={styles.leftPanelDecor} />
      <div style={styles.leftPanelDecor2} />
      <div style={styles.iconCircle}><Icon /></div>
      <h1 style={styles.leftTitle}>{title}</h1>
      <p style={styles.leftSubtitle}>{subtitle}</p>
    </div>
  );
};

const ProgressBar = ({ step }) => (
  <div style={styles.progressContainer}>
    {[1, 2, 3].map((s, i) => (
      <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
        <div style={styles.stepCircle(s === step, s < step)}>
          {s < step ? <FiCheck size={16} /> : s}
        </div>
        {i < 2 && <div style={styles.stepLine(s <= step)} />}
      </div>
    ))}
  </div>
);

const CompanyOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [focusedField, setFocusedField] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    nit: '',
    sector: 'tecnologia',
    tamano: 'micro',
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const validateStep = () => {
    if (step === 1) {
      if (!form.nombre.trim()) {
        Swal.fire({ icon: 'warning', title: 'Campo requerido', text: 'Por favor ingresa el nombre de la empresa.', confirmButtonColor: BLUE });
        return false;
      }
      if (!form.nit.trim()) {
        Swal.fire({ icon: 'warning', title: 'Campo requerido', text: 'Por favor ingresa el NIT de la empresa.', confirmButtonColor: BLUE });
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < 3) setStep(s => s + 1);
  };

  const handleFinish = () => {
    if (!validateStep()) return;
    // Preparar payload
    const payload = {
      nombre: form.nombre,
      nit: form.nit,
      sector: form.sector,
      tamano: form.tamano,
      maneja_datos_sensibles: false,
    };

    const token = typeof window !== 'undefined' ? window.localStorage.getItem('access_token') : null;
    if (!token) {
      Swal.fire({ icon: 'warning', title: 'No autenticado', text: 'Por favor inicia sesión antes de continuar.' }).then(() => navigate('/login'));
      return;
    }

    Swal.fire({ icon: 'info', title: 'Guardando...', text: 'Enviando datos de la empresa', showConfirmButton: false, timer: 1000 });

    fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '') + '/api/v1/companies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d.detail || res.statusText || 'Error al guardar la empresa');
        }
        return res.json();
      })
      .then((company) => {
        // Actualizar usuario en localStorage
        try {
          const raw = window.localStorage.getItem('user');
          if (raw) {
            const user = JSON.parse(raw);
            user.empresa_id = company.id;
            window.localStorage.setItem('user', JSON.stringify(user));
          }
        } catch (e) {
          // ignore
        }
        Swal.fire({ icon: 'success', title: '¡Registro completado!', text: 'Los datos de tu empresa han sido guardados correctamente.', confirmButtonColor: BLUE }).then(() => navigate('/welcome'));
      })
      .catch((err) => {
        Swal.fire({ icon: 'error', title: 'Error', text: String(err.message || err) });
      });
  };

  const handleSkip = () => {
    Swal.fire({
      icon: 'question',
      title: '¿Saltar registro?',
      text: 'Puedes completar esta información más tarde.',
      showCancelButton: true,
      confirmButtonColor: BLUE,
      cancelButtonColor: '#888',
      confirmButtonText: 'Saltar',
      cancelButtonText: 'Cancelar',
    }).then(r => { if (r.isConfirmed) navigate('/'); });
  };

  const handleBack = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const inputStyle = (field) => ({
    ...styles.inputWrapper,
    ...(focusedField === field ? styles.inputWrapperFocused : {}),
  });

  return (
    <div style={styles.container}>
      <LeftPanel step={step} />
      <div style={styles.rightPanel}>
        <div style={styles.topBar}>
          <button style={styles.backBtn} onClick={handleBack} disabled={step === 1}>
            <FiArrowLeft size={14} /> Volver
          </button>
          <button style={styles.skipBtn} onClick={handleSkip}>
            Saltar <FiSkipForward size={14} />
          </button>
        </div>

        <ProgressBar step={step} />

        {step === 1 && (
          <>
            <div style={styles.stepIndicator}>(1/3)</div>
            <h2 style={styles.formTitle}>Información de la empresa</h2>
            <p style={styles.formSubtitle}>Ingresa los datos básicos para comenzar.</p>

            <div style={styles.fieldGroup}>
              <label style={styles.fieldLabel}>Nombre de la empresa</label>
              <div style={inputStyle('nombre')}>
                <FiBriefcase style={styles.inputIcon} />
                <input
                  style={styles.input}
                  placeholder="Ej. Soluciones Tecnológicas SAS"
                  value={form.nombre}
                  onChange={e => update('nombre', e.target.value)}
                  onFocus={() => setFocusedField('nombre')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.fieldLabel}>NIT</label>
              <div style={inputStyle('nit')}>
                <FiFile style={styles.inputIcon} />
                <input
                  style={styles.input}
                  placeholder="Ej. 900123456-7"
                  value={form.nit}
                  onChange={e => update('nit', e.target.value)}
                  onFocus={() => setFocusedField('nit')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div style={styles.stepIndicator}>(2/3)</div>
            <h2 style={styles.formTitle}>¿A qué sector pertenece?</h2>
            <p style={styles.formSubtitle}>Selecciona el sector principal de tu empresa.</p>

            <div style={styles.sectorGrid}>
              {SECTORS.map(({ id, label, icon: Icon }) => (
                <div
                  key={id}
                  style={styles.sectorCard(form.sector === id)}
                  onClick={() => update('sector', id)}
                >
                  <Icon style={styles.sectorIcon(form.sector === id)} />
                  <span style={styles.sectorLabel(form.sector === id)}>{label}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div style={styles.stepIndicator}>(3/3)</div>
            <h2 style={styles.formTitle}>Selecciona el tamaño de tu empresa</h2>
            <p style={styles.formSubtitle}>Elige la opción que mejor la describa.</p>

            <div style={styles.sizeList}>
              {SIZES.map(({ id, title, desc }) => {
                const selected = form.tamano === id;
                return (
                  <div
                    key={id}
                    style={styles.sizeCard(selected)}
                    onClick={() => update('tamano', id)}
                  >
                    <div style={styles.sizeIconWrap(selected)}>
                      <FiHome size={22} />
                    </div>
                    <div style={styles.sizeText}>
                      <div style={styles.sizeTitle(selected)}>{title}</div>
                      <div style={styles.sizeDesc}>{desc}</div>
                    </div>
                    <div style={styles.sizeRadio(selected)}>
                      {selected && <div style={styles.sizeRadioDot} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div style={styles.btnRow}>
          <button
            style={{
              ...styles.primaryBtn,
              ...(step === 3 ? {} : {}),
            }}
            onClick={step === 3 ? handleFinish : handleNext}
          >
            {step === 3 ? 'Finalizar ✓' : 'Continuar →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyOnboarding;
