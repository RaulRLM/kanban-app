/* ============================================
   KANBAN APP - JAVASCRIPT
   Issue 1 + Issue 2: Estructura base i persistència
   ============================================ */

/* ============================================
   ESTRUCTURA DE DADES - MODELO DE TASCA
   ============================================ */
/**
 * Model de tasca:
 * {
 *     id: string (unique),
 *     titol: string (obligatori),
 *     descripcio: string (opcional),
 *     prioritat: 'baixa' | 'mitjana' | 'alta',
 *     dataVenciment: string (format: YYYY-MM-DD),
 *     estat: 'perFer' | 'enCurs' | 'fet',
 *     creatEl: string (ISO date)
 * }
 */

// Configuració
const CONFIG = {
  STORAGE_KEY: 'tasquesKanban',
  ESTADOS: {
    PER_FER: 'perFer',
    EN_CURS: 'enCurs',
    FET: 'fet',
  },
  PRIORITATS: {
    BAIXA: 'baixa',
    MITJANA: 'mitjana',
    ALTA: 'alta',
  },
}

// Variable global per mantenir tasques en memòria
let tasques = []

/* ============================================
   PERSISTÈNCIA - localStorage
   ============================================ */

/**
 * Carrega les tasques desde localStorage
 * @returns {Array} Array de tasques
 */
function carregarTasques() {
  try {
    const dades = localStorage.getItem(CONFIG.STORAGE_KEY)
    if (dades) {
      tasques = JSON.parse(dades)
      console.log(`✅ Carregades ${tasques.length} tasques desde localStorage`)
      return tasques
    } else {
      console.log(
        '📭 No hi ha tasques guardades. Inicialitzant amb dades de prova...',
      )
      return []
    }
  } catch (error) {
    console.error('❌ Error al carregar tasques:', error)
    return []
  }
}

/**
 * Guarda les tasques a localStorage
 * @param {Array} tasques - Array de tasques a guardar
 */
function guardarTasques(tasquesAGuardar) {
  try {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(tasquesAGuardar))
    console.log(`💾 Guardades ${tasquesAGuardar.length} tasques a localStorage`)
  } catch (error) {
    console.error('❌ Error al guardar tasques:', error)
  }
}

/* ============================================
   DADES DE PROVA
   ============================================ */

/**
 * Crea dades de prova (solo si localStorage está vacío)
 * @returns {Array} Array de tasques de prova
 */
function crearDadesPruebaCanonicals() {
  return [
    {
      id: generarID(),
      titol: 'Diseñar interfaz de usuario',
      descripcio: 'Crear wireframes y mockups para la aplicación Kanban',
      prioritat: CONFIG.PRIORITATS.ALTA,
      dataVenciment: '2026-01-10',
      estat: CONFIG.ESTADOS.EN_CURS,
      creatEl: new Date().toISOString(),
    },
    {
      id: generarID(),
      titol: 'Implementar CRUD de tasques',
      descripcio: 'Crear, leer, actualizar y eliminar tasques en la aplicación',
      prioritat: CONFIG.PRIORITATS.ALTA,
      dataVenciment: '2026-01-15',
      estat: CONFIG.ESTADOS.PER_FER,
      creatEl: new Date().toISOString(),
    },
    {
      id: generarID(),
      titol: 'Configurar localStorage',
      descripcio: 'Implementar persistencia de datos con localStorage',
      prioritat: CONFIG.PRIORITATS.MITJANA,
      dataVenciment: '2026-01-08',
      estat: CONFIG.ESTADOS.FET,
      creatEl: new Date().toISOString(),
    },
    {
      id: generarID(),
      titol: 'Añadir filtros y búsqueda',
      descripcio:
        'Implementar filtros por estado y prioridad, y búsqueda por texto',
      prioritat: CONFIG.PRIORITATS.MITJANA,
      dataVenciment: '2026-01-20',
      estat: CONFIG.ESTADOS.PER_FER,
      creatEl: new Date().toISOString(),
    },
    {
      id: generarID(),
      titol: 'Desplegar en GitHub Pages',
      descripcio: 'Configurar y publicar la aplicación en GitHub Pages',
      prioritat: CONFIG.PRIORITATS.BAIXA,
      dataVenciment: '2026-01-25',
      estat: CONFIG.ESTADOS.PER_FER,
      creatEl: new Date().toISOString(),
    },
  ]
}

/* ============================================
   FUNCIONS AUXILIARS
   ============================================ */

/**
 * Genera un ID único para una tasca
 * @returns {string} ID único
 */
function generarID() {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Formatea una fecha para mostrarla amistosamente
 * @param {string} data - Fecha en formato ISO o YYYY-MM-DD
 * @returns {string} Fecha formateada
 */
function formatarData(data) {
  if (!data) return ''
  try {
    const date = new Date(data)
    return date.toLocaleDateString('ca-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch (error) {
    return data
  }
}

/* ============================================
   INICIALITZACIÓ
   ============================================ */

/**
 * Inicializa la aplicación
 * - Carga tasques desde localStorage
 * - Añade datos de prueba si es necesario
 * - Renderiza el tablero
 * - Configura event listeners
 */
function inicialitzarApp() {
  console.log('🚀 Inicializando Kanban App...')

  // 1. Cargar tasques
  tasques = carregarTasques()

  // 2. Si no hay tasques, crear datos de prueba
  if (tasques.length === 0) {
    tasques = crearDadesPruebaCanonicals()
    guardarTasques(tasques)
    console.log('📦 Datos de prueba creados e inicializados')
  }

  // 3. Renderizar taulell (se implementará en Issue 3)
  console.log('✅ App inicializada correctamente')
  console.log(`📊 Total de tasques: ${tasques.length}`)
}

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
  inicialitzarApp()

  // Event listeners (funcionalidad implementada en Issues 3 y 4)
  setupFormulariListeners()
  setupFiltresListeners()
})

/* ============================================
   CONFIGURACIÓN DE EVENT LISTENERS
   ============================================ */

function setupFormulariListeners() {
  const formulari = document.getElementById('formulariTasca')
  if (formulari) {
    formulari.addEventListener('submit', function (e) {
      e.preventDefault()
      console.log('📝 Formulari enviat (funcionalitat pendent per Issue 3)')
    })
  }
}

function setupFiltresListeners() {
  const cercaText = document.getElementById('cercaText')
  const filtreEstat = document.getElementById('filtreEstat')
  const filtrePrioritat = document.getElementById('filtrePrioritat')
  const btnLimpiar = document.getElementById('btnLimpiarFiltres')

  if (cercaText) {
    cercaText.addEventListener('input', function () {
      console.log('🔍 Cerca activada (funcionalitat pendent per Issue 4)')
    })
  }

  if (filtreEstat) {
    filtreEstat.addEventListener('change', function () {
      console.log(
        "🔽 Filtre d'estat activat (funcionalitat pendent per Issue 4)",
      )
    })
  }

  if (filtrePrioritat) {
    filtrePrioritat.addEventListener('change', function () {
      console.log(
        '⚡ Filtre de prioritat activat (funcionalitat pendent per Issue 4)',
      )
    })
  }

  if (btnLimpiar) {
    btnLimpiar.addEventListener('click', function () {
      console.log('🧹 Neteja de filtres (funcionalitat pendent per Issue 4)')
    })
  }
}

/* ============================================
   CONSOLE DE DEBUG
   ============================================ */

console.log('='.repeat(60))
console.log('🎯 Kanban App - Issue 2: Model de dades i persistència')
console.log('='.repeat(60))
console.log(
  '✅ Definit model de tasca (id, titol, descripcio, prioritat, dataVenciment, estat, creatEl)',
)
console.log('✅ Implementades funcions: carregarTasques(), guardarTasques()')
console.log('✅ Inicialització amb dades de prova')
console.log('✅ localStorage amb clau: "tasquesKanban"')
console.log('')
console.log('Próximas issues:')
console.log('- Issue 3: CRUD complet i renderització')
console.log('- Issue 4: Filtres, cerca i estadístiques')
console.log('- Issue 5: Responsive, Git flow i desplegament')
console.log('='.repeat(60))
