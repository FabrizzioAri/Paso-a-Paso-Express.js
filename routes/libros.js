const express = require('express');
const router = express.Router();
const libros = require('../data')
const Joi = require('joi');


const libroSchema = Joi.object({
    titulo: Joi.string().required().label('Titulo'),
    autor: Joi.string().required().label('Autor')
});
//obtener libros
router.get('/', (req,res,next) =>{
    try {
        res.json(libros);
    }catch (err){
        next(err);
    }
});
//obtener un libro por id
router.get('/:id', (req,res,next) =>{
    try{
        const id = req.params.id;
        const libro = libros.find((l) => l.id ===id);

        if (!libro){
            const error = new Error('Libro no encontrado');
            error.status = 404;
            throw error;
        }
        res.json(libro);

    }catch(err){
        next(err);
    }
});
//crear un libro
router.post('/', (req,res,next) => {
    try{
        const {error,value} = libroSchema.validate(req.body);
        if ( error){
            const validationError = new Error ('Error de Validacion');
            validationError.status=400;
            validationError.details = error.details.map(detail => detail.message);
            throw validationError;
        }
         const {titulo,autor} = value;

         const nuevolibro = {
            id : libros.length + 1,
            titulo,
            autor
         };

         libros.push(nuevolibro);
         res.status(201).json(nuevolibro)
    }catch(err){
        next(err);
    }
});

//actualizar libro

router.put('/:id', (req,res,next)=>{
    try{
        const id= req.params.id;
        const {error,value} = libroSchema.validate(req,body);
        if (error){
            const validationError = new Error ('Error de Validacion');
            validationError.status = 400;
            validationError.details = error.details.map(detail => detail.message);
            throw validationError;
        }
        const {titulo,autor}=value;
        const libro = libros.find((l) => l.id ===id);

        if(!libro){
            const error =new Error('Libro no encontrado');
            error.status= 404;
            throw error;
        }

        libro.titulo = titulo || libro.titulo;
        libro.autor = autor || libro.autor;


    }catch(err){
        next(err)
    }
});

//eliminar libro
router.delete('/:id', (req, res, next) => {
    try {
    const id = req.params.id;
    const index = libros.findIndex((l) => l.id === id);
    if (index === -1) {
    const error = new Error('Libro no encontrado');
    error.status = 404;
    throw error;
    }
    const libroEliminado = libros.splice(index, 1);
    res.json(libroEliminado[0]);
    } catch (err) {
    next(err);
    }
    });
    module.exports = router;
    

