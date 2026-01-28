const PDF = {
    page:1,
    update(){
        pdfViewer.src = `assets/pdf/livro-jogador.pdf#page=${this.page}`;
        pageInfo.innerText = "Página " + this.page;
    },
    next(){ this.page++; this.update(); },
    prev(){ if(this.page>1){ this.page--; this.update(); } }
};
PDF.update();
