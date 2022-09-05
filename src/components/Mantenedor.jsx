import React,{useState,useEffect} from 'react'


const getRegistros=()=>{
  const data = localStorage.getItem('Registros');
  if(data){
    return JSON.parse(data)
  }
  else{
    return []
  }
}

export const Mantenedor = () => {

  
  const [registros, setRegistros]=useState(getRegistros());
  const [tareaValue, setTareaValue]=useState('');

  const botonGuardar=(e)=>{
    e.preventDefault();

    const date = new Date();
    const time = date.getTime();

    let objectTarea={
      ID: time,
      TareaValue: tareaValue,
    }
    setRegistros([...registros, objectTarea]);
    setTareaValue('');
  }

  useEffect(()=>{
    localStorage.setItem('Registros', JSON.stringify(registros));
  },[registros]) 

  const botonEliminar=(id)=>{

    if (window.confirm("¿Quieres eliminar la tarea?")) {
        const filtered = registros.filter((reg)=>{
            return reg.ID !== id;
          })
          setRegistros(filtered);
    }
    
  }

  const [editForm,setEditForm]=useState(false);

  const [id, setId]=useState();

  const botonEditar=(reg, index)=>{
    setEditForm(true);
    setId(index);
    setTareaValue(reg.TareaValue);
  }

  const botonEditarGuardar=(e)=>{
    e.preventDefault();
    let items = [...registros];
    let item = items[id];
    item.TareaValue = tareaValue;
    items[id] = item;
    setRegistros(items);
    setTareaValue('');
    setEditForm(false);
  }

    return (
        <>

          {editForm===false&&(
            <div className="form">
              <form autoComplete="off" onSubmit={botonGuardar}>
                <div className="input-and-button">
                  <input type='text' placeholder="Ingresa una tarea" required
                  onChange={(e)=>setTareaValue(e.target.value)} value={tareaValue}/>
                  <div className='button edit'>
                    <button type="submit">
                      Agregar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          {editForm===true&&(
            <div className="form">
              <form autoComplete="off" onSubmit={botonEditarGuardar}>
                <div className="input-and-button">
                  <input type='text' placeholder="Add an Item" required
                  onChange={(e)=>setTareaValue(e.target.value)} value={tareaValue}/>
                  <div className='button edit'>
                    <button type="submit">
                      Editar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          
            <>
              {registros.map((objTarea,index)=>(
                <div className='todo' key={objTarea.ID}>
                  <div>
                    {editForm===false&&(
                        <i className="bi bi-chevron-right"></i>
                    )}
                    <span>{objTarea.TareaValue}</span>
                  </div>

                  {editForm===false&&(
                      <div className='edit-and-delete'>

                        <div style={{marginRight:7+'px'}}
                        onClick={()=>botonEditar(objTarea,index)}>
                          <i className=" btn btn-outline-primary bi bi-pencil-fill"></i>
                        </div>
    
                        <div onClick={()=>botonEliminar(objTarea.ID)}>
                          <i className="btn btn-outline-danger bi bi-trash3-fill"></i>
                        </div>
 
                      </div>
                  )}

                </div>
              ))}

             
              
            </>
          

        </>
    )
}