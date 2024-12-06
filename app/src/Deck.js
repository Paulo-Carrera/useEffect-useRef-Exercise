import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from './Card';

const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);
    const [remaining, setRemaining] = useState(52);

    // fetch a new deck when the component mounts
    useEffect(() => {
        async function fetchDeck() {
            const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/');
            setDeck(res.data);
        }
        fetchDeck();
    }, []);

    // draw a card from the deck 
    async function drawCard() {
        if (remaining === 0) {
            alert("Error: No cards remaining!");
            return;
        }
        try {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
            const newCard = res.data.cards[0];
            setCards([...cards, newCard]);
            setRemaining(res.data.remaining);
        } catch (err) {
            console.error("Failed to draw card:", err);
        }
    }

    // shuffle the deck
    async function shuffleDeck(){
        try {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`);
            setDeck(res.data);
            setCards([]);
            setRemaining(52);
            console.log("Deck Shuffled!");
        }catch(err){
            console.error("Failed to shuffle deck:", err);
        }
    }

    return (
        <div style={pageStyle}>
            <button onClick={drawCard} style={buttonStyle}>Draw Card</button>
            <button onClick={shuffleDeck} style={buttonStyle}>Shuffle Deck</button>
            <p style={remainingStyle}>Cards Remaining: {remaining}</p>
            <div style={cardsContainerStyle}>
                {cards.map((card, index) => (
                    <Card key={index} image={card.image} alt={`${card.value} of ${card.suit}`} />
                ))}
            </div>
        </div>
    );
}

// Styles for centering the page content and card container
const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Full viewport height
    backgroundColor: '#f5f5f5', // Optional background color
    textAlign: 'center',
};

const buttonStyle = {
    marginBottom: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#4CAF50', // Green background for button
    color: 'white',
    border: 'none',
};

const remainingStyle = {
    fontSize: '18px',
    marginBottom: '100px',
};

const cardsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px', // Adds spacing between the cards
};

export default Deck;
