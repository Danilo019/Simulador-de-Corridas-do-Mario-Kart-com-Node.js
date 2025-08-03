# 🏁 Mario Kart Simulator
<table>
        <tr>
            <td>
                <img src="./docs/header.gif" alt="Mario Kart" width="200">
            </td>
        </tr>
    </table>
Um simulador de corridas inspirado no universo Mario Kart, desenvolvido em Node.js para execução no terminal. O jogo oferece uma experiência completa de corrida com personagens icônicos, sistema de itens, confrontos estratégicos e mecânicas de pontuação.

## ✨ Características

### 🎮 Gameplay
- **Corridas dinâmicas**: Sistema de turnos com progressão baseada em atributos dos personagens
- **Confrontos épicos**: Sistema de confronto com itens aleatórios (Casco Verde e Bomba)
- **Sistema de pontuação**: Turbos como recompensa por vitórias em confrontos
- **Personagens únicos**: 10 personagens inspirados no universo Mario Kart, cada um com atributos únicos

### ⚔️ Sistema de Confrontos
- **Sorteio aleatório**: Cada confronto sorteia itens aleatoriamente entre Casco (-1 ponto) e Bomba (-2 pontos)
- **Mecânica de vitória**: O personagem com o item de maior dano vence o confronto
- **Recompensas**: Vencedor ganha um Turbo (+1 ponto de desempenho)
- **Empates**: Decididos por desempenho total do personagem

### 🎯 Itens Disponíveis
- **Casco Verde**: Causa 1 ponto de dano
- **Bomba**: Causa 2 pontos de dano  
- **Cogumelo Turbo**: Adiciona 1 ponto de velocidade
- **Casca de Banana**: Causa 1 ponto de dano
- **Raio**: Causa 3 pontos de dano
- **Estrela**: Adiciona 2 pontos temporários

## 👥 Personagens

Cada personagem possui três atributos principais:

| Personagem | Velocidade | Manobrabilidade | Poder |
|------------|------------|-----------------|-------|
| Mario | 8 | 7 | 6 |
| Luigi | 7 | 8 | 6 |
| Princesa Peach | 6 | 9 | 7 |
| Bowser | 9 | 5 | 9 |
| Yoshi | 7 | 8 | 7 |
| Toad | 6 | 9 | 5 |
| Koopa Troopa | 8 | 6 | 6 |
| Shy Guy | 7 | 7 | 7 |
| Donkey Kong | 9 | 6 | 8 |
| Wario | 8 | 6 | 8 |

## 🚀 Instalação

### Pré-requisitos
- Node.js 14.0.0 ou superior
- npm (Node Package Manager)

### Passos de Instalação

1. **Clone ou baixe o projeto**
   ```bash
   # Se usando git
   git clone <url-do-repositorio>
   cd mario-kart-simulator
   
   # Ou extraia os arquivos em uma pasta
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o jogo**
   ```bash
   npm start
   # ou
   node index.js
   ```

## 🎮 Como Jogar

### Menu Principal
Ao iniciar o jogo, você verá o menu principal com as seguintes opções:

1. **🏃 Corrida Rápida (vs IA)**: Inicia uma corrida contra 3 oponentes controlados pela IA
2. **🏆 Campeonato**: Modo campeonato (em desenvolvimento)
3. **⚙️ Configurações**: Configurações do jogo (em desenvolvimento)
4. **📊 Estatísticas**: Visualizar estatísticas (em desenvolvimento)
5. **❌ Sair**: Encerra o jogo

### Seleção de Personagem
- Escolha um dos 10 personagens disponíveis
- Cada personagem tem atributos únicos que afetam o desempenho
- Opção de seleção aleatória disponível

### Durante a Corrida
- **Pressione ENTER** para avançar cada turno
- Acompanhe o progresso através da barra visual
- Observe os confrontos que podem ocorrer aleatoriamente
- Monitore sua posição e pontuação

### Sistema de Confrontos
- **Probabilidade**: 30% de chance de confronto por turno
- **Participantes**: 2 personagens selecionados aleatoriamente
- **Mecânica**: Cada um sorteia um item (Casco ou Bomba)
- **Resultado**: Maior dano vence e ganha um Turbo

## 🏗️ Arquitetura do Projeto

```
mario-kart-simulator/
├── index.js           # Ponto de entrada principal
├── jogo.js           # Interface principal e controle do jogo
├── corrida.js        # Lógica da corrida e turnos
├── confronto.js      # Sistema de confrontos
├── personagem.js     # Classe dos personagens
├── personagens.js    # Definições dos personagens
├── item.js           # Sistema de itens
├── package.json      # Configurações do projeto
└── README.md         # Documentação
```

### Principais Classes

#### `Personagem`
- Gerencia atributos, pontuação e itens
- Calcula desempenho total
- Controla posição na corrida

#### `Corrida`
- Controla o fluxo da corrida
- Gerencia turnos e progressão
- Integra sistema de confrontos
- Determina vencedores

#### `SistemaConfronto`
- Executa confrontos entre personagens
- Aplica efeitos de itens
- Mantém histórico de confrontos

#### `JogoMarioKart`
- Interface principal do usuário
- Controla menus e navegação
- Integra todos os sistemas

## 🎯 Mecânicas de Jogo

### Cálculo de Desempenho
```javascript
desempenho = velocidade + manobrabilidade + poder + turbos
```

### Progressão na Corrida
```javascript
avanco = (desempenho + aleatorio(1-10)) / 3
```

### Sistema de Confrontos
1. **Verificação**: 30% de chance por turno
2. **Seleção**: 2 personagens aleatórios
3. **Sorteio**: Cada um sorteia Casco (-1) ou Bomba (-2)
4. **Resolução**: Maior dano vence
5. **Recompensa**: Vencedor ganha Turbo (+1 ponto)

## 🔧 Desenvolvimento

### Estrutura de Dados
- **Personagens**: Objetos com atributos e estado
- **Itens**: Sistema baseado em classes com efeitos
- **Corrida**: Estado global da corrida
- **Confrontos**: Histórico e estatísticas

### Extensibilidade
O projeto foi desenvolvido com arquitetura modular, permitindo:
- Adição de novos personagens
- Criação de novos itens
- Implementação de novos modos de jogo
- Expansão do sistema de confrontos

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Erro de dependências**
   ```bash
   npm install
   ```

2. **Permissão negada (Linux/Mac)**
   ```bash
   chmod +x index.js
   ```

3. **Versão do Node.js**
   - Certifique-se de usar Node.js 14.0.0 ou superior

## 🚧 Funcionalidades Futuras

- [ ] Modo Campeonato completo
- [ ] Sistema de configurações
- [ ] Estatísticas detalhadas
- [ ] Mais personagens
- [ ] Novos tipos de itens
- [ ] Diferentes tipos de pista
- [ ] Sistema de save/load
- [ ] Multiplayer local

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Enviar pull requests

---

**Divirta-se correndo! 🏁**

<div style="display: flex; align-items: center; justify-content: center;">
  <img 
    alt="DIO Education" 
    src="https://cursoagoraeupasso.com.br/wp-content/uploads/2025/05/plataforma-DIO-2.jpg" 
    width="300px" 
    style="margin-right: 20px;"
  />
  <h3>Formação: NodeJS Developer<br>Expiração para esse projeto foi na Dio.</h3>
</div>
<a href="https://web.dio.me/" target="_blank" style="
  color: blue; 
  text-decoration: none;" 
  onmouseover="this.style.color='hotpink'" 
  onmouseout="this.style.color='blue'">
  Acesse a plataforma da DIO
</a>



<!--  -->
<table align="center">
<thead>
  <tr>
    <td>
        <p align="center">Focado</p>
        <a href="https://github.com/Danilo019">
        <img src="https://avatars.githubusercontent.com/u/105023718?v=4" alt="@felipeAguiarCode"><br>
        <sub>@Danilo019</sub>
      </a>
    </td>
    <td colspan="3">
    <p>sou uma pessoa amante da tecnologia que vem aprimorando meu conhecimento em programação e desenvolvendo web e estudando para ser um cientista da computação.
</p>
      <a 
      href="https://www.linkedin.com/in/danilo-t-4b86a2136/" 
      align="center">
           <img 
            align="center" 
            alt="Material de Apoio" 
            src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
            >
        </a>
    </td>
  </tr>
</thead>
</table>
<!--  -->



