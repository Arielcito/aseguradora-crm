# Aseguradora CRM

Prototipo navegable de una plataforma integral para productores/brokers de seguros (Argentina).
Estética **"Ledger"** — fintech cálido: fondo papel, verde esmeralda primario, acento arcilla/coral,
tipografía geométrica (Space Grotesk + Hanken Grotesk).

## Módulos

1. **Panel comercial** — KPIs, pólizas por vencer, renovación, producción mensual, oportunidades.
2. **Clientes y pólizas** — lista filtrable + ficha de cliente con tabs.
3. **Seguimiento** — automatizaciones con toggles + cola de envíos.
4. **Cotizador** — flujo de 3 pasos (ramo → datos → pre-cotización o derivación).
5. **Bot de WhatsApp** — bandeja por intención con derivación por urgencia.
6. **Fidelización** — campañas de relación con métricas.

## Stack

HTML + CSS + React 18 (vía Babel standalone en el browser). Sitio 100% estático, sin build.

## Correr local

```bash
npx serve .
```

Abrí `index.html` a través de un servidor (no `file://`, porque Babel carga los `.jsx` por fetch).
