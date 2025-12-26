/* ============================================
   KANBAN APP - JAVASCRIPT
   Issue 1 + Issue 2 + Issue 3: CRUD Completo
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
let tasqueEnEdicio = null // ID de la tasca en edición

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
      console.log('📭 No hi ha tasques guardades. Inicialitzant amb dades de prova...')
      return []
    }
  } catch (error) {
    console.error('❌ Error al carregar tasques:', error)
    return []
  }
}

/**
 * Guarda les tasques a localStorage
 * @param {Array} tasquesAGuardar - Array de tasques a guardar
 */
function guardarTasques(tasquesAGuardar) {
  try {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(tasquesAGuardar))
    tasques = tasquesAGuardar
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
      descripcio: 'Implementar filtros por estado y prioridad, y búsqueda por texto',
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
   CRUD - CREATE (Afegir tasca)
   ============================================ */

/**
 * Afegeix una nova tasca o actualitza una existente
 * @param {Event} e - Evento del formulario
 */
function afegirOActualitzarTasca(e) {
  e.preventDefault()

  // Obtenir valors del formulari
  const formData = new FormData(document.getElementById('formulariTasca'))
  const titol = formData.get('titol').trim()
  const descripcio = formData.get('descripcio').trim()
  const prioritat = formData.get('prioritat')
  const dataVenciment = formData.get('dataVenciment')

  // Validació
  if (!titol) {
    alert('❌ El título es obligatorio')
    return
  }

  if (tasqueEnEdicio) {
    // ACTUALIZAR tasca existente
    const tasca = tasques.find((t) => t.id === tasqueEnEdicio)
    if (tasca) {
      tasca.titol = titol
      tasca.descripcio = descripcio
      tasca.prioritat = prioritat
      tasca.dataVenciment = dataVenciment
      console.log(`✏️ Tasca "${titol}" actualizada`)
    }
    tasqueEnEdicio = null
  } else {
    // CREAR nueva tasca
    const novaTasca = {
      id: generarID(),
      titol,
      descripcio,
      prioritat,
      dataVenciment,
      estat: CONFIG.ESTADOS.PER_FER,
      creatEl: new Date().toISOString(),
    }
    tasques.push(novaTasca)
    console.log(`✅ Nueva tasca "${titol}" creada`)
  }

  // Guardar y renderizar
  guardarTasques(tasques)
  renderTauler(tasques)
  document.getElementById('formulariTasca').reset()
  document.getElementById('btnAfegir').textContent = 'Afegir Tasca'
  actualitzarEstadistiques()
}

/* ============================================
   CRUD - READ (Renderizar tablero)
   ============================================ */

/**
 * Renderiza completamente el tablero Kanban
 * @param {Array} tasquesARenderitzar - Array de tasques a renderizar
 */
function renderTauler(tasquesARenderitzar = tasques) {
  const estados = [
    { key: CONFIG.ESTADOS.PER_FER, contenedor: 'column-perFer', contador: 'count-perFer' },
    { key: CONFIG.ESTADOS.EN_CURS, contenedor: 'column-enCurs', contador: 'count-enCurs' },
    { key: CONFIG.ESTADOS.FET, contenedor: 'column-fet', contador: 'count-fet' },
  ]

  estados.forEach(({ key, contenedor, contador }) => {
    const container = document.getElementById(contenedor)
    const contadorElement = document.getElementById(contador)

    // Filtrar tasques por estado
    const tasquesPorEstat = tasquesARenderitzar.filter((t) => t.estat === key)

    // Actualizar contador
    contadorElement.textContent = tasquesPorEstat.length

    // Limpiar contenedor
    container.innerHTML = ''

    // Renderizar tarjetas
    tasquesPorEstat.forEach((tasca) => {
      const card = crearTarjetaTasca(tasca)
      container.appendChild(card)
    })
  })

  console.log('🎨 Tauler renderitzat')
}

/**
 * Crea una tarjeta HTML para una tasca
 * @param {Object} tasca - Objeto de tasca
 * @returns {HTMLElement} Elemento HTML de la tarjeta
 */
function crearTarjetaTasca(tasca) {
  const card = document.createElement('div')
  card.className = `task-card priority-${tasca.prioritat}`
  card.innerHTML = `
    <div class="task-header">
      <h4 class="task-title">${tasca.titol}</h4>
      <span class="priority-badge ${tasca.prioritat}">${tasca.prioritat.charAt(0).toUpperCase() + tasca.prioritat.slice(1)}</span>
    </div>
    ${tasca.descripcio ? `<p class="task-description">${tasca.descripcio}</p>` : ''}
    ${tasca.dataVenciment ? `<p class="task-date">📅 ${formatarData(tasca.dataVenciment)}</p>` : ''}
    <div class="task-actions">
      <button class="task-btn-edit" onclick="editarTasca('${tasca.id}')">✏️ Editar</button>
      <button class="task-btn-delete" onclick="eliminarTasca('${tasca.id}')">🗑️ Eliminar</button>
      <select class="task-btn-status" onchange="canviarEstat('${tasca.id}', this.value)">
        <option value="${CONFIG.ESTADOS.PER_FER}" ${tasca.estat === CONFIG.ESTADOS.PER_FER ? 'selected' : ''}>Per fer</option>
        <option value="${CONFIG.ESTADOS.EN_CURS}" ${tasca.estat === CONFIG.ESTADOS.EN_CURS ? 'selected' : ''}>En curs</option>
        <option value="${CONFIG.ESTADOS.FET}" ${tasca.estat === CONFIG.ESTADOS.FET ? 'selected' : ''}>Fet</option>
      </select>
    </div>
  `
  return card
}

/* ============================================
   CRUD - UPDATE (Editar tasca)
   ============================================ */

/**
 * Carga una tasca en el formulario para editar
 * @param {string} id - ID de la tasca a editar
 */
function editarTasca(id) {
  const tasca = tasques.find((t) => t.id === id)
  if (!tasca) {
    alert('❌ Tasca no encontrada')
    return
  }

  // Precargar formulario
  document.getElementById('titol').value = tasca.titol
  document.getElementById('descripcio').value = tasca.descripcio
  document.getElementById('prioritat').value = tasca.prioritat
  document.getElementById('dataVenciment').value = tasca.dataVenciment

  // Cambiar botón a "Guardar cambios"
  document.getElementById('btnAfegir').textContent = 'Guardar Cambios'

  // Marcar como en edición
  tasqueEnEdicio = id

  // Scroll al formulario
  document.getElementById('formulariTasca').scrollIntoView({ behavior: 'smooth' })

  console.log(`✏️ Editando tasca: "${tasca.titol}"`)
}

/* ============================================
   CRUD - DELETE (Eliminar tasca)
   ============================================ */

/**
 * Elimina una tasca con confirmación
 * @param {string} id - ID de la tasca a eliminar
 */
function eliminarTasca(id) {
  const tasca = tasques.find((t) => t.id === id)
  if (!tasca) {
    alert('❌ Tasca no encontrada')
    return
  }

  // Confirmación
  if (!confirm(`¿Estás seguro de que quieres eliminar la tasca "${tasca.titol}"?`)) {
    return
  }

  // Eliminar
  tasques = tasques.filter((t) => t.id !== id)
  guardarTasques(tasques)
  renderTauler(tasques)
  actualitzarEstadistiques()

  console.log(`🗑️ Tasca "${tasca.titol}" eliminada`)
}

/* ============================================
   CAMBIAR ESTADO DE TASCA
   ============================================ */

/**
 * Cambia el estado de una tasca
 * @param {string} id - ID de la tasca
 * @param {string} nuevoEstat - Nuevo estado
 */
function canviarEstat(id, nuevoEstat) {
  const tasca = tasques.find((t) => t.id === id)
  if (!tasca) {
    alert('❌ Tasca no encontrada')
    return
  }

  tasca.estat = nuevoEstat
  guardarTasques(tasques)
  renderTauler(tasques)
  actualitzarEstadistiques()

  console.log(`↔️ Tasca "${tasca.titol}" movida a "${nuevoEstat}"`)
}

/* ============================================
   ESTADÍSTIQUES
   ============================================ */

/**
 * Actualiza los contadores de estadísticas
 */
function actualitzarEstadistiques() {
  const total = tasques.length
  const perFer = tasques.filter((t) => t.estat === CONFIG.ESTADOS.PER_FER).length
  const enCurs = tasques.filter((t) => t.estat === CONFIG.ESTADOS.EN_CURS).length
  const fet = tasques.filter((t) => t.estat === CONFIG.ESTADOS.FET).length
  const percentatge = total > 0 ? Math.round((fet / total) * 100) : 0

  document.getElementById('stat-total').textContent = total
  document.getElementById('stat-perFer').textContent = perFer
  document.getElementById('stat-enCurs').textContent = enCurs
  document.getElementById('stat-fet').textContent = fet
  document.getElementById('stat-percentatge').textContent = `${percentatge}%`

  console.log(`📊 Estadísticas actualizadas: Total=${total}, PerFer=${perFer}, EnCurs=${enCurs}, Fet=${fet}, Completades=${percentatge}%`)
}

/* ============================================
   INICIALITZACIÓ
   ============================================ */

/**
 * Inicializa la aplicación
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

  // 3. Renderizar tablero
  renderTauler(tasques)
  actualitzarEstadistiques()

  console.log('✅ App inicializada correctamente')
  console.log(`📊 Total de tasques: ${tasques.length}`)
}

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
  inicialitzarApp()

  // Event listeners
  setupFormulariListeners()
  setupFiltresListeners()
})

/* ============================================
   CONFIGURACIÓN DE EVENT LISTENERS
   ============================================ */

function setupFormulariListeners() {
  const formulari = document.getElementById('formulariTasca')
  if (formulari) {
    formulari.addEventListener('submit', afegirOActualitzarTasca)
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
      console.log('🔽 Filtre d\'estat activat (funcionalitat pendent per Issue 4)')
    })
  }

  if (filtrePrioritat) {
    filtrePrioritat.addEventListener('change', function () {
      console.log('⚡ Filtre de prioritat activat (funcionalitat pendent per Issue 4)')
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
console.log('🎯 Kanban App - Issue 3: CRUD i renderització')
console.log('='.repeat(60))
console.log('✅ Implementat crear tasca amb validació')
console.log('✅ Implementat editar tasca (precargar formulario)')
console.log('✅ Implementat eliminar tasca (con confirmación)')
console.log('✅ Renderización centralizada (renderTauler)')
console.log('✅ Cambio de estado mediante select')
console.log('✅ Diferenciación visual por prioridad')
console.log('✅ Estadísticas en tiempo real')
console.log('')
console.log('Próximas issues:')
console.log('- Issue 4: Filtres i cerca')
console.log('- Issue 5: Responsive, Git flow i desplegament')
console.log('='.repeat(60))

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
