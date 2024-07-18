import express from "express"
import {PrismaClient}  from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * Creates a new card in specified deck 
 */
router.post("/card", async(req,res) => {
    const {term,definition,deckId} = req.body;
    let id = Number(deckId);

    const card = await prisma.card.create({
        data: {
            term: term,
            definition: definition,
            deck: {
                connect: {
                    id: id
                }
            }
        },
        select: {
            id: true,
            term: true,
            definition: true
        }
    })
    res.json(card);
});

/**
 * Deletes a specified card
 */
router.delete("/card/:id", async(req,res) => {
    const id = Number(req.params.id);

    const deletedCard = await prisma.card.delete({
        where: {
            id: id,
        }
    })
    res.json(deletedCard);
});

/**
 * Edits specified card data
 */
router.put("/card/:id", async(req,res) => {
    const id = Number(req.params.id);
    const {term,definition} = req.body;

    const card = await prisma.card.update({
        where: {
            id: id,
        },
        data: {
            term: term,
            definition: definition,
        }
    })
    res.json(card);
})


export default router;