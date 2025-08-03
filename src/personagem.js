class Personagem {
    constructor(nome, velocidade, manobrabilidade, poder) {
        this.nome = nome;
        this.velocidade = velocidade;
        this.manobrabilidade = manobrabilidade;
        this.poder = poder;
        this.posicao = 0;
        this.pontos = 0;
        this.itens = [];
        this.turbo = 0; // Contador de turbos
    }

    // Calcula o desempenho total do personagem
    calcularDesempenho() {
        return this.velocidade + this.manobrabilidade + this.poder + this.turbo;
    }

    // Adiciona um item ao inventário
    adicionarItem(item) {
        this.itens.push(item);
    }

    // Remove e retorna um item do inventário
    usarItem() {
        return this.itens.shift();
    }

    // Adiciona turbo ao personagem
    adicionarTurbo() {
        this.turbo++;
        this.pontos++;
    }

    // Aplica dano de item
    receberDano(dano) {
        this.pontos -= dano;
        if (this.pontos < 0) this.pontos = 0;
    }

    // Avança na corrida
    avancar(distancia) {
        this.posicao += distancia;
    }

    // Reseta para nova corrida
    resetar() {
        this.posicao = 0;
        this.pontos = 0;
        this.itens = [];
        this.turbo = 0;
    }

    // Informações do personagem
    getInfo() {
        return {
            nome: this.nome,
            velocidade: this.velocidade,
            manobrabilidade: this.manobrabilidade,
            poder: this.poder,
            posicao: this.posicao,
            pontos: this.pontos,
            itens: this.itens.length,
            turbo: this.turbo,
            desempenho: this.calcularDesempenho()
        };
    }
}

module.exports = Personagem;

