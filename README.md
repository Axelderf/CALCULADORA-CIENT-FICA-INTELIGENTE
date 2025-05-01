# Calculadora Científica Estilo Casio

Una calculadora científica moderna con diseño inspirado en las clásicas calculadoras Casio, incluyendo funciones avanzadas y características interactivas.

## Características

- 🎨 **Diseño Responsivo**: Se adapta a diferentes tamaños de pantalla
- 🌓 **Modo Claro/Oscuro**: Cambio de tema con persistencia de preferencias
- 🎵 **Efectos de Sonido**: 
  - Sonido de clic al presionar botones
  - Música de fondo opcional
  - Control de volumen personalizable
- 🔢 **Funciones Científicas**:
  - Operaciones básicas (+, -, ×, ÷)
  - Funciones trigonométricas (sin, cos, tan)
  - Logaritmos
  - Raíz cuadrada
  - Potencias
  - Paréntesis para operaciones complejas
- 📝 **Historial de Operaciones**: 
  - Guarda las últimas operaciones
  - Persistencia en localStorage
  - Opción para borrar historial
- ⌨️ **Soporte para Teclado**: 
  - Números
  - Operadores básicos
  - Teclas de control (Enter, Backspace, Escape)

## Tecnologías Utilizadas

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid, Media Queries)
- JavaScript (ES6+)
- LocalStorage para persistencia de datos
- SVG para iconos

## Estructura del Proyecto

```
calculadora/
├── index.html          # Estructura principal
├── style.css           # Estilos y temas
├── script.js           # Lógica y funcionalidad
├── sonidos/            # Archivos de audio
│   ├── sonido1.mp3     # Música de fondo
│   └── sonido2.mp3     # Sonido de clic
└── README.md           # Documentación
```

## Instalación

1. Clona o descarga este repositorio
2. Asegúrate de tener los archivos de audio en la carpeta `sonidos/`:
   - `sonido1.mp3` para la música de fondo
   - `sonido2.mp3` para los efectos de clic
3. Abre `index.html` en tu navegador

## Uso

- **Operaciones Básicas**: Usa los botones numéricos y operadores
- **Funciones Científicas**: Accede a las funciones en la parte superior
- **Tema**: Cambia entre modo claro y oscuro con el botón de tema
- **Música**: Activa/desactiva la música de fondo y ajusta el volumen
- **Historial**: Consulta y borra el historial de operaciones

## Personalización

### Temas
Los temas se pueden personalizar modificando las variables CSS en `style.css`:

```css
:root {
  --bg-primary: #f0f2f5;
  --bg-secondary: #ffffff;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --accent-color: #007bff;
  /* ... más variables ... */
}
```

### Sonidos
Puedes reemplazar los archivos de audio en la carpeta `sonidos/`:
- `sonido1.mp3`: Música de fondo
- `sonido2.mp3`: Efecto de clic
