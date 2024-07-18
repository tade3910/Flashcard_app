import express from "express"
import {PrismaClient}  from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * Creates a new deck and its associated cards
 */
router.post("/deck", async (req, res) => {
    //Edit so submits data when everything submitted
    const {name,tag,cards,tTColor, tCColor, dTColor, dColor} = req.body;
    const deck = await prisma.deck.create({
        data: {
            name: name,
            tag : tag,
            termTextColor : tTColor,
            termCardColor: tCColor,
            definitionTextColor: dTColor,
            definitionCardColor: dColor,
        }
    });
    cards.map(async (currentCard) => {
        await prisma.card.create({
            data: {
                term: currentCard.term,
                definition: currentCard.definition,
                deck: {
                    connect: {
                        id: deck.id
                    }
                }
            }
        })
    })
    
    res.json(deck);
})

/**
 * Deletes specified deck from database
 */
router.delete("/deck/:id", async(req,res) => {
    const id = Number(req.params.id);
    await prisma.card.deleteMany({
        where: {
            deckId : id
        }
    });
    const deleteDeck = await prisma.deck.delete({
        where: {
            id: id
        }
    });

    res.json(deleteDeck);
})

/**
 * Gets all decks
 */
router.get("/deck", async(req,res) => {
    const deck = await prisma.deck.findMany({
        select: {
            id: true,
            name: true,
            tag: true
        }
    });
    res.json(deck);
})

/**
 * Gets specified deck
 */
router.get("/deck/:id", async(req,res) => {
    const id = Number(req.params.id);
    const deckInfo = await prisma.deck.findFirstOrThrow({
        where: {
            id:id
        },
        select: {
            termTextColor : true,
            definitionCardColor : true,
            definitionTextColor : true,
            termCardColor: true,
            tag: true,
            cards: {
                select: {
                    term: true,
                    definition: true,
                    id: true
                }
            }
        }
    })
    res.json(deckInfo);
})

/**
 * Edits data in a specified deck 
 */
router.put("/deck/:id", async(req,res) => {
    const id = Number(req.params.id);
    const {name, tag, tTColor, tCColor, dTColor, dColor} = req.body;

    const deck = await prisma.deck.update({
        where: {
            id: id
        },
        data: {
            name: name,
            tag: tag,
            termTextColor : tTColor,
            termCardColor: tCColor,
            definitionTextColor: dTColor,
            definitionCardColor: dColor,
        }
    })
    res.json(deck);
})

export default router;