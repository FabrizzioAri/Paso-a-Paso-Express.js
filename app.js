const express =require ('express');
const app = express();
app.use(express.json());
const port = 3000;

const librosRouter = require('./routes/libros');

const errorHandler = require('./middlewares/errorHandler');

app.use ('/libros', librosRouter);
app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`Servidor abierto en el puerto ${port}`)
})



//de mas
/*
app.get('/', (req,res) => {
    res.send('!Hola Mundo prueba !')
});

const libros = [
    {id: 1, Nombre: "El Senor de los Anillos", Autor: "Tolkier" },
    {id: 2, Nombre: "Star Wars: Una Nueva Esperanza", Autor: "George Lucas" },
    {id: 3, Nombre: "Como Peinar tu Mostacho", Autor: "Doom Eternal" },
];

app.get('/libros',(req,res) => {
    res.send(libros)
});

app.get('/libro/:id', (req,res)=>{

})

*/