"# 📋 Kanban App - Gestió de Tasques

## 📝 Descripció

**Kanban App** és una aplicació web moderna per gestionar tasques utilitzant la metodologia Kanban. Permet organitzar les teves tasques en tres columnes d'estat (**Per fer**, **En curs**, **Fet**), amb funcionalitats completes de persistència local, filtres avançats, estadístiques en temps real i disseny totalment responsiu.

### ✨ Característiques principals
- ✅ Gestió completa de tasques (crear, editar, eliminar)
- 📊 Tauler Kanban interactiu amb 3 columnes de treball
- 💾 Persistència de dades amb localStorage (sense servidor)
- 🔍 Filtres avançats (estat, prioritat, cerques de text)
- 📈 Estadístiques en temps real amb percentatge de finalització
- 📱 Disseny responsiu (desktop, tablet, mòbil i extra-petit)
- 🎨 Interfície moderna amb colors i animacions suaus
- ⚡ Rendiment ràpid sense dependències externes

## 📂 Estructura del Projecte

```
kanban-app/
├── index.html              # Estructura HTML semàntica (204 línies)
├── css/
│   └── estils.css          # Estils responsivos (650+ línies)
├── js/
│   └── script.js           # Lògica de l'aplicació (850+ línies)
├── img/                    # Carpeta per a imatges futures
├── .github/
│   └── workflows/
│       └── deploy.yml      # Configuració de desplegament en GitHub Pages
├── .gitignore              # Excloure arxius innecessaris
└── README.md               # Aquest arxiu
```

## 🚀 Começa Aquí

### 1️⃣ Clonar o Descarregar el Projecte

```bash
# Clonar el repositori
git clone https://github.com/[username]/kanban-app.git

# O descarregar el ZIP directament des de GitHub
```

### 2️⃣ Obrir l'Aplicació

**Opció 1: Directament en el navegador**
```bash
# Fer doble clic al fitxer index.html
# O arrossegar-lo al navegador
```

**Opció 2: Amb un servidor local (recomanat)**
```bash
# Amb Python 3
python -m http.server 8000

# Amb Node.js i http-server
npx http-server

# Amb PHP
php -S localhost:8000
```

Després accedeix a: `http://localhost:8000`

### 3️⃣ L'Aplicació Està Llista!

No necessita instal·lació ni dependències externes. Només obrir `index.html` en un navegador modern.

## 📖 Com Usar l'Aplicació

### ➕ Crear una Tasca Nova

1. Completa el formulari "Afegir Nova Tasca" amb:
   - **Títol** * (obligatori) - Nom de la tasca
   - **Descripció** (opcional) - Detalls de la tasca
   - **Prioritat** (baixa/mitjana/alta) - Nivell d'urgència
   - **Data Límit** (opcional) - Quan s'ha de completar

2. Fes clic a "Afegir Tasca" per crear-la
3. La tasca apareix automàticament a la columna "Per fer"

**Exemple:**
```
Títol: Implementar autenticació
Descripció: Afegir login amb JWT tokens
Prioritat: Alta
Data Límit: 2025-12-31
```

### ✏️ Editar una Tasca Existent

1. Localitza la tasca al tauler Kanban
2. Fes clic al botó "Editar" (botó blau)
3. El formulari es carrega amb les dades actuals
4. Modifica els camps que necessites
5. Fes clic a "Afegir Tasca" per guardar els canvis

### 🔄 Canviar l'Estat d'una Tasca

1. Localitza la tasca al tauler
2. Selecciona el nou estat del desplegable:
   - 📌 **Per fer** - Tasca sense començar
   - ⚙️ **En curs** - Tasca que s'està completant
   - ✅ **Fet** - Tasca completada
3. Els canvis es guarden automàticament

### 🗑️ Eliminar una Tasca

1. Localitza la tasca al tauler
2. Fes clic al botó "Eliminar" (botó vermell)
3. Confirma la supressió en el diàleg emergent
4. La tasca desapareix del tauler i de l'emmagatzematge

### 🔍 Cercar Tasques

Utilitza la barra de cercar per trobar tasques ràpidament:
- **Busca en**: Títol + Descripció (case-insensitive)
- **Exemple**: Escriu "autent" per trobar "Implementar autenticació"
- Els resultats es mostren en temps real
- Neteja el text per veure totes les tasques

### 🎯 Filtrar Tasques

#### Per Estat
Selecciona un estat del desplegable "Estat":
- Tots els estats (per defecte)
- Per fer
- En curs
- Fet

#### Per Prioritat
Selecciona una prioritat del desplegable "Prioritat":
- Totes les prioritats (per defecte)
- 🟢 Baixa (prioritat baixa)
- 🟡 Mitjana (prioritat mitjana)
- 🔴 Alta (prioritat alta)

#### Combinació de Filtres
Pots combinar múltiples filtres simultàniament:
```
Exemple: Mostra "Tasques d'alta prioritat que estan en curs"
- Estat: En curs
- Prioritat: Alta
- Resultat: Només tasques que compleixen ambdós criteris
```

### 🧹 Netejar Filtres

Fes clic al botó "Netejar Filtres" per:
- Esborrar el text de cerca
- Restablir tots els filtres a "tots"
- Veure totes les tasques de nou

## 📊 Estadístiques en Temps Real

El panell de estadístiques a la dreta mostra:

| Estadística | Descripció |
|------------|-----------|
| **Total de Tasques** | Nombre total de tasques (filtrades o no) |
| **Per fer** | Tasques que no han començat |
| **En curs** | Tasques actuals en la qual es treballa |
| **Completades** | Tasques que ja estan acabades |
| **% Completades** | Percentatge de tasques finalitzades |

**Nota:** Les estadístiques es mostren **filtrades** si tens activat algun filtre, perquè vulgis veure el progrés dins d'un grup específic.

### 📈 Exemple d'Estadístiques

```
Total de Tasques: 10 tasques
Per fer: 3 tasques
En curs: 5 tasques
Completades: 2 tasques
% Completades: 20%
```

## 💾 Emmagatzematge de Dades

- **Sistema**: localStorage del navegador
- **Clau**: `tasquesKanban`
- **Persistència**: Els dados es guarden automàticament
- **Durada**: Fins que l'usuari borri les dades del navegador
- **Sincronització**: Sincronització en temps real entre pestanyes del mateix navegador

## 🎨 Guia de Estils

### Esquema de Colors
- 🔵 **Primari** (#3b82f6) - Accions i elements destacats
- 🟢 **Secundari** (#10b981) - Confirmacions i èxit
- 🔴 **Perill** (#ef4444) - Eliminar i avisos
- 🟡 **Avís** (#f59e0b) - Informació important

### Prioritats de Tasques
- 🟢 **Baixa** - Tasques de prioritat baixa (verd)
- 🟡 **Mitjana** - Tasques normals (groc)
- 🔴 **Alta** - Tasques urgents (vermell)

## 📱 Responsivitat

L'aplicació s'adapta perfectament a tots els dispositius:

| Dispositiu | Resolució | Columns Kanban |
|-----------|----------|----------------|
| **Desktop** | > 768px | 3 columnes (per fer, en curs, fet) |
| **Tablet** | 481-768px | 1 columna apilada |
| **Mòbil** | < 480px | 1 columna apilada |

### Millores Responsives
- ✅ Font sizes adaptatius
- ✅ Padding i margin reducits en mòbil
- ✅ Botons 100% ample en mòbil
- ✅ Tapa virtual del navegador (16px font min)
- ✅ Touch-friendly buttons (mín. 44x44px)

## 🏗️ Arquitectura Tècnica

### Estructura del Codi JavaScript

```javascript
// 1. CONFIGURACIÓ (CONFIG object)
const CONFIG = { ... }

// 2. ESTAT GLOBAL
let tasques = []
let tasqueEnEdicio = null
let filtresActius = { text: '', estat: '', prioritat: '' }

// 3. FUNCIONS DE PERSISTÈNCIA
- carregarTasques()
- guardarTasques()

// 4. FUNCIONS CRUD
- afegirOActualitzarTasca()
- editarTasca()
- eliminarTasca()
- canviarEstat()

// 5. FUNCIONS DE RENDERITZACIÓ
- renderTauler()
- crearTarjetaTasca()

// 6. FUNCIONS DE FILTRES
- getTasquesFiltrades()
- aplicarFiltres()
- netejarFiltres()

// 7. FUNCIONS D'ESTADÍSTIQUES
- actualitzarEstadistiques()

// 8. INICIALITZACIÓ
- inicialitzarApp()
- setupFormulariListeners()
- setupFiltresListeners()
```

### Model de Dades (Tasca)

```javascript
{
  id: "uuid-1234",                  // Identificador únic
  titol: "Tasca Exemple",            // Títol de la tasca
  descripcio: "Descripció...",       // Detalls opcionals
  prioritat: "mitjana",              // "baixa" | "mitjana" | "alta"
  dataVenciment: "2025-12-31",       // Format YYYY-MM-DD
  estat: "perFer",                   // "perFer" | "enCurs" | "fet"
  creatEl: "2025-12-26T10:30:00Z"   // Timestamp ISO
}
```

## 🔧 Tecnologies Utilitzades

| Tecnologia | Versió | Usos |
|-----------|--------|------|
| **HTML5** | - | Marcatge semàntic, form controls |
| **CSS3** | - | Flexbox, Grid, Media queries |
| **JavaScript** | ES6+ | Lògica, DOM manipulation, localStorage |
| **localStorage** | Web API | Persistència de dades |
| **Git** | 2.0+ | Control de versions |
| **GitHub Pages** | - | Desplegament gratuït |

## 🖥️ Requeriments

- **Navegador**: Qualsevol navegador modern (Chrome, Firefox, Safari, Edge)
- **HTML5 Support**: localStorage, Date input
- **JavaScript**: ES6 (fetch, arrow functions, destructuring)
- **Cap dependència externa**: Cap npm package necessari!

## 🌐 Desplegament en GitHub Pages

L'aplicació es desplegava automàticament en GitHub Pages quan es fa push a `main`:

1. Cada commit a `main` declanxa un workflow de GitHub Actions
2. L'aplicació es construeix i es desplegada a GitHub Pages
3. Accessible a: `https://[username].github.io/kanban-app/`

### Configuració del Desplegament

El workflow està configurat a `.github/workflows/deploy.yml`:
```yaml
- Trigger: Push a main
- Build: Simplement copiar arxius (res a compilar)
- Deploy: Desplegar a gh-pages branch
- Publicar: Des de /root del repositori
```

## 📚 Documentació Addicional

### Roadmap de Desenvolupament

1. **Issue 1** ✅ - Inicialització i estructura base
2. **Issue 2** ✅ - Model de dades i persistència localStorage
3. **Issue 3** ✅ - CRUD complet i renderització del Kanban
4. **Issue 4** ✅ - Filtres, cerca i estadístiques
5. **Issue 5** ✅ - Responsive design, desplegament i documentació

### Git Workflow Utilitzat

- **main**: Branca principal (producció)
- **feature/issue-X**: Branca per cada feature
- **Pull Requests**: Per revisar canvis abans de merger

### Commits Semantics

```bash
feat: nova funcionalitat
fix: correció de bugs
refactor: millora de codi
docs: documentació
style: formatació de codi
```

## 🐛 Informar de Bugs

Si trobes algun problema:
1. Anar a la secció "Issues" del repositori
2. Crear un "New Issue"
3. Descriu el problema amb detalls
4. Inclou passos per reproduir-ho

## 📄 Llicència

Aquest projecte és de codi obert. Pots usar-lo lliurement per propòsits educatius.

## 👤 Autor

**Carles Canals Gozalvez**  
Pràctica 4 - Aplicació Kanban de Gestió de Tasques  
Universitat / Instituto (2025)

## 📞 Contacte

- 🔗 **GitHub**: [kanban-app](https://github.com/[username]/kanban-app)
- 🌐 **Web**: [kanban-app.github.io](https://[username].github.io/kanban-app)

---

**Darrera actualització**: 26 de Desembre de 2025 (Issue 5)  
**Status**: ✅ Completat - Totes les funcionalitats implementades i testejades

## Llicència

Projecte educatiu - 2025"