let pdfDoc = null;
let pageNum = 1;
let scale = 1.2;

const url = "COLE_AQUI_O_LINK_DIRETO_DO_PDF";

const canvas = document.getElementById("pdfCanvas");
const ctx = canvas.getContext("2d");

async function renderPage(num) {
    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport({ scale });

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
        canvasContext: ctx,
        viewport
    }).promise;

    document.getElementById("pageNum").innerText =
        `${num} / ${pdfDoc.numPages}`;
}

async function loadPDF() {
    const loadingTask = window["pdfjsLib"].getDocument(url);
    pdfDoc = await loadingTask.promise;
    renderPage(pageNum);
}

function nextPage() {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    renderPage(pageNum);
}

function prevPage() {
    if (pageNum <= 1) return;
    pageNum--;
    renderPage(pageNum);
}

function zoomIn() {
    scale += 0.1;
    renderPage(pageNum);
}

function zoomOut() {
    scale = Math.max(0.5, scale - 0.1);
    renderPage(pageNum);
}

window.addEventListener("load", loadPDF);
