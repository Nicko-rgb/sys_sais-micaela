import React, { useState } from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";
import { FormSector } from '../infoTurno/MiniCompont'
import './sector.css'
import Coordenada from "./Coordenada";

const MapaInteractivo = () => {
    const [selectedManzana, setSelectedManzana] = useState(null);
    const [scale, setScale] = useState({ x: 1, y: 1 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [formPosition, setFormPosition] = useState({ x: 0, y: 0 });
    const [openForm, setOpenForm] = useState(false);
    const {manzanas, viviendas, calles } = Coordenada
    
    const handleManzanaClick = (id, points) => {
        setSelectedManzana(id);
        const centerX = (points[0] + points[4]) / 2;
        const centerY = (points[1] + points[5]) / 2;
        setFormPosition({ x: centerX - (100 / scale.x) /2 , y: centerY - (100 / scale.y) /2 }); // Ajusta la posición del formulario
        setOpenForm(true);
    };

    const closeForm = () => {
        setSelectedManzana(null);
        setOpenForm(false);
    }

    const handleWheel = (e) => {
        e.evt.preventDefault();
        const scaleBy = 1.02;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
        };
        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        setScale({ x: newScale, y: newScale });
        setPosition({
            x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
        });
    };

    return (
        <div className="sector" >
            <h3>Sectores de SAIS</h3>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                scaleX={scale.x}
                scaleY={scale.y}
                x={position.x}
                y={position.y}
                draggable
                onWheel={handleWheel}
                className="stage"
            >
                <Layer>
                    {/* Calles */}
                    {calles.map((calle) => (
                        <Line
                            key={calle.points.join('-')}
                            points={calle.points}
                            stroke={calle.color}
                            strokeWidth={10}
                        />
                    ))}

                    {/* Manzanas */}
                    {manzanas.map((manzana) => (
                        <Line
                            key={manzana.id}
                            points={manzana.points}
                            fill={manzana.color}
                            closed
                            stroke="black"
                            strokeWidth={2}
                            onClick={(e) => {
                                e.cancelBubble = true; // Evita la propagación del evento
                                handleManzanaClick(manzana.id, manzana.points);
                            }}
                        />
                    ))}

                    {/* Viviendas */}
                    {viviendas.map((vivienda) => (
                        <Line
                            key={`${vivienda.manzanaId}-${Math.random()}`} 
                            points={vivienda.points}
                            fill='white'
                            closed
                            stroke="gray"
                            className='vivi'
                            strokeWidth={1}
                        />
                    ))}

                    {/* Etiquetas de manzanas */}
                    {manzanas.map((manzana) => (
                        <Text
                            key={`label-${manzana.id}`}
                            text={`M${manzana.id}`}
                            x={(manzana.points[0] + manzana.points[4]) / 2 - 10}
                            y={(manzana.points[1] + manzana.points[5]) / 2 -10}
                            fontSize={16}
                            fill="black"
                        />
                    ))}
                </Layer>
            </Stage>

            {/* Formulario interactivo */}
            {openForm && (
                <div
                    className='modal'
                    style={{
                        position: 'absolute',
                        top: formPosition.y,
                        left: formPosition.x,
                        backgroundColor: 'white',
                        padding: '10px',
                        border: '1px solid black',
                        borderRadius: '5px',
                        boxShadow: '0px 0px 10px rgba(0 ,0 ,0 ,0.2)',
                    }}
                >
                    <FormSector closeForm={closeForm} selectedManzana={selectedManzana} />
                </div>
            )}
        </div>
    );
};

export default MapaInteractivo;
