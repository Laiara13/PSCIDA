const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Função para virar uma carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
}

// Função para verificar se as cartas são iguais
function checkForMatch() {
    const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

// Função para desabilitar as cartas (caso sejam iguais)
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Função para desvirar as cartas (caso não sejam iguais)
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 900);
}

// Função para reiniciar o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Função para embaralhar as cartas
(function shuffle() {
    cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

// Exibe todas as cartas por 5 segundos antes de iniciar o jogo
function showAllCards() {
    cards.forEach(card => card.classList.add('flip'));
    setTimeout(() => {
        cards.forEach(card => card.classList.remove('flip'));
    }, 5000);
}

// Chama a função para exibir as cartas inicialmente
showAllCards();

// Adiciona o evento de clique a todas as cartas
cards.forEach(card => card.addEventListener('click', flipCard));