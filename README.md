# Catalog Frontend - React Application

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
├── components/
│   ├── FilterSidebar.js    # Sidebar con filtros
│   ├── ProductCard.js      # Tarjeta individual de producto
│   └── ProductList.js      # Lista paginada de productos
│   ├── HomePage.js         # Página principal, búsqueda y muestra productos
│   ├── ProductDetail.js    # Vista detallada de un producto (imagen, precio, stock, marca, etc.)

├── services/
│   └── catalogService.js   # Cliente API REST
├── styles/
│   └── App.css            # Estilos globales
│   └── ProductDetails.css # Estilos especificos de los productos
├── App.js                 # Componente principal
└── index.js               # Punto de entrada
```

## Requisitos Previos

- Node.js 16+ y npm
- Backend API corriendo en `http://localhost:8080`

## Instalación y Ejecución
git clone https://github.com/csaltron/walmart-ecommerce-frontend.git


cd walmart-ecommerce-frontend

### 1. Instalar dependencias

```bash
cd catalog-frontend
npm install
```

### 2. Iniciar la aplicación

```bash
npm start
```

La aplicación estará disponible en: `http://localhost:3000`

### 3. Build de producción

```bash
npm run build
```

Los archivos estáticos se generarán en la carpeta `build/`.

## Configuración

### Proxy API
El proyecto está configurado para hacer proxy de las peticiones API al backend:

```json
"proxy": "http://localhost:8080"
```

Si el backend corre en otro puerto, modificar en `package.json`.

### Variables de Entorno
Crear archivo `.env` para configuración personalizada:

```
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
```

## Funcionalidades Implementadas

### Búsqueda
- Búsqueda en tiempo real por nombre y descripción
- Botón de búsqueda y enter para ejecutar

### Filtros
- Precio mínimo y máximo
- Categoría (checkbox - multiple selección)
- Marca (checkbox - multiple selección)
- Solo en stock (checkbox)
- Botón "Aplicar Filtros"
- Botón "Limpiar Filtros"


## Integración con Backend

La aplicación consume los siguientes endpoints:

```javascript
GET /api/v1/products              // Lista paginada con filtros
GET /api/v1/products/{id}         // Detalle de producto
GET /api/v1/products/categories   // Lista de categorías
GET /api/v1/products/brands       // Lista de marcas
```

Parámetros de búsqueda:
```
?search=texto
&category=Categoria
&brand=Marca
&minPrice=10
&maxPrice=100
&inStock=true
&page=0
&size=20
&sortBy=price
&sortDirection=asc
```

## Mejoras Futuras

### Funcionalidades
- Vista de detalle de producto en modal
- Agregar al carrito
- Comparar productos
- Favoritos/wishlist
- Historial de búsqueda
- Sugerencias de búsqueda (autocomplete)
- Filtros avanzados por tags
- Vista de lista alternativa
- Compartir productos



## Testing

```bash
npm test
```

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


## Estructura de Estado

```javascript
{
  productsData: {
    content: [...],      // Array de productos
    page: 0,            // Página actual
    size: 20,           // Tamaño de página
    totalElements: 100, // Total de productos
    totalPages: 5,      // Total de páginas
    first: true,        // Es primera página?
    last: false         // Es última página?
  },
  filters: {
    category: '',
    brand: '',
    minPrice: null,
    maxPrice: null,
    inStock: null
  },
  searchText: '',
  currentPage: 0,
  sortBy: 'price-asc'
}
```

## Scripts Disponibles

- `npm start`: Inicia servidor de desarrollo
- `npm run build`: Build de producción
- `npm test`: Ejecuta tests
- `npm run eject`: Expone configuración de webpack (irreversible)

## Tecnologías Utilizadas

- React 18.2
- Axios para peticiones HTTP
- CSS puro (sin frameworks)
- Create React App
