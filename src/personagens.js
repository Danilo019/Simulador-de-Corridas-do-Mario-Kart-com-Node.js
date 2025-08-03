const Personagem = require('./personagem');

// Personagens inspirados no universo Mario Kart
const PERSONAGENS = {
    MARIO: new Personagem('Mario', 8, 7, 6),
    LUIGI: new Personagem('Luigi', 7, 8, 6),
    PEACH: new Personagem('Princesa Peach', 6, 9, 7),
    BOWSER: new Personagem('Bowser', 9, 5, 9),
    YOSHI: new Personagem('Yoshi', 7, 8, 7),
    TOAD: new Personagem('Toad', 6, 9, 5),
    KOOPA: new Personagem('Koopa Troopa', 8, 6, 6),
    SHY_GUY: new Personagem('Shy Guy', 7, 7, 7),
    DONKEY_KONG: new Personagem('Donkey Kong', 9, 6, 8),
    WARIO: new Personagem('Wario', 8, 6, 8)
};

// Função para obter personagem por nome
function obterPersonagem(nome) {
    const personagemKey = nome.toUpperCase().replace(/\s+/g, '_');
    return PERSONAGENS[personagemKey] || null;
}

// Função para obter lista de nomes de personagens
function listarPersonagens() {
    return Object.values(PERSONAGENS).map(p => p.nome);
}

// Função para obter personagens aleatórios
function obterPersonagensAleatorios(quantidade = 4) {
    const todosPersonagens = Object.values(PERSONAGENS);
    const personagensSelecionados = [];
    
    while (personagensSelecionados.length < quantidade && personagensSelecionados.length < todosPersonagens.length) {
        const indiceAleatorio = Math.floor(Math.random() * todosPersonagens.length);
        const personagem = todosPersonagens[indiceAleatorio];
        
        if (!personagensSelecionados.find(p => p.nome === personagem.nome)) {
            // Cria uma nova instância para evitar conflitos
            personagensSelecionados.push(new Personagem(
                personagem.nome,
                personagem.velocidade,
                personagem.manobrabilidade,
                personagem.poder
            ));
        }
    }
    
    return personagensSelecionados;
}

// Função para criar uma nova instância de personagem
function criarPersonagem(nome) {
    const personagemOriginal = obterPersonagem(nome);
    if (personagemOriginal) {
        return new Personagem(
            personagemOriginal.nome,
            personagemOriginal.velocidade,
            personagemOriginal.manobrabilidade,
            personagemOriginal.poder
        );
    }
    return null;
}

module.exports = {
    PERSONAGENS,
    obterPersonagem,
    listarPersonagens,
    obterPersonagensAleatorios,
    criarPersonagem
};

