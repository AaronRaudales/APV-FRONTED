import { useState, useEffect } from "react"
import Alerta  from '../components/Alerta'
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})
    const  { guardarPaciente, pacienteEditado } = usePacientes() // lo extrae del Provider

    // Para cuando se quiera editar un registro, me aparezcan los valores en el formulario
    useEffect(()=> {
        if(pacienteEditado?.nombre){
            setNombre(pacienteEditado.nombre)
            setPropietario(pacienteEditado.propietario)
            setEmail(pacienteEditado.email)
            setFecha(pacienteEditado.fecha)
            setSintomas(pacienteEditado.sintomas)
            setId(pacienteEditado._id) // Cuando se esta editando 1 solo paciente, alli si tenemos un id 
        }
    },[pacienteEditado]) // Le pasamos la dependencia

    const handleSubmit = e => {
        e.preventDefault()

        // Validar el formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error:true
            });
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return;
        }

        setAlerta({})
        guardarPaciente({nombre, propietario, email, fecha, sintomas, id})
        setAlerta({
            msg: 'Guardado Correctamente'
        })
        setTimeout(() => {
            setAlerta({})
        }, 3000);
        // Reiniciar los datos
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')

    }

    const {msg} = alerta;

  return (
    <>
        <h2 className="font-black text-3xl text-center">Aministrador de Pacientes</h2>
        <p className="text-center mb-10 text-xl mt-5"> 
            Añade tus pacientes y {''}
            <span className="font-bold text-indigo-600">Administralos</span>
        </p>
        {msg && <Alerta alerta={alerta}/>}
        <form 
            className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
            onSubmit={handleSubmit}
        >
            <div className="mb-5">
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
                <input 
                type="text"
                id="nombre"
                placeholder="Nombre de la Mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={nombre}
                onChange={ e => setNombre(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
                <input 
                type="text"
                id="propietario"
                placeholder="Nombre de la Propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={propietario}
                onChange={ e => setPropietario(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email</label>
                <input 
                type="email"
                id="email"
                placeholder="Email del Propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange={ e => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
                <input 
                type="date"
                id="fecha"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={fecha}
                onChange={ e => setFecha(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Sintomas</label>
                <textarea 
                id="sintomas"
                placeholder="Describe los Sintomas"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={sintomas}
                onChange={ e => setSintomas(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-lg"
                value={ id ? 'Guardar Cambios' : 'Agregar Paciente' }
            
            />

        </form>
    
    </>
  )
}

export default Formulario