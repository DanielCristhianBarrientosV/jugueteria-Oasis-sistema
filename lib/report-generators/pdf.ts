// lib/report-generators/pdf.ts
import PDFDocument from 'pdfkit';
import { format } from 'date-fns';
import path from 'path'; // Importar 'path' para manejar rutas de archivos
import fs from 'fs';    // Importar 'fs' para leer el archivo de la fuente


interface ReportDataParams {
  range: string;
}

// ===> CÓDIGO CORREGIDO: LA RUTA AHORA INCLUYE LA CARPETA 'fonts' <===
// Y usa el nombre exacto de la fuente que generó el error.
const FONT_PATH = path.join(process.cwd(), 'lib', 'fonts', 'Roboto-Italic-VariableFont_wdth,wght.ttf');
// Si necesitas una versión "bold", deberías tener otro archivo .ttf para ella
// Por ejemplo: const FONT_BOLD_PATH = path.join(process.cwd(), 'lib', 'fonts', 'Roboto-Bold-VariableFont_wdth,wght.ttf');


// Función para verificar si la fuente existe (útil para debug)
function checkFontExists(fontPath: string) {
    // Mantén este console.log, es muy útil para verificar la ruta en la terminal del servidor
    console.log(`Intentando cargar la fuente desde: ${fontPath}`);
    if (!fs.existsSync(fontPath)) {
        console.error(`ERROR: La fuente no se encontró en: ${fontPath}`);
        throw new Error(`Font file not found: ${fontPath}`);
    }
}

export async function generatePdfReport(reportType: string, data: any, params: ReportDataParams): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    // Verificar que la fuente principal exista antes de inicializar el documento
    checkFontExists(FONT_PATH);
    // Si tuvieras una fuente bold, también la verificarías aquí:
    // checkFontExists(FONT_BOLD_PATH);

    const doc = new PDFDocument({ margin: 50 });
    const buffers: Buffer[] = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    // ===> REGISTRAR LA FUENTE PERSONALIZADA <===
    // Usa 'CustomFont' para la fuente regular
    doc.registerFont('CustomFont', FONT_PATH);
    // Si tuvieras una fuente bold separada, la registrarías así:
    // doc.registerFont('CustomFont-Bold', FONT_BOLD_PATH);


    // Header del documento PDF
    // ===> USAR 'CustomFont' EN TODAS LAS LLAMADAS A FONT <===
    doc.fontSize(24).font('CustomFont').text(`Reporte de ${reportType.toUpperCase()}`, { align: 'center' });
    doc.fontSize(12).font('CustomFont').text(`Generado el: ${format(new Date(), 'dd/MM/yyyy HH:mm')} | Período: ${params.range}`, { align: 'center' });
    doc.moveDown(2);

    // Contenido específico según el tipo de reporte
    if (reportType === 'general') {
      doc.fontSize(18).font('CustomFont').text('Métricas Principales', { underline: true }).moveDown(0.5);
      data.metrics.forEach((metric: any) => {
        doc.fontSize(12).font('CustomFont').text(`${metric.titulo}: ${metric.valor} (${metric.cambio})`);
      });
      doc.moveDown(1);

      doc.fontSize(18).font('CustomFont').text('Ventas Mensuales', { underline: true }).moveDown(0.5);
      doc.fontSize(10).font('CustomFont').text('Mes - Ventas (Bs.) - Productos Vendidos');
      // No necesitas doc.font('Helvetica-Bold') aquí, ya que 'CustomFont' ya está seteada.
      data.ventasMensuales.forEach((item: any) => {
        doc.fontSize(10).font('CustomFont').text(`${item.mes} - ${item.ventas.toLocaleString()} - ${item.productos}`);
      });
      doc.moveDown(1);

      doc.fontSize(18).font('CustomFont').text('Ventas por Categoría', { underline: true }).moveDown(0.5);
      doc.fontSize(10).font('CustomFont').text('Categoría - Porcentaje - Monto (Bs.)');
      data.ventasPorCategoria.forEach((item: any) => {
        doc.fontSize(10).font('CustomFont').text(`${item.categoria} - ${item.valor}% - ${item.monto.toLocaleString()}`);
      });
    } else if (reportType === 'productos') {
      doc.fontSize(18).font('CustomFont').text('Productos Más Vendidos', { underline: true }).moveDown(0.5);
      doc.fontSize(10).font('CustomFont').text('# - Producto - Cantidad Vendida - Ingresos (Bs.)');
      data.productosMasVendidos.forEach((item: any, index: number) => {
        doc.fontSize(10).font('CustomFont').text(`${index + 1}. ${item.nombre} - ${item.cantidad} uds. - ${item.ingresos.toLocaleString()} Bs.`);
      });
    } else if (reportType === 'ventas') {
        doc.fontSize(18).font('CustomFont').text('Ventas Diarias', { underline: true }).moveDown(0.5);
        doc.fontSize(10).font('CustomFont').text('Día - Total (Bs.) - Items');
        data.ventasDiarias.forEach((item: any) => {
            doc.fontSize(10).font('CustomFont').text(`${item.dia} - ${item.total.toLocaleString()} - ${item.items}`);
        });
        doc.moveDown(1);

        doc.fontSize(18).font('CustomFont').text('Ventas por Vendedor', { underline: true }).moveDown(0.5);
        doc.fontSize(10).font('CustomFont').text('Vendedor - Ventas (Bs.) - Comisión (Bs.)');
        data.ventasPorVendedor.forEach((item: any) => {
            doc.fontSize(10).font('CustomFont').text(`${item.vendedor} - ${item.ventas.toLocaleString()} - ${item.comision.toLocaleString()}`);
        });
    } else if (reportType === 'inventario') {
        doc.fontSize(18).font('CustomFont').text('Stock por Categoría', { underline: true }).moveDown(0.5);
        doc.fontSize(10).font('CustomFont').text('Categoría - Unidades en Stock - Valor Total (Bs.)');
        data.stockPorCategoria.forEach((item: any) => {
            doc.fontSize(10).font('CustomFont').text(`${item.categoria} - ${item.totalStock} uds. - ${item.valorTotal.toLocaleString()} Bs.`);
        });
        doc.moveDown(1);

        doc.fontSize(18).font('CustomFont').text('Productos con Stock Crítico', { underline: true }).moveDown(0.5);
        doc.fontSize(10).font('CustomFont').text('Producto - Stock Actual - Stock Mínimo');
        data.productosBajoStock.forEach((item: any) => {
            doc.fontSize(10).font('CustomFont').text(`${item.nombre} - ${item.stock} uds. - ${item.minStock} uds.`);
        });
    } else if (reportType === 'clientes') {
        doc.fontSize(18).font('CustomFont').text('Clientes por Tipo', { underline: true }).moveDown(0.5);
        doc.fontSize(10).font('CustomFont').text('Tipo - Cantidad - Porcentaje');
        data.clientesPorTipo.forEach((item: any) => {
            doc.fontSize(10).font('CustomFont').text(`${item.tipo} - ${item.count} - ${item.valor}%`);
        });
        doc.moveDown(1);

        doc.fontSize(18).font('CustomFont').text('Top Clientes por Compras', { underline: true }).moveDown(0.5);
        doc.fontSize(10).font('CustomFont').text('Cliente - Compras Realizadas - Total Gastado (Bs.)');
        data.clientesTopCompras.forEach((item: any) => {
            doc.fontSize(10).font('CustomFont').text(`${item.cliente} - ${item.compras} - ${item.totalGastado.toLocaleString()} Bs.`);
        });
    }

    doc.end();
  });
}