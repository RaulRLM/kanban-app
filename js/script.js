/* ============================================
   KANBAN APP - JAVASCRIPT
   Inicialització i estructura base
   ============================================ */

// Esperar a que el DOM estigui carregat
document.addEventListener('DOMContentLoaded', function () {
  console.log('🚀 Aplicació Kanban iniciada')

  // Inicialitzar l'aplicació
  inicialitzarApp()
})

/* ============================================
   INICIALITZACIÓ
   ============================================ */
function inicialitzarApp() {
  console.log('Inicialitzant aplicació...')

  // Aquí s'afegirà la lògica de inicialització:
  // - Carregar tasques desde localStorage
  // - Renderitzar el tauler
  // - Afegir event listeners
  // - Actualitzar estadístiques
}

/* ============================================
   GESTIÓ DE FORMULARI
   ============================================ */
document
  .getElementById('formulariTasca')
  ?.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log('Formulari enviat (funcionalitat pendent per Issue 3)')
  })

/* ============================================
   FILTRES I CERCA
   ============================================ */
document.getElementById('cercaText')?.addEventListener('input', function () {
  console.log('Cerca activada (funcionalitat pendent per Issue 4)')
})

document.getElementById('filtreEstat')?.addEventListener('change', function () {
  console.log("Filtre d'estat activat (funcionalitat pendent per Issue 4)")
})

document
  .getElementById('filtrePrioritat')
  ?.addEventListener('change', function () {
    console.log(
      'Filtre de prioritat activat (funcionalitat pendent per Issue 4)',
    )
  })

document
  .getElementById('btnLimpiarFiltres')
  ?.addEventListener('click', function () {
    console.log('Neteja de filtres (funcionalitat pendent per Issue 4)')
  })

/* ============================================
   ESTRUCTURA DE DADES (Model)
   ============================================ */
// Aquesta estructura es completarà a la Issue 2
// Model de tasca:
// {
//     id: unique_id,
//     titol: string,
//     descripcio: string,
//     prioritat: 'baixa' | 'mitjana' | 'alta',
//     dataVenciment: date,
//     estat: 'perFer' | 'enCurs' | 'fet',
//     creatEl: date
// }

/* ============================================
   FUNCIONS AUXILIARS
   ============================================ */
function generarID() {
  // Generar ID únic per a les tasques
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

function formatarData(data) {
  // Formatar data per mostrar-la amistosament
  if (!data) return ''
  const date = new Date(data)
  return date.toLocaleDateString('ca-ES')
}

/* ============================================
   CONSOLE DE DEBUG
   ============================================ */
console.log('='.repeat(50))
console.log('Kanban App - Estructuració Base Completada')
console.log('='.repeat(50))
console.log('Issues a treballar:')
console.log('- Issue 2: Model de dades i persistència')
console.log('- Issue 3: CRUD i renderització')
console.log('- Issue 4: Filtres i estadístiques')
console.log('- Issue 5: Responsive i desplegament')
console.log('='.repeat(50))
