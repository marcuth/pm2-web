> Créditos ao Daniel Lima por escrever este artigo

SEO, ou Search Engine Optimization, é um grupo de técnicas e práticas que você pode tomar como estratégia para alavancar a forma que usuários te encontram e encontram sua empresa/produto online.

Em outras palavras, é uma forma de cravar seu nome na praça e fazer com que, quando alguém for buscar um problema ou seu nome propriamente dito, você apareça como a solução principal para ele.

Ao longo desse artigo vou disponibilizar alguns exemplos, mas é importante que você
<strong> NÃO COPIE E COLE ELES </strong> sem antes mudar o que está escrito e melhorar para o seu contexto.

![alt text](https://raw.githubusercontent.com/bolodissenoura/images-dump/main/seo-article/google-alert-search.png)

Mas preciso deixar um recado muito importante.
Se você entrou nesse artigo achando que tem uma pílula mágica que você vai colocar no seu site e tudo vai se resolver da noite para o dia, já pode tirar seu cavalinho da chuva.

Não existe magic pill, rapaz. SEO é assim como a academia, uma forma de construir seu nome e um conjunto de boas práticas e ferramentas que, com o tempo, vão te ajudar a ter um contato melhor com quem sua empresa resolve os problemas de fato.

![alt text](https://stickerly.pstatic.net/sticker_pack/z7G8MuWk7KPqwxaPqJy2fw/DBK3GX/31/-771186833.png)

Se na academia você precisa comer bem e se exercitar todos os dias, no SEO funciona da mesma forma. Você precisa constantemente ir evoluindo e se adaptando com as mudanças.

Pois basta uma canetada de uma empresa como a Google e você perde seu trono de primeiro colocado na lista dos top.

Quer dizer, até existe magic pill, os anabolizantes nesse caso seria um tráfego pago, mas esse não é nosso foco aqui. Tudo que usaremos será feito de forma 100% natural e orgânica 🌱

Ou seja, fique atento e stay natty, kids.

---

Tudo começou quando precisei fazer isso na pele, para uma plataforma do qual sou dono, chamada [ Alertpix ](https://alertpix.live), focado em streamers e em soluções para quem faz live.

Sentimos no começo que nossa busca estava muito ruim. As pessoas buscavam nosso nome e só achavam o Twitter ou artigos de sites falando sobre nós de alguma forma. Mas o nosso site mesmo que era bom, nada.

Então, virei para o meu sócio Chris e me comprometi a aprender o máximo possível sobre como resolver esse problema e aparecer mais na hora que forem pesquisar pelos problemas que podemos resolver.

---

Bom, depois de uma longa pesquisa fiz uma lista com várias coisas que poderíamos melhorar, esse foi o resultado:

- Otimizar lighthouse
- hierarquizar melhor ( h1, h2, h3 )
- alt nas imagens
- Metatags ( meta description )
- O.G ( Open Graph )
- json-ld
- blog com conteúdos long tail
- pSEO + long tail volume
- quantidade suficiente de palavras chaves por página
- robots.txt
- Sitemap
- Keyword Planner do Google, o SEMrush e o Ahrefs ( palavras chaves )
- canonical tag


Vou abordar um por um e dar um exemplo prático de como você pode melhorar o seu site também.

Estarei utilizando Next.js aqui, pois é um framework que já vem com muita coisa nativa pensada em SEO, mas você pode usar e implementar no framework que quiser.
 
---

### Otimizar lighthouse
- Lighthouse é uma ferramenta, que usamos em formato de extensão do Google, para mensurar o quanto nossa aplicação está otimizada pensando no usuário final.

![alt text](https://raw.githubusercontent.com/bolodissenoura/images-dump/main/seo-article/lighthouse.png)

Ela traz várias métricas bacanas que você pode ficar de olho. Como acessibilidade, performance, melhores práticas, entre outras. Mas aqui focaremos no SEO.

A ideia é sempre você melhorar conforme a ferramenta vai te avisando, e por mais que não seja 100% ainda sim vale muito a pena se apegar no que a ferramenta te entrega e fazer as melhorias propostas nela.

![alt text](https://raw.githubusercontent.com/bolodissenoura/images-dump/main/seo-article/lighthouse2.png)

Ah, e falando em acessibilidade, aqui está mais um item da nossa lista.

### Alt + hierarquizaçao / semantica do HTML

Afinal de contas, a acessibilidade de um site pode interferir em um SEO?

O que o Google e outros buscadores podem levar em consideração é se suas imagens estão com alt bem definidos, se sua semântica do HTML está bem clara e se suas tags estão bem hierarquizadas (ou seja, utilizando h1, h2, h3 e outras tags corretamente).

Então, por esse lado, sim. Características de um site bem acessível são hábitos saudáveis para um bom SEO.

Evite títulos enganosos ou clickbait.
Não use uma lista de palavras-chave como título e nem um alt genérico para tudo.

### Metatags

Meta tags são elementos HTML que fornecem informações sobre a página da web para navegadores e mecanismos de busca. Essas informações não são exibidas diretamente aos visitantes da página, mas são utilizadas para diversas finalidades, como otimização para motores de busca (SEO), compartilhamento em redes sociais e configuração de exibição em dispositivos móveis. Alguns tipos comuns de meta tags incluem:

Meta Description: Fornece um resumo curto da página. Esse texto frequentemente aparece nos resultados de busca, ajudando a atrair cliques.

```html
<meta name="description" content="Uma descrição breve e informativa da página.">
```
Meta Keywords: Lista palavras-chave relevantes para a página. Embora seu uso tenha diminuído em importância para SEO, ainda é usado ocasionalmente.


```html
<meta name="keywords" content="palavra-chave1, palavra-chave2, palavra-chave3">
```
Meta Charset: Define o conjunto de caracteres usado na página, ajudando a garantir a  exibição de texto.

```html
<meta charset="UTF-8">
```
Meta Viewport: Configura a exibição da página em dispositivos móveis, permitindo uma melhor experiência de usuário em diferentes tamanhos de tela.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
Meta Robots: Indica aos motores de busca como indexar ou não a página. Pode ser usado para permitir ou bloquear a indexação da página.

```html
<meta name="robots" content="index, follow">
```
Meta Author: Especifica o autor da página ou do conteúdo.

```html

<meta name="author" content="Nome do Autor">
```

Meta Open Graph: Utilizado para a integração com redes sociais como Facebook, melhorando a exibição quando a página é compartilhada.

```html

<meta property="og:title" content="Título da Página">
<meta property="og:description" content="Descrição da Página">
<meta property="og:image" content="URL da Imagem">
<meta property="og:url" content="URL da Página">

```

Essas tags são colocadas dentro da seção <head> do documento HTML. 

Cada meta tag tem um propósito específico e pode ser usada de acordo com as necessidades do desenvolvedor da página.

Tudo isso conta bastante pra ferramentas de pesquisa como o Google saberem e disponibilizarem seu conteúdo.

### O.G Open Graph

![alt text](https://raw.githubusercontent.com/bolodissenoura/images-dump/main/seo-article/examples.png)

O Open Graph (OG) é um protocolo desenvolvido pelo Facebook para integrar qualquer página web com a rede social, permitindo que o conteúdo de uma página seja compartilhado de maneira mais rica e atraente. Quando uma página da web contém meta tags Open Graph, os links compartilhados em redes sociais podem exibir títulos, descrições, imagens e outros detalhes de forma otimizada. Isso melhora a aparência e a funcionalidade dos links, incentivando mais interações e cliques.

Aqui estão algumas das meta tags Open Graph mais comuns e seus usos:

#### Define o título da página que será exibido quando o conteúdo for compartilhado.

```html
<meta property="og:title" content="Título da Página">
```

#### Fornece uma descrição curta e atraente da página.
```html
<meta property="og:description" content="Descrição da Página">
```

#### Especifica a URL de uma imagem representativa da página. Esta imagem será exibida como um thumbnail quando a página for compartilhada.

```html
<meta property="og:image" content="URL da Imagem">
```
#### Define a URL canônica da página, garantindo que a URL correta seja associada ao conteúdo.

``` html
<meta property="og:url" content="URL da Página">
#### Indica o tipo de conteúdo da página, como "website", "article", "video", etc.

``` html
<meta property="og:type" content="website">
```

#### Nome do site onde a página está hospedada.

```html
<meta property="og:site_name" content="Nome do Site">
```
#### Benefícios do uso de Open Graph
Atração Visual: Melhora a aparência dos links compartilhados, exibindo imagens e informações adicionais.
Aumento de Cliques: Títulos e descrições otimizados podem aumentar a taxa de cliques (CTR) nos links.
Controle de Conteúdo: Permite que os proprietários de sites controlem como seu conteúdo é exibido nas redes sociais.
Consistência: Garante que os links compartilhados tenham uma aparência consistente, independentemente de onde são compartilhados.
Implementar meta tags Open Graph é uma prática recomendada para qualquer site que deseja aumentar sua visibilidade e atratividade em plataformas de redes sociais.

Você pode verificar se seu site ta tudo ok e como ele aparece em diferentes platafromas usando ferramentas como essa: https://opengraph.dev/panel?url=https://alertpix.live

Assim, toda vez que compartilhar o link do seu site você deixa ele mais atrativo e com menos cara de golpe. Isso da um ar de profissionalismo para seu site.

### json-ld

JSON-LD (JavaScript Object Notation for Linked Data) é um formato baseado em JSON usado para estruturar dados de forma que possam ser facilmente compreendidos por máquinas. É comumente usado para adicionar metadados a páginas da web de forma que motores de busca e outras aplicações possam processar e entender esses dados com mais eficiência.

JSON-LD é frequentemente utilizado para implementar esquemas de dados estruturados (como schema.org), permitindo que informações sobre produtos, eventos, organizações, pessoas, receitas e muito mais sejam incluídas em uma página da web. Esses dados estruturados podem melhorar significativamente a SEO e aumentar a visibilidade do conteúdo nos resultados de busca, exibindo rich snippets.

Ou seja, mais uma ferramenta pra você conversar diretamente com os servidores e buscadores. Basicamente é uma forma de dizer ao google "Oi, esse sou eu, eu faço isso e resolvo isso...".

Um exemplo de como usamos isso aqui na alertpix é para fazer uma espécie de "Faq" com perguntas e respostas que sao comummente pesquisados por nosso publico.

Assim: 
![alt text](https://raw.githubusercontent.com/bolodissenoura/images-dump/main/seo-article/jsonld.png)

Mas aí você deve estar se perguntando, quais perguntas foram essas e de onde eu tirei tais perguntas?

E aqui vou mostrar uma dica que eu poderia facilmente estar cobrando:
- Você não decide isso. 
- É um erro seu achar que você sabe mais do seu negócio que o Google.

Vá e pergunte a ele, mas de uma forma diferente.

[Te apresento a Keyword Planner + Google ADS](https://ads.google.com/aw/keywordplanner/home)

![alt text](https://raw.githubusercontent.com/bolodissenoura/images-dump/main/seo-article/google-ads.png)
![alt text](https://raw.githubusercontent.com/bolodissenoura/images-dump/main/seo-article/google-ads2.png)

Existe diversas formas inteligentes de voce descobrir quais palavras sao ideais pra voce colocar no seu site, mas ja te adianto, nao é da sua cabeça que voce vai tirar isso. Faça uma pesquisa, aprimore e tire o puro suco do milho verde das palavras.

Essa é uma prática que demanda um tempinho mas se paga bastante.
Vale tambem pesquisar por sites dos seus concorrentes e ver como as pessoas chegam ate eles. Copie o que da certo :)

### Long Tail 

O conceito de "long tail" (cauda longa) é sobre vender uma variedade enorme de itens únicos em pequenas quantidades, ao invés de focar em poucos itens populares em grandes quantidades. No SEO e marketing de conteúdo, isso significa usar palavras-chave mais específicas e menos competitivas, que têm menos buscas, mas atraem pessoas com intenção de compra clara e menos concorrência.

![alt text](https://raw.githubusercontent.com/bolodissenoura/images-dump/main/seo-article/long-tail.jpg)

Então, ao invés de usar "tenis" para vender um tenis de corrida, você pode usar "Tênis de corrida feminino até 400 reais" por exemplo.
Nada mais é que super nichar e ser bizarramente específico. Da pra introduzir isso em seu site utilizando blogposts, fazendo vídeos no youtube e linkando em seu site e de outras maneiras também.

Mais uma vez, não é você quem define essas palavras ideais. Utilize ferramentas como <strong>Google Keyword Planner, Ahrefs, SEMrush, e Ubersuggest</strong> para identificar oportunidades de palavras-chave long tail.

E na hora de utilizar, certifique de as colocar em titulos, subtitulos, e nas tags que ja mostrei aqui nesse artigo.

O robots.txt é um arquivo que diz aos motores de busca o que eles podem ou não acessar no seu site. Ele fica na raiz do domínio e tem uma estrutura simples:

Estrutura Básica
```plaintext

User-agent: *
Disallow: /admin/
Disallow: /private/
Allow: /public/

Sitemap: https://www.exemplo.com/sitemap.xml
```

Principais Elementos
- User-agent: Especifica a quais robôs a regra se aplica. O * vale para todos.
- Disallow: Bloqueia diretórios ou arquivos.
- Allow: Permite diretórios ou arquivos específicos.

Benefícios
Controle de Indexação: Decide o que os motores de busca veem.
Segurança: Protege áreas sensíveis.
Otimização: Direciona os robôs para as partes importantes do site.
Lembre-se: qualquer um pode ver seu robots.txt e nem todos os robôs seguem as regras.

### Sitemaps
Um sitemap é um arquivo que lista todas as páginas do seu site para ajudar os motores de busca a encontrar, rastrear e indexar seu conteúdo de maneira mais eficiente. Ele pode ser em formato XML ou HTML.

Tipos de Sitemaps
XML Sitemap: Feito para motores de busca. Contém URLs e informações como a última atualização, frequência de mudanças e importância relativa das páginas.
HTML Sitemap: Feito para usuários. Oferece uma visão geral do conteúdo do site, facilitando a navegação.
Estrutura Básica de um XML Sitemap
Aqui está um exemplo básico de um sitemap em XML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
      <loc>https://www.exemplo.com/</loc>
      <lastmod>2024-07-08</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
   </url>
   <url>
      <loc>https://www.exemplo.com/pagina1</loc>
      <lastmod>2024-07-08</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
   </url>
   <!-- Mais URLs -->
</urlset>
```

Principais Elementos do XML Sitemap
- ```<loc>```: URL da página.
- ```<lastmod>```: Data da última modificação.
- ```<changefreq>```: Frequência de mudanças esperadas (daily, weekly, monthly, etc.).
- ```<priority>```: Importância relativa da página (0.0 a 1.0).

Benefícios de um Sitemap
Melhor Rastreamento: Ajuda os motores de busca a encontrar todas as páginas, mesmo as mais profundas.

Indexação Rápida: Páginas novas ou atualizadas são indexadas mais rapidamente.
Organização: Mantém o site bem organizado e melhora a navegação para os usuários (no caso do HTML sitemap).

##### Como Usar
Criar o Sitemap: Use ferramentas como Yoast SEO (para WordPress), Screaming Frog, ou geradores de sitemap online.

Enviar para Motores de Busca: Envie o sitemap através do Google Search Console e do Bing Webmaster Tools.

Exemplo de Inclusão no robots.txt

```plaintext
Sitemap: https://www.exemplo.com/sitemap.xml
```

Um sitemap é essencial para garantir que os motores de busca encontrem e indexem todo o conteúdo importante do seu site, ajudando a melhorar a SEO e a experiência do usuário.

### Bonus - Use Nextjs

O nextjs é um framework poderoso que tras pra gente algumas vantagens na melhora do SEO.
Mas preciso ser honesto, ele nao é unico. Tem outros como Astro e Nuxt que fazem isso de uma forma muito boa tambem e facilitam sua vida.

- SSR, SSG, Image optimization entre outras vantagens fazem do Next uma ótima ferramenta para te auxiliar nessa jornada.

---

Bom galera, é isso.
Com essas práticas, você estará no caminho certo para aumentar o tráfego qualificado e o sucesso do seu blog.
Lembre-se que SEO muda sempre, entao sempre busque a melhor e mais atualizada estratégia para você.

Se você gosta desse tipo de conteúdo e pretende subir um SaaS próprio alguma vez na sua vida, vem comigo e me segue, estou postando diáriamente conteúdos no meu twitter e semanalmente no meu youtube.
Esse artigo também estará em formato de vídeo muito em breve no meu canal do youtube:
https://youtube.com/@daniellimae

https://x.com/daniellimae