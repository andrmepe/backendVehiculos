let express=require('express')
let mysql=require('mysql')


const app=express()   

app.use(express.json())

const conexion=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'autos'
})

//a qui esto es para los cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//a qui comenzamos a crear nuestras urls
app.get('/autos',(req,res)=>{
    let sql='SELECT * FROM autos'

    conexion.query(sql,(err,resuls)=>{
        if(err) throw err
        if (resuls.length>0){
            res.json(resuls)
        } else{
            res.send('no hay datos disponibles')
        }
    })
})

//metodo post para subir cosas
app.post('/agregar-auto',(req,res)=>{
    let sql='INSERT INTO autos SET ?'

    let objeto={
        idvehiculo:req.body.idvehiculo,
        nombre:req.body.nombre,
        año_fabricacion:req.body.año_fabricacion,
        precio:req.body.precio,
        cantidad:req.body.cantidad
    }

    conexion.query(sql,objeto,(err)=>{
        if (err) throw err

        res.send('auto agregado')
        
    })

})

//metodo pull para actualizar cosas
app.put('/actualizar-auto/:idvehiculo',(req,res)=>{
    let id=req.params
    let{nombre,año_fabricacion,precio,cantidad}=req.body

    const sql=`UPDATE autos SET nombre="${nombre}", año_fabricacion="${año_fabricacion}",precio=${precio}, cantidad=${cantidad} WHERE idvehiculo=${id.idvehiculo}`

    conexion.query(sql,err=>{
        if (err) throw err

        res.send('auto actualizado')
    })
})


//y el numero del puerto en el que veremos el servidor 
app.listen(3030,()=>{
    console.log('servidor disponible en el puerto 3030')
})