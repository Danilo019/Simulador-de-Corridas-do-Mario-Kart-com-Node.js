class Item {
    constructor(nome, tipo, efeito, dano = 0) {
        this.nome = nome;
        this.tipo = tipo; // 'ataque', 'defesa', 'boost'
        this.efeito = efeito;
        this.dano = dano;
    }

    // Aplica o efeito do item
    usar(usuario, alvo = null) {
        switch (this.tipo) {
            case 'ataque':
                if (alvo) {
                    alvo.receberDano(this.dano);
                    return `${usuario.nome} usou ${this.nome} em ${alvo.nome}! Dano: ${this.dano}`;
                }
                break;
            case 'boost':
                usuario.adicionarTurbo();
                return `${usuario.nome} usou ${this.nome}! Ganhou um turbo!`;
            case 'defesa':
                // Implementar lógica de defesa se necessário
                return `${usuario.nome} usou ${this.nome}!`;
        }
        return `${usuario.nome} usou ${this.nome}!`;
    }
}

// Itens pré-definidos do jogo
const ITENS = {
    CASCO: new Item('Casco Verde', 'ataque', 'Causa 1 ponto de dano', 1),
    BOMBA: new Item('Bomba', 'ataque', 'Causa 2 pontos de dano', 2),
    TURBO: new Item('Cogumelo Turbo', 'boost', 'Adiciona 1 ponto de velocidade'),
    BANANA: new Item('Casca de Banana', 'ataque', 'Causa 1 ponto de dano', 1),
    RAIO: new Item('Raio', 'ataque', 'Causa 3 pontos de dano', 3),
    ESTRELA: new Item('Estrela', 'boost', 'Adiciona 2 pontos temporarios')
};

// Função para sortear item aleatório para confronto
function sortearItemConfronto() {
    const itensConfronto = [ITENS.CASCO, ITENS.BOMBA];
    const indiceAleatorio = Math.floor(Math.random() * itensConfronto.length);
    return itensConfronto[indiceAleatorio];
}

// Função para sortear item aleatório geral
function sortearItem() {
    const todosItens = Object.values(ITENS);
    const indiceAleatorio = Math.floor(Math.random() * todosItens.length);
    return todosItens[indiceAleatorio];
}

module.exports = { Item, ITENS, sortearItemConfronto, sortearItem };

