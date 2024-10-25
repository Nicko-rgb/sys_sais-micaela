import React from 'react'
import './sector.css'

const Sector = () => {
    return (
        <div className="sector">
            <h3>Asignar Sector</h3>
            <main className="content-mapa">
                <div className="map-container">
                    <h1>Plano Jurisdiccional - Centro de Salud</h1>
                    <svg viewBox="0 0 1200 1200" className="map-svg">
                        {/* Manzanas verdes (viviendas) */}
                        <rect className="vivienda" x="50" y="50" width="80" height="80" />
                        <text x="70" y="90" className="map-label">MBA001</text>

                        <rect className="vivienda" x="150" y="50" width="80" height="80" />
                        <text x="170" y="90" className="map-label">MBA002</text>

                        <rect className="vivienda" x="250" y="50" width="80" height="80" />
                        <text x="270" y="90" className="map-label">MBA003</text>

                        {/* Ejemplo de manzana roja (colegios) */}
                        <rect className="colegio" x="350" y="50" width="100" height="80" />
                        <text x="370" y="90" className="map-label">MBB023</text>

                        {/* Ejemplo de manzana celeste (centro de salud) */}
                        <rect className="centro-salud" x="500" y="50" width="120" height="120" />
                        <text x="520" y="110" className="map-label">ESSALUD</text>

                        {/* Más bloques */}
                        <rect className="vivienda" x="50" y="150" width="80" height="80" />
                        <text x="70" y="190" className="map-label">MBA004</text>

                        <rect className="vivienda" x="150" y="150" width="80" height="80" />
                        <text x="170" y="190" className="map-label">MBA005</text>

                        <rect className="colegio" x="250" y="150" width="100" height="80" />
                        <text x="270" y="190" className="map-label">MBB010</text>

                        {/* Ejemplo de área agropecuaria */}
                        <rect className="agropecuario" x="400" y="150" width="150" height="120" />
                        <text x="420" y="220" className="map-label">IE AGROPECUARIO</text>

                        {/* Agregar tantas manzanas como sea necesario... */}
                    </svg>
                </div>
            </main>
        </div>
    )
}

export default Sector