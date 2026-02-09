# Walmart E-Commerce Frontend

Aplicación web para búsqueda y filtrado de productos, desarrollada con React 18.

## Características

### Funcionalidades Principales
- Búsqueda de productos por texto
- Filtros por categoría, marca, rango de precio y disponibilidad
- Ordenamiento por precio y nombre
- Paginación de resultados
- Diseño responsive
- Interfaz similar a sitios de e-commerce reales

### Componentes
```
src/
├── components/           # Componentes React
│   ├── ErrorBoundary.js
│   ├── FilterSidebar.js
│   ├── HomePage.js
│   ├── ProductCard.js
│   ├── ProductDetail.js
│   └── ProductList.js
├── hooks/               # Custom hooks
│   ├── useProductImage.js
│   └── useProducts.js
├── services/            # Servicios API
│   └── catalogService.js
├── utils/               # Utilidades
│   └── helpers.js
├── constants/           # Constantes de configuración
│   └── config.js
├── styles/              # Estilos CSS
│   ├── App.css
│   ├── ErrorBoundary.css
│   └── ProductDetail.css
├── __tests__/           # Tests
│   ├── catalogService.test.js
│   └── helpers.test.js
├── App.js              # Componente raíz con routing
└── index.js            # Punto de entrada
```

## Requisitos Previos

- Node.js 16+ y npm
- Backend API corriendo en `http://localhost:8080`

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/csaltron/walmart-ecommerce-frontend.git
cd walmart-ecommerce-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
.env
```

## Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
```

### Proxy API

El proyecto usa proxy para desarrollo (configurado en `package.json`):

```json
"proxy": "http://localhost:8080"
```

Para producción, configurar `REACT_APP_API_BASE_URL` con la URL del backend.

## Comandos Disponibles

```bash
# Desarrollo
npm start                 # Inicia servidor de desarrollo (puerto 3000)

# Build
npm run build            # Build de producción en carpeta build/

# Testing
npm test                 # Ejecuta tests una vez con coverage
npm run test:watch       # Ejecuta tests en modo watch
npm run test:coverage    # Genera reporte de coverage


## Características Técnicas

### Custom Hooks

#### useProducts
Maneja toda la lógica de productos, filtros, búsqueda y paginación:

```javascript
const {
  state,           // { data, loading, error }
  filters,         // Filtros activos
  updateFilters,   // Actualizar filtros
  applyFilters,    // Aplicar filtros
  clearFilters,    // Limpiar filtros
  handleSearch,    // Manejar búsqueda
  handlePageChange,// Cambiar página
  handleSortChange,// Cambiar ordenamiento
} = useProducts();
```

#### useProductImage
Maneja imágenes de productos con fallback:

```javascript
const { 
  getImageUrl,      // Obtiene URL de imagen
  handleImageError, // Maneja errores de carga
  handleImageLoad,  // Maneja carga exitosa
} = useProductImage(product);
```


## Integración con Backend

### Endpoints Consumidos

```javascript
GET /api/v1/products              // Lista paginada con filtros
GET /api/v1/products/{id}         // Detalle de producto
GET /api/v1/products/categories   // Lista de categorías
GET /api/v1/products/brands       // Lista de marcas
```

### Parámetros de Búsqueda

```
?search=texto              // Búsqueda por texto
&category=cat1,cat2        // Filtro por categorías
&brand=brand1,brand2       // Filtro por marcas
&minPrice=10               // Precio mínimo
&maxPrice=100              // Precio máximo
&inStock=true              // Solo en stock
&page=0                    // Página actual
&size=20                   // Tamaño de página
&sortBy=price              // Campo de ordenamiento
&sortDirection=asc         // Dirección (asc/desc)
```

## Testing

El proyecto incluye tests unitarios con Jest y React Testing Library.

```bash
# Ejecutar todos los tests
npm test

# Ver coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

### Coverage Mínimo Requerido
- Branches: 50%
- Functions: 50%
- Lines: 50%
- Statements: 50%

## Solución de Problemas

### Error de conexión al backend

Verificar que el backend esté corriendo:
```bash
curl http://localhost:8080/api/v1/products
```

### Puerto 3000 ocupado

Usar otro puerto:
```bash
PORT=3001 npm start
```

### Variables de entorno no funcionan

- Verificar que el archivo `.env` esté en la raíz
- Variables deben empezar con `REACT_APP_`
- Reiniciar el servidor de desarrollo después de cambios

## Mejoras Futuras

### Funcionalidades
- [ ] Carrito de compras
- [ ] Sistema de autenticación
- [ ] Favoritos/wishlist
- [ ] Comparación de productos
- [ ] Historial de búsqueda
- [ ] Autocomplete en búsqueda
- [ ] Filtros avanzados con tags
- [ ] Vista de lista alternativa
- [ ] Compartir productos en redes sociales

### Técnicas
- [ ] Service Workers para PWA
- [ ] Server-Side Rendering (Next.js)
- [ ] State management con Redux o Zustand
- [ ] Internacionalización (i18n)
- [ ] Análisis con Google Analytics
- [ ] Monitoreo de errores con Sentry
- [ ] A/B Testing
- [ ] Optimización de imágenes (WebP, lazy loading)
- [ ] CI/CD pipeline
- [ ] E2E tests con Cypress

## Tecnologías Utilizadas

- **React** 18.2 - Biblioteca UI
- **React Router DOM** 7.13 - Routing
- **Axios** 1.6 - Cliente HTTP
- **Jest** - Testing framework
- **React Testing Library** - Testing de componentes
- **ESLint** - Linting
- **Prettier** - Formateo de código
- **CSS3** - Estilos (sin frameworks)
- Create React App
