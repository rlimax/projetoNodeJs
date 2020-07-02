const request = require('request-promise');
const cheerio = require('cheerio');

//const URL = 'https://ptax.bcb.gov.br/ptax_internet/consultarUltimaCotacaoDolar.do';
//const URL2 = 'https://www.estantevirtual.com.br/livreiros/casaraodlivros';

async function acesso(){
    var URL2 = 'https://www.estantevirtual.com.br/livreiros/casaraodlivros';
    var num = 0;
    let contador = 0;
    while(contador<2){
        contador++;
        if(contador==1){
            URL2 = 'https://www.estantevirtual.com.br/livreiros/casaraodlivros';
        }else{
            URL2 = 'https://www.estantevirtual.com.br/livreiros/casaraodlivros?offset='+contador;
        }
        const response = await request(URL2);
        let $ = cheerio.load(response);
        
        //Recupera e trata nome do livro
        let nomelivro = $('h2[itemprop=name]').text();
        nomelivro = nomelivro.split("\n              ");
        for(let i=0; i<nomelivro.length; i++){
            if(nomelivro[i]==''){
                nomelivro.splice(i,1);
            }
        }
        for(let i=0; i<nomelivro.length; i++){
        nomelivro[i] = nomelivro[i].replace("  ","");
        }
        //Recupera ano de publicação do livro
        let ano = $('div[class=ano-editora]').text().split("Ano: ");
        for(let i=0; i<ano.length; i++){
            if(ano[i]==""){
                ano.splice(i,1);
            }
        }
        //Recupera preço do livro
        let preco = $('p[class=preco_cifrao]').text().split("R$ ");
        for(let i=0; i<preco.length; i++){
            if(preco[i]==""){
                preco.splice(i,1);
            }
        }
        //Recupera endereço da capa do livro
        capaList = [];
        let capa = $('div[class=exemplar]').each(
            function(){
                    a = $(this);
                    let src = a.find('img').attr('data-src');
                    capaList.push(src);
                    //console.log(`imagem = ${src}`);
            }
        );
        //Recupera link do livro
        linkTit = [];
        let tit = $('div[class=exemplar]').each(
            function(){
                    a = $(this);
                    let end = a.find('a.link-exemplar').attr('href');
                    linkTit.push(end);
                    //console.log(`imagem = ${src}`);
            }
        );
        //Imprime informações recuperadas livro
        for (let i=0; i<ano.length; i++){
            num++
            console.log(`Indice: ${num} | Valor: ${preco[i]} | Livro: ${nomelivro[i]} - Ano: ${ano[i]}`);
            console.log(`imagem: ${capaList[i]}`);
            console.log(`endereço: ${linkTit[i]}`);
        }
    }

}

acesso();
