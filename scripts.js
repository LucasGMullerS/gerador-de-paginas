let endereco = "https://api.groq.com/openai/v1/chat/completions"

async function gerarCodigo() {

    let textarea = document.querySelector(".texto-pagina").value

    // LOADING — ativa antes do fetch
    let botao = document.querySelector("button")
    let textoOriginal = botao.textContent
    botao.textContent = "⏳ Gerando..."
    botao.disabled = true
    botao.style.opacity = "0.7"

    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer : 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" // troca pela nova chave!
        },
        body: JSON.stringify({
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {
                    "role": "user",
                    "content": textarea
                },
                {
                    "role": "system",
                    "content": "Aja como um Desenvolvedor Front-end Sênior. Crie uma Landing Page completa, moderna e responsiva em um único arquivo (HTML5 com CSS3 interno no ) para o negócio: [INSERIR NOME E RAMO]. A interface deve ser limpa e profissional, utilizando HTML5 semântico, Flexbox/Grid e Google Fonts. A página deve conter: Navbar responsiva, Hero Section com título de impacto e botão de Call to Action, seção de Serviços em cards, sobre o negócio e rodapé com contatos. Garanta que o layout seja totalmente adaptável para dispositivos móveis via @media queries. Regra estrita: Responda apenas com o código. Idioma: Português do Brasil."
                }
            ],
        })
    })

    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content

    let espacoCodigo = document.querySelector(".bloco-codigo")
    let espacoSite = document.querySelector(".bloco-site")

    espacoCodigo.textContent = resultado
    espacoSite.srcdoc = resultado

    // LOADING — desativa depois de terminar
    botao.textContent = textoOriginal
    botao.disabled = false
    botao.style.opacity = "1"
}
