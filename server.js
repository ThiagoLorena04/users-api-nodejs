import express from "express";
import cors from "cors"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient(); 


const app = express();
app.use(express.json());
app.use(cors())

app.post("/usuarios", async (req, res) => {

   await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

// Preciso de 1 - Tipo da minha rota (get)/ Método http
// Preciso de 2 - Um endereço
app.get("/usuarios", async(req, res) => {
    try {
        let users = [];
        
        // Verificar se tem parâmetros de filtro
        const hasFilters = Object.keys(req.query).length > 0;
        
        if(hasFilters) {
            const where = {};
            
            // Só adicionar ao filtro se existir
            if(req.query.name) where.name = req.query.name;
            if(req.query.email) where.email = req.query.email;
            if(req.query.age) where.age = parseInt(req.query.age);
            
            users = await prisma.user.findMany({ where });
        } else {
            users = await prisma.user.findMany();
        }
        
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro interno' });
    }
});

app.put("/usuarios/:id", async (req, res) => {

   await prisma.user.update({
        where: {
           id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.delete("/usuarios/:id", async(req, res) => {
    await prisma.user.delete({
        where: {
            id: parseInt(req.params.id) 
        }
    })

    res.status(200).json({message: "Usuário deletado com Sucesso!"})
})

app.listen(3000)

//thiagovitor2067_db_user
// AqHBae2TBy48H24a