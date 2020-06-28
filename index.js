const request = require('request-promise');

const cheerio = require('cheerio');

//const URL = 'https://ptax.bcb.gov.br/ptax_internet/consultarUltimaCotacaoDolar.do';
const URL2 = 'https://www.estantevirtual.com.br/livreiros/casaraodlivros'

async function acesso(){
    const response = await request(URL2);
    let $ = cheerio.load(response);


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
    //console.log(nomelivro);

    let ano = $('div[class=ano-editora]').text().split("Ano: ");
    for(let i=0; i<ano.length; i++){
        if(ano[i]==""){
            ano.splice(i,1);
        }
    }
    //console.log(ano);

   let preco = $('p[class=preco_cifrao]').text().split("R$ ");
   for(let i=0; i<preco.length; i++){
       if(preco[i]==""){
           preco.splice(i,1);
       }
   }
   //console.log(preco);

   for (let i=0; i<ano.length; i++){
    console.log(`Indice: ${i+1} | Valor: ${preco[i]} | Livro: ${nomelivro[i]} - Ano: ${ano[i]}`);
   }

   capaList = [];
   let capa = $('div[class=exemplar]').each(
       function(){
            a = $(this);
            let src = a.find('img').attr('data-src');
            capaList.push(src);
            //console.log(`imagem = ${src}`);
       }
   );
   //console.log(capalist);
   for (let i=0; i<ano.length; i++){
    console.log(`Indice: ${i+1} | Valor: ${preco[i]} | Livro: ${nomelivro[i]} - Ano: ${ano[i]}`);
    console.log(`imagem: ${capaList[i]}`);
   }

}
acesso();