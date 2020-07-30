import React,{useState} from 'react'
import Error from './Error'
import PropTypes from 'prop-types'

const Formulario = ({busqueda,setGuardarBusqueda,setGuardarConsultar}) => {

    

    const [error, setGuardarError] = useState(false);

    const {ciudad, pais} = busqueda;

    // F que coloca los elementos en el State
    const handleChange = e => {
        // Actualizar el state
        setGuardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    // F cuando el usuario da submit al form
    const hanldeSubmit = e => {
        e.preventDefault();

        // Validar
        if(ciudad.trim() === '' || pais.trim() === ''){
            setGuardarError(true);
            return;
        }
        setGuardarError(false);

        setGuardarConsultar(true);

    }

    return (
        <form
            onSubmit={hanldeSubmit}
        >
            {
                error ? <Error mensaje="Ambos campos son Obligatorios"/> : null
            }
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12 ">
                <select
                    name="pais"
                    id="pais"                   
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione un País --</option>
                    <option value="MX">México</option>
                    <option value="US">Estados Unidos</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">País: </label>
                    

            </div>
            <div className="input-field col s12 center-align">
                <button 
                    type="submit"
                    value="Buscar Clima"
                    className="btn waves-effect waves-light btn-large btn-block yellow accent-4 black-text"

                >Buscar Clima</button>

            </div>
        </form>
    )
}

Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    setGuardarConsultar:PropTypes.func.isRequired ,
    setGuardarBusqueda: PropTypes.func.isRequired,
}

export default Formulario
