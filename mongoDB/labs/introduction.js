/*

    José Pablo Kiesling Lange - 21581
    Base de datos II
    Laboratorio No.01 - Introducción a MongoDB
    
*/


// Consulta para obtener todas las recetas.
db.recetas.find();

// Consulta para obtener todas los usuarios.
db.usuarios.find();

// Nuevo documento en recetas con titulo, descripcion y tiempo de coccion
db.recetas.insertOne({
    title: 'Tomato Pasta',
    desc: 'Pasta with tomato sauce, garlic, basil, and olive oil, cooked according to package instructions',
    cook_time: 20
});

// Consulta que busque la nueva receta
db.recetas.find({
    title: 'Tomato Pasta',
    desc: 'Pasta with tomato sauce, garlic, basil, and olive oil, cooked according to package instructions',
    cook_time: 20
});

// Consulta que muestra el titulo y tiempo de coccion de todas las recetas
db.recetas.find({}, {_id: 0, title: 1, cook_time: 1});

// Consulta que muestra las recetas ordenadas por mayor tiempo de coccion
db.recetas.find({}, {_id: 0, title: 1, cook_time: 1}).sort({cook_time: -1});

// Agregar un rating mas a una receta y actualizar el rating promedio
db.recetas.update(
  { title: 'Pancakes' },
  {
    $inc: {'rating.9': 2},
    $set: {
        rating_avg: 3.69
    }
  }
);

// Eliminar un ingrediente de la lista de ingredientes de una receta 
db.recetas.updateOne(
  { title: 'Pancakes' },
  { $pull: { ingredients: { name: 'milk' } } }
);

// Consulta que muestra la tercera receta con mejor rating promedio
db.recetas.find({}, {_id: 0, title: 1, rating_avg: 1}).sort({rating_avg: -1}).skip(2).limit(1);

// Consulta que busque las recetas que tienen comentarios
db.recetas.find({comments:{$exists:true}}, {_id: 0, title: 1, comments: 1});

// Consulta con las recetas que son de postres
db.recetas.find({type: 'Dessert'}, {_id: 0, title: 1, type: 1});

// Consulta en la que se eliminen las recetas que sean difíciles de cocinar.
db.recetas.deleteMany({tags:{$nin:['easy']}});

// Creacion de 3 nuevos documentos de usuarios con nombre, apellidos, correo electronico y contrasena
db.usuarios.insertMany([
    {
        firstName: 'Jose',
        lastname: 'Kiesling',
        email: 'kie21581@uvg.edu.gt',
        password: '123456'
    },
    {
        firstName: 'Cristiano',
        lastname: 'Ronaldo',
        email: 'cr7@gmail.com',
        password: 'siu'
    },
        {
        firstName: 'Jude',
        lastname: 'Bellingham',
        email: 'j.bellingham@gmail.com',
        password: 'belligol'
    }
]);

// Agregar la receta favorita a cada uno de los usuarios creados anteriormente
db.usuarios.updateMany(
    {user_id:{$exists:false}}, 
    {
        $set: {
            favorite_recipe: 'Tomato Pasta'
        }
    }    
);

// Consulta para mostrar los distintos nombres de usuarios
db.usuarios.distinct('firstName', {});

// Consulta para buscar todos los usuarios que tengan correo electrónico con dominio de Gmail.
db.usuarios.find({
  email: { $regex: /@gmail\.com$/ }
});

// Agregar un campo de actividad a los usuarios
db.usuarios.updateMany(
  {},
  { $set: { active: true } }
);

// Consulta en la que se inactive a 2 usuarios
db.usuarios.updateMany(
  {user_id:{$exists: true}},
  {$set: {active: false}}
);

// Cambiar la unidad de medida de todas las recetas que tienen lb a kg
db.recetas.updateMany(
  {ingredients: {$elemMatch: {'quantity.unit': 'lbs'}}},
  {$set: {'ingredients.$.quantity.unit': 'kg'}}
);

// Eliminar usuarios inactivos
db.usuarios.deleteMany(
    {active: false}
);
