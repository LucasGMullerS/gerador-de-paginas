// Endereço da API do Groq — é para onde vamos enviar o pedido
let endereco = "https://api.groq.com/openai/v1/chat/completions"

// "async" significa que essa função vai esperar respostas da internet
// sem travar o resto do site
async function gerarCodigo() {

    // Pega o texto que o usuário digitou na textarea
    // .value = o conteúdo digitado dentro do campo
    let textarea = document.querySelector(".texto-pagina").value

    // "fetch" faz uma requisição para a internet (como abrir uma URL)
    // "await" espera a resposta antes de continuar
    let resposta = await fetch(endereco, {

        // "POST" = estamos ENVIANDO dados (diferente de GET que só busca)
        method: "POST",

        headers: {
            // Avisa que vamos enviar dados no formato JSON
            "Content-Type": "application/json",

            // Sua chave de acesso — como uma senha para usar a API
            "Authorization": "Bearer (sua chave aqui)"
        },

        // "body" = o conteúdo que estamos enviando
        // JSON.stringify = transforma objeto JavaScript em texto JSON
        body: JSON.stringify({

            // Qual modelo de IA vamos usar
            "model": "llama-3.3-70b-versatile",

            // Lista de mensagens que enviamos para a IA
            "messages": [
                {
                    // "user" = mensagem do usuário (o que ele digitou)
                    "role": "user",
                    "content": textarea  // texto que o usuário digitou
                },
                {
                    // "system" = instruções secretas para a IA
                    // o usuário não vê isso, mas a IA segue
                    "role": "system",
                    "content": "Aja como um Desenvolvedor Front-end Sênior. Crie uma Landing Page completa, moderna e responsiva em um único arquivo (HTML5 com CSS3 interno no ) para o negócio: [INSERIR NOME E RAMO]. A interface deve ser limpa e profissional, utilizando HTML5 semântico, Flexbox/Grid e Google Fonts. A página deve conter: Navbar responsiva, Hero Section com título de impacto e botão de Call to Action, seção de Serviços em cards, sobre o negócio e rodapé com contatos. Garanta que o layout seja totalmente adaptável para dispositivos móveis via @media queries. Regra estrita: Responda apenas com o código. Idioma: Português do Brasil."
                }
            ],
        })
    })

    // Converte a resposta da API de JSON para objeto JavaScript
    let dados = await resposta.json()

    // Navega dentro do objeto para pegar o texto gerado pela IA
    // choices[0] = primeira opção de resposta
    // message.content = o texto em si
    let resultado = dados.choices[0].message.content

    // Pega o elemento HTML onde vai mostrar o CÓDIGO gerado
    let espacoCodigo = document.querySelector(".bloco-codigo")

    // Pega o elemento HTML onde vai mostrar o SITE gerado (iframe)
    let espacoSite = document.querySelector(".bloco-site")

    // Coloca o código gerado como texto no bloco de código
    // textContent = mostra como texto puro (não executa o HTML)
    espacoCodigo.textContent = resultado

    // Coloca o código gerado no iframe para renderizar como site
    // srcdoc = carrega HTML diretamente no iframe sem precisar de arquivo
    espacoSite.srcdoc = resultado
}