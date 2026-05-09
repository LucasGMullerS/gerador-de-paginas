let endereco = "https://openrouter.ai/api/v1/chat/completions"

async function gerarCodigo() {
    let textarea = document.querySelector(".texto-pagina").value

    let botao = document.querySelector("button")
    let textoOriginal = botao.textContent
    botao.textContent = "⏳ Gerando..."
    botao.disabled = true
    botao.style.opacity = "0.7"

    try { // tenta executar
        let resposta = await fetch(endereco, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer (sua chave aqui)"
            },
            body: JSON.stringify({
                "model": "mistralai/mistral-7b-instruct",
                "messages": [
                    { "role": "user", "content": textarea },
                    { "role": "system", "content": "Aja como um Desenvolvedor Front-end Sênior. Crie uma Landing Page completa, moderna e responsiva em um único arquivo HTML5 com CSS3 interno. A página deve conter: Navbar, Hero Section, Serviços em cards, Sobre e Rodapé. Responda apenas com código. Idioma: Português do Brasil." }
                ],
            })
        })

        let dados = await resposta.json()

        // verifica se a resposta veio correta antes de usar
        if (!dados.choices || dados.choices.length === 0) {
            alert("Erro na API: " + JSON.stringify(dados))
            return
        }

        let resultado = dados.choices[0].message.content
        document.querySelector(".bloco-codigo").textContent = resultado
        document.querySelector(".bloco-site").srcdoc = resultado

    } catch(erro) { // se der erro mostra no console
        console.error("Erro:", erro)
        alert("Algo deu errado! Verifique o console.")
    } finally { // sempre executa — volta o botão ao normal
        botao.textContent = textoOriginal
        botao.disabled = false
        botao.style.opacity = "1"
    }
}
