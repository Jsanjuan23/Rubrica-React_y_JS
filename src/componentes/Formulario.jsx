import React from 'react'
import logo from '../hospital.png'
import {firebase} from '../firebase'
import {nanoid} from 'nanoid'
import swal from 'sweetalert'
const Formulario = () => {
  const hoy = new Date()
  const fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
  const [lista, setLista] = React.useState([])
  const [id, setId] = React.useState('')
  const [nombre, setNombre] = React.useState('')
  const [apellido, setApellido] = React.useState('')
  const [fechan, setFechan] = React.useState('')
  const [edad, setEdad] = React.useState('')
  const [sexo, setSexo] = React.useState('')
  const [eps, setEps] = React.useState('')
  const [ciudad, setCiudad] = React.useState('')
  const [dir, setDir] = React.useState('')
  const [correo, setCorreo] = React.useState('')
  const [auxcorreo, setAuxcorreo] = React.useState('')
  const [cel, setCel] = React.useState('')
  const [motivo, setMotivo] = React.useState('')

  const [edicion, setEdicion] = React.useState(false)


  // ------------------               MOSTRAR TABLA         ------------------------

  React.useEffect(()=>{
    const traerdato = async () => {
      try {
        const db = firebase.firestore()
        const data = await db.collection('registros').get()
        const arraydata = data.docs.map(item =>(
          {
          id: item.id, ...item.data()
          }
        ))
        setLista(arraydata)
      } catch (error) {
        console.log(error)        
      }
    }
    traerdato();
  }
  )
  
// ---------------------------------------------------------------------------------------------------

  // ------------------               GUARDAR         ------------------------
  const guardar = async(e) =>{
    
    e.preventDefault()

    if(!nombre.trim() || !apellido.trim() || !fechan.trim() || !edad.trim() || !sexo.trim() || !eps.trim() || !ciudad.trim() || !dir.trim() || !correo.trim() || !cel.trim() || !motivo.trim()){
        swal({
          title: "Error",
          text: "No puede dejar ningún campo vacio.",
          icon: "error",
          button: "Aceptar"
        })
        return
    }

    try {

      const db = firebase.firestore()
      const nuevo_r = {
        nombre_ : nombre,
        apellido_ : apellido,
        fecha_ : fechan,
        edad_ : edad,
        sexo_ : sexo,
        eps_ : eps,
        ciudad_ : ciudad,
        dir_ : dir,
        correo_ : correo+'@'+auxcorreo,
        cel_ : cel,
        motivo_ : motivo   
      }

      db.collection('registros').add(nuevo_r)
      setLista([
        ...lista,
        {
          id:nanoid(),
          nombre_ : nombre,
          apellido_ : apellido,
          fecha_ : fechan,
          edad_ : edad,
          sexo_ : sexo,
          eps_ : eps,
          ciudad_ : ciudad,
          dir_ : dir,
          correo_ : correo+'@'+auxcorreo,
          cel_ : cel,
          motivo_ : motivo   
        }
    ])

      swal({
        title: "Correcto",
        text: "Su registro ha sido guardado exitosamente.",
        icon: "success",
        button: "Aceptar"
      })
      e.target.reset()
      setNombre('')
      setApellido('')
      setFechan('')
      setEdad('')
      setSexo('')
      setEps('')
      setCiudad('')
      setDir('')
      setCorreo('')
      setAuxcorreo('')
      setCel('')
      setMotivo('')
      
    } catch (error) { 
    }
  }
// ---------------------------------------------------------------------------------------------------

 // ------------------               EDITAR         ------------------------

const editar = (item) =>{
  
  setNombre(item.nombre_)
  setApellido(item.apellido_)
  setFechan(item.fecha_)
  setEdad(item.edad_)
  setSexo(item.sexo_)
  setEps(item.eps_)
  setCiudad(item.ciudad_)
  setDir(item.dir_)
  setCorreo(item.correo_)
  setCel(item.cel_)
  setMotivo(item.motivo_)
  setEdicion(true)
  setId(item.id)

}

// ---------------------------------------------------------------------------------------------------

// ------------------              EDITAR REGISTRO         ------------------------

   const editar_registro =  async e =>{
    e.preventDefault()
    try {
     const db = firebase.firestore()
     await db.collection('registros').doc(id).update({
       nombre_ : nombre,
       apellido_ : apellido,
       fecha_ : fechan,
       edad_ : edad,
       sexo_ : sexo,
       eps_ : eps,
       ciudad_ : ciudad,
       dir_ : dir,
       correo_ : correo,
       cel_ : cel,
       motivo_ : motivo
 
     })

     const array =  lista.map(
      item => item.id === id ? {

      id:id,
      nombre_ : nombre,
      apellido_ : apellido,
      fecha_ : fechan,
      edad_ : edad,
      sexo_ : sexo,
      eps_ : eps,
      ciudad_ : ciudad,
      dir_ : dir,
      correo_ : correo,
      cel_ : cel,
      motivo_ : motivo 

    }: item 
    )
  setLista(array)
  setNombre('')
    setApellido('')
    setFechan('')
    setEdad('')
    setSexo('')
    setEps('')
    setCiudad('')
    setDir('')
    setCorreo('')
    setAuxcorreo('')
    setCel('')
    setMotivo('')
  setEdicion(false)

    } catch (error) {
      console.log(error)
    }
  
  
}

// ---------------------------------------------------------------------------------------------------

// ------------------               ELIMINAR         ------------------------
const eliminar = async id =>{
  
  try {
    const db = firebase.firestore()
    await db.collection('registros').doc(id).delete()
    swal({
      title: "Correcto",
      text: "Su registro ha sido guardado exitosamente.",
      icon: "success",
      button: "Aceptar"
    })
    const aux =lista.filter(item=>item.id !== id)
    setLista(aux)
  } catch (error) {
    swal(error)
  }


}

// ---------------------------------------------------------------------------------------------------


// ------------------               CANCELAR         ------------------------
const cancelar = e =>{
  setNombre('')
  setApellido('')
  setFechan('')
  setEdad('')
  setSexo('')
  setEps('')
  setCiudad('')
  setDir('')
  setCorreo('')
  setAuxcorreo('')
  setCel('')
  setMotivo('')
  setId('')
  setEdicion(false)
}

// ---------------------------------------------------------------------------------------------------

return (

<div>
<form onSubmit={
  
  edicion ? editar_registro : guardar
}

>
        <div class="p-3 mb-2 bg-info">
          <h1 class="text-white" align="center">CENTRO DE SALUD "EL COCO"</h1>
        </div>
    
    <br />
    <img src={logo} alt="" class="img-fluid"></img>
    <br />
  <br />
    <h3 class="text-dark">Registro de pacientes</h3>
    <br />

    <h6 for="disabledTextInput" class="text-primary" >{fecha}</h6>
    <br />
    <h6 for="disabledTextInput" class="text-success">{
    edicion ? 'Actualización de datos' : ''
    }
    </h6>
    <br />

    <div class="form-row">

     <div class="form-group col-md-6">
       <label for="inputEmail4">Nombres</label>
       <input type="text" class="form-control" id="inputEmail4" value={nombre} onChange={(e)=> setNombre(e.target.value)}></input>
     </div>

     <div class="form-group col-md-6">
       <label for="inputEmail4">Apellidos</label>
       <input type="text" class="form-control" id="inputEmail4" value={apellido} onChange={(e)=> setApellido(e.target.value)} ></input>
     </div>
     
     </div>

     <div class="form-row">
     <div class="form-group col-md-3">
       <label for="inputEmail4">Fecha de nacimiento</label>
       <input type="text" class="form-control" id="inputEmail4" value={fechan} onChange={(e)=> setFechan(e.target.value)} ></input>
     </div>

     <div class="form-group col-md-2">
       <label for="inputEmail4">Edad</label>
       <input type="text" class="form-control" id="inputEmail4" value={edad} onChange={(e)=> setEdad(e.target.value)} ></input>
     </div>
     
     <div class="form-group col-md-3">
      <label for="inputState">Sexo</label>
      <select id="inputState" class="form-control" value={sexo} onChange={(e)=> setSexo(e.target.value)}>
        <option selected>Seleccione...</option>
        <option>Masculino</option>
        <option>Femenino</option>
      </select>
    </div>

    <div class="form-group col-md-4">
      <label for="inputState">EPS</label>
      <select id="inputState" class="form-control" value={eps} onChange={(e)=> setEps(e.target.value)}>
        <option selected>Seleccione...</option>
        <option>Sura</option>
        <option>Conmeva</option>
        <option>Nueva Eps</option>
        <option>Comparta</option>
      </select>
    </div>


     </div>

     <div class="form-row">
     
    <div class="form-group col-md-3">
      <label for="inputCity">Ciudad</label>
      <input type="text" class="form-control" id="inputCity" value={ciudad} onChange={(e)=> setCiudad(e.target.value)}></input>
    </div>

    <div class="form-group col-md-3">
       <label for="inputCity">Dirección</label>
       <input type="text" class="form-control" id="inputCity" value={dir} onChange={(e)=> setDir(e.target.value)}></input>
     </div>

     <div class="form-group col-md-2">
       <label for="inputEmail4">Correo electronico</label>
       <input type="text" class="form-control mb-2" id="inlineFormInput" value={correo} onChange={(e)=> setCorreo(e.target.value)}></input>
     </div>

     <div class="form-group col-md-2">
       <label for="inputEmail4">...</label>
       <div class="input-group mb-2">
          <div class="input-group-prepend">
           <div class="input-group-text">@</div>
          </div>
          {
            edicion ? <input type="text" disabled="true" class="form-control" id="inlineFormInputGroup"></input> 
            :
            <input type="text" class="form-control" id="inlineFormInputGroup"  value={auxcorreo} onChange={(e)=> setAuxcorreo(e.target.value)} >
            </input>
          }
       
       </div>
     </div>

     <div class="form-group col-md-2">
      <label for="inputZip">Celular</label>
      <input type="text" class="form-control" id="inputZip" value={cel} onChange={(e)=> setCel(e.target.value)}></input>
    </div>

     </div>
        
<br />

<div class="card text-center">

  <div class="card-body">
    <h5 class="card-title" >Motivo de la consulta</h5>
    <label  align="center"></label>
    <textarea class="form-control " id="validationTextarea" placeholder="Ingresa una breve descripción" value={motivo} onChange={(e)=> setMotivo(e.target.value)}></textarea>
  </div>
</div>

<div class="card text-center">
{
  edicion ? 
  <>
<button class="btn btn-secondary btn-lg" type="sumit" >Actualizar</button>
<button class="btn btn-warning btn-lg" type="submit" onClick={(cancelar)} >Cancelar</button>
  </>
  :
  <>
  <button type="submit" class="btn btn-success"><h5>Guardar</h5></button>
  </>
}

</div>

</form>
<br />
<br />
<div class="table-responsive">
<table class="table ">

  <thead class="gb-primary">
    <tr>
      <th scope="col" class="text-center">#</th>
      <th scope="col" class="text-center">Nombre</th>
      <th scope="col" class="text-center">Apellidos</th>
      <th scope="col" class="text-center">Fecha nacimiento</th>
      <th scope="col" class="text-center">Edad</th>
      <th scope="col" class="text-center">Sexo</th>
      <th scope="col" class="text-center">EPS</th>
      <th scope="col" class="text-center">Ciudad</th>
      <th scope="col" class="text-center">Dirección</th>
      <th scope="col" class="text-center">Correo</th>
      <th scope="col" class="text-center">Celular</th>
      <th scope="col" class="text-center">.</th>
      <th scope="col" class="text-center">.</th>
      <th scope="col" class="text-center">.</th>
    </tr>
  </thead>

  <tbody >
        
            {
             
            lista.map((item,index)=>(
            <tr key={item.id} >
             
              <th>
              {index+1}
              </th>
              <td class="text-center">
              <spam className='lead' >{item.nombre_}</spam>
              </td>
              <td class="text-center">
              <spam className='lead'>{item.apellido_}</spam>
              </td>
              <td class="text-center">
              <spam className='lead'>{item.fecha_}</spam>
              </td>
              <td class="text-center">
              <spam className='lead'>{item.edad_}</spam>
              </td>
              <td class="text-center">
              <spam className='lead'>{item.sexo_}</spam>
              </td>
              <td class="text-center">
              <spam className='lead'>{item.eps_}</spam>
              </td>
              <td class="text-center">
              <spam className='lead'>{item.ciudad_}</spam>
              </td>
              <td class="text-center">
              <spam className='lead'>{item.dir_}</spam>
              </td>
              <td class="text-center">
              <spam className='lead' >{item.correo_}</spam>
              </td>
              <td class="text-center">
              <spam className='lead'>{item.cel_}</spam>
              </td>
              <td class="text-center">
              <a href="www.facebook.com" class="text-primary">Ver más...
              </a>
              </td>
              <td class="text-center">
              <button className='btn btn-danger btn-sm float-end mx-2' type='submit' onClick={()=>eliminar(item.id)}> Eliminar </button>
              </td>
              <td class="text-center">
              <button className='btn btn-secondary btn-sm float-end mx-2'  onClick={()=>editar(item)}> Editar </button>  
              </td>
    
            </tr>
            
            ))}
                  
                

  </tbody>
</table>
</div>

</div>
  )
}

export default Formulario