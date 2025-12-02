import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';

export async function generatePDF(data: any, title: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument();
            const chunks: Buffer[] = [];

            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));

            // Título
            doc.fontSize(20).text(title, { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Generado el: ${new Date().toLocaleString()}`, { align: 'center' });
            doc.moveDown(2);

            // Métricas
            if (data.metrics) {
                doc.fontSize(16).text('Métricas Generales');
                doc.moveDown();
                data.metrics.forEach((m: any) => {
                    doc.fontSize(12).text(`${m.titulo}: ${m.valor} (${m.cambio})`);
                });
                doc.moveDown(2);
            }

            // Ventas Mensuales
            if (data.ventasMensuales) {
                doc.fontSize(16).text('Tendencia de Ventas');
                doc.moveDown();
                data.ventasMensuales.forEach((v: any) => {
                    doc.fontSize(12).text(`${v.mes}: Bs. ${v.ventas.toLocaleString()}`);
                });
                doc.moveDown(2);
            }

            // Ventas por Categoría
            if (data.ventasPorCategoria) {
                doc.fontSize(16).text('Ventas por Categoría');
                doc.moveDown();
                data.ventasPorCategoria.forEach((c: any) => {
                    doc.fontSize(12).text(`${c.name}: Bs. ${c.valor.toLocaleString()}`);
                });
                doc.moveDown(2);
            }

            // Tablas genéricas (si vienen en data.tableData)
            if (data.tableData && Array.isArray(data.tableData)) {
                doc.fontSize(16).text('Detalle de Datos');
                doc.moveDown();
                data.tableData.forEach((row: any) => {
                    const rowText = Object.values(row).join(' | ');
                    doc.fontSize(10).text(rowText);
                });
            }

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
}

export async function generateExcel(data: any, title: string): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Reporte');

    // Título
    sheet.mergeCells('A1:D1');
    sheet.getCell('A1').value = title;
    sheet.getCell('A1').font = { size: 16, bold: true };
    sheet.getCell('A1').alignment = { horizontal: 'center' };

    sheet.mergeCells('A2:D2');
    sheet.getCell('A2').value = `Generado el: ${new Date().toLocaleString()}`;
    sheet.getCell('A2').alignment = { horizontal: 'center' };

    let currentRow = 4;

    // Métricas
    if (data.metrics) {
        sheet.getCell(`A${currentRow}`).value = 'Métricas Generales';
        sheet.getCell(`A${currentRow}`).font = { bold: true, size: 14 };
        currentRow++;

        const headerRow = sheet.getRow(currentRow);
        headerRow.values = ['Métrica', 'Valor', 'Cambio'];
        headerRow.font = { bold: true };
        currentRow++;

        data.metrics.forEach((m: any) => {
            sheet.addRow([m.titulo, m.valor, m.cambio]);
            currentRow++;
        });
        currentRow += 2;
    }

    // Ventas Mensuales
    if (data.ventasMensuales) {
        sheet.getCell(`A${currentRow}`).value = 'Tendencia de Ventas';
        sheet.getCell(`A${currentRow}`).font = { bold: true, size: 14 };
        currentRow++;

        const headerRow = sheet.getRow(currentRow);
        headerRow.values = ['Mes', 'Ventas (Bs.)'];
        headerRow.font = { bold: true };
        currentRow++;

        data.ventasMensuales.forEach((v: any) => {
            sheet.addRow([v.mes, v.ventas]);
            currentRow++;
        });
        currentRow += 2;
    }

    // Ventas por Categoría
    if (data.ventasPorCategoria) {
        sheet.getCell(`A${currentRow}`).value = 'Ventas por Categoría';
        sheet.getCell(`A${currentRow}`).font = { bold: true, size: 14 };
        currentRow++;

        const headerRow = sheet.getRow(currentRow);
        headerRow.values = ['Categoría', 'Ventas (Bs.)'];
        headerRow.font = { bold: true };
        currentRow++;

        data.ventasPorCategoria.forEach((c: any) => {
            sheet.addRow([c.name, c.valor]);
            currentRow++;
        });
        currentRow += 2;
    }

    // Tablas genéricas
    if (data.tableData && Array.isArray(data.tableData) && data.tableData.length > 0) {
        sheet.getCell(`A${currentRow}`).value = 'Detalle de Datos';
        sheet.getCell(`A${currentRow}`).font = { bold: true, size: 14 };
        currentRow++;

        // Headers dinámicos
        const headers = Object.keys(data.tableData[0]);
        const headerRow = sheet.getRow(currentRow);
        headerRow.values = headers;
        headerRow.font = { bold: true };
        currentRow++;

        data.tableData.forEach((row: any) => {
            sheet.addRow(Object.values(row));
            currentRow++;
        });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
}
