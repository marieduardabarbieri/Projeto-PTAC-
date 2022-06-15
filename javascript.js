let requisicaoURL = 'https://www.luizpicolo.com.br/api.json';
let requisicao = new XMLHttpRequest();
requisicao.open('get', requisicaoURL);
requisicao.responseType = 'json';
requisicao.send();

requisicao.onload = function() {
  class ErroCustomizado extends Error{
    constructor(mensagem, nome){
      super(mensagem);
      this.name = nome;
    }
  
       mensagem(){
         let mensagem = this.stack.split("\n")[1]
         let titulo = mensagem.split(":")[1]
         let linha = titulo.split(")")[0]
         return this.name +":"+ this.message + "\n" + " Linha:" + linha;
       }
  }
  class Noticia{
    constructor ( author, publishedAt, link, title){
      this.author = author;
      this.publishedAt = publishedAt;
      this.link = link; 
      this.title = title;
      }
 
    mostrarNoticia(){
      return  `
      <div class="alinhamentos">
      <div class="alinhamento1">
      <div class="alinhamento"> 
      <p> ${this.author} </p>
      <p> ${this.publishedAt} </p>
      </div>
      <a href="${this.link}">
      <h2> ${this.title} </h2></a>
      </div>
      </div>
      `

      if(this.author &&  this.publishedAt && this.link && this.title &&  this.urlToImage && this.description == undefined) {
        throw new ErroCustomizado(" Os parametros estão indefinidos!", "Alerta Erro");
      } 
      else {
        return true;
      }
     
    }
    }
  

  class NoticiaDestaque extends Noticia{
    constructor(urlToImage, author, publishedAt, link, title, description){
      super( author, publishedAt, link, title, description)
      this.urlToImage = urlToImage;
      this.description = description;
    }
     mostrarDestaques(){
      return  `
      <div class="alinhamentos">
      <div id="alinhamento2">
      <img id="img" src="${this.urlToImage}"><br/>
      <p> ${this.author} </p>
      <p> ${this.publishedAt} </p>
      <a href="${this.link}">
      <h2> ${this.title} </h2></a>
      <p id="descricao"> ${this.description} </p>
      </div>
      </div>
      `

      
      if(this.author &&  this.publishedAt && this.link && this.title &&  this.urlToImage && this.description == undefined) {
        throw new ErroCustomizado("  Os parametros estão indefinidos!", "Alerta Erro");
      }
      else {
        return true;
      }
     
    }
  }
  

 
  
  let noticias = requisicao.response;
  let noticia_destaque = new NoticiaDestaque(
                                            noticias.articles[0].urlToImage,
                                            noticias.articles[0].author,
                                            noticias.articles[0].publishedAt,
                                            noticias.articles[0].link,
                                            noticias.articles[0].title,
                                            noticias.articles[0].description
                                             );


  const elemento = document.getElementById('list');
  
  let mostrar = `<h1>Portal de Notícias</h1>`;
  elemento.insertAdjacentHTML('afterbegin', mostrar);
  elemento.insertAdjacentHTML('afterbegin', noticia_destaque.mostrarDestaques());

  noticias.articles.forEach(noticia => {
     let noticia_ = new Noticia(noticia.author, noticia.publishedAt, noticia.url, noticia.title, noticia.description);
     elemento.insertAdjacentHTML('beforeend', noticia_.mostrarNoticia());
  });
}


/*return `
<div class="noticia">
<div class="url_img"> ${this.urlToImage} </div>
 <p>${this.publishedAt}</p> 
 <H2>${this.title} </H2>
 <p>${this.description} </p>
 </div>
  `*/

   // let titulo = `<div class="noticia">${noticia.title}</div>`;
  //  let data_pub = `<div class="noticia">${noticia.publishedAt}</div>`;