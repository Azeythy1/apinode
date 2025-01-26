
import express from 'express';
import { PrismaClient } from '@prisma/client'
import cors from 'cors';

const prisma = new PrismaClient()
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.use(express.json());
//adicionar usuarios
app.post('/usuarios', async(req, res) => {
    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
   
    });
   
    res.status(201).send(req.body);
});

//listar usuarios
app.get('/usuarios', async(req, res) => {
    const users=await prisma.user.findMany();
    res.status(200).json(users);
});

//editar usuarios
app.put('/usuarios/:id', async(req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    });
    res.status(201).json(req.body);
});
//deletar Usuarios
app.delete('/usuarios/:id', async(req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({message: 'Usuario deletado com sucesso'});
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});