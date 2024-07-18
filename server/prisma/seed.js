import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function main() {
    await prisma.deck.create({
        data: {
            name: "Intro Spanish",
            tag: "Lower level Class",
            termTextColor: "#0C8599",
            termCardColor: "#3BC9DB",
            definitionCardColor: "#3B5BDB",
            definitionTextColor: "#91A7FF",
            cards: {
                create: [
                    {
                        term: "I don't know",
                        definition: "Yo no se",
                    },
                    {
                        term: "Happy",
                        definition: "feliz"
                    },
                    {
                        term : "Angry",
                        definition: "Enojado"
                    },
                    {
                        term: "Bed",
                        definition: "Cama"
                    }
                ]
            }
        }
    });

    await prisma.deck.create({
        data: {
            name: "Intro French",
            tag: "Lower level Class",
            termTextColor: "#9775FA",
            termCardColor: "#6741D9",
            definitionTextColor: "#D8F5A2",
            definitionCardColor: "#66A80F",
            cards: {
                create: [
                    {
                        term: "I don't know",
                        definition: "Je ne sais pas",
                    },
                    {
                        term: "Happy",
                        definition: "Content"
                    },
                    {
                        term : "Angry",
                        definition: "Fache"
                    },
                    {
                        term: "Bed",
                        definition: "Lit"
                    }
                ]
            }
        }
    });

    await prisma.deck.create({
        data: {
            name: "OOSE",
            tag: "Upper level Class",
            termTextColor: "#4DABF7",
            termCardColor: "#1971C2",
            definitionTextColor: "#E5DBFF",
            definitionCardColor: "#7048E8",
            cards: {
                create: [
                    {
                        term: "Database",
                        definition: "Postgresql",
                    },
                    {
                        term: "Front end",
                        definition: "React"
                    },
                    {
                        term : "Back end",
                        definition: "Express Js and Node"
                    },
                    {
                        term: "Libraries",
                        definition: "Mantine and Prisma"
                    }
                ]
            }
        }
    });

    await prisma.deck.create({
        data: {
            name: "Music",
            tag: "Preferences",
            termTextColor: "#A9E34B",
            termCardColor: "#5C940D",
            definitionTextColor: "#FFD43B",
            definitionCardColor: "#F08C00",
            cards: {
                create: [
                    {
                        term: "Rapper of the year",
                        definition: "JID",
                    },
                    {
                        term: "Up and coming",
                        definition: "Redveil"
                    },
                    {
                        term : "Come back season",
                        definition: "A$AP Rocky"
                    },
                    {
                        term: "Surprise addition",
                        definition: "Eem triplin"
                    }
                ]
            }
        }
    });
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
