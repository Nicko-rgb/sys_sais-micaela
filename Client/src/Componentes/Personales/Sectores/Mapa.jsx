import React, { useState } from "react";
import { Stage, Layer, Text, Group, Line } from "react-konva";
import "./sector.css";
import Coordenada from "./Coordenada";

const Mapa = ({selectManzana, setSelectManzana }) => {

    const { manzanas, calles } = Coordenada;
    const [scale, setScale] = useState(1); // Escala inicial para el zoom
    const [position, setPosition] = useState({ x: 0, y: 0 }); // Posición inicial del mapa

    const handleManzanaClick = (manzana) => {
        setSelectManzana(manzana);
    };


    const handleWheel = (e) => {
        e.evt.preventDefault();
        const scaleBy = 1.1;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
        };

        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        stage.scale({ x: newScale, y: newScale });
        setScale(newScale);

        const newPos = {
            x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
        };
        stage.position(newPos);
        setPosition(newPos);
    };

    const handleDrag = (e) => {
        setPosition({ x: e.target.x(), y: e.target.y() });
    };


    return (
        <>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                draggable
                onDragEnd={handleDrag}
                onWheel={handleWheel}
                scaleX={scale}
                scaleY={scale}
                x={position.x}
                y={position.y}
                className="stage"
                rotation={-8}
            >
                <Layer >
                    {/* Renderiza calles */}
                    {calles.map((calle) => {
                        // Obtén los puntos iniciales y finales de la calle
                        const [x1, y1, x2, y2] = calle.points;

                        // Calcula el punto medio para posicionar el texto
                        const centerX = (x1 + x2) / 2;
                        const centerY = (y1 + y2) / 2;

                        // Calcula el ángulo de inclinación de la calle
                        const angleRadians = Math.atan2(y2 - y1, x2 - x1);
                        const angleDegrees = (angleRadians * 180) / Math.PI;

                        return (
                            <Group key={calle.id}>
                                {/* Dibuja la calle */}
                                <Line
                                    points={calle.points}
                                    stroke={calle.color}
                                    strokeWidth={calle.ancho}
                                    // rotationDeg={-8}
                                />
                                {/* Dibuja el texto de la calle */}
                                <Text
                                    text={calle.text}
                                    x={centerX + 6}
                                    y={centerY + -5}
                                    fontSize={12}
                                    fill="black"
                                    fontStyle="italic"
                                    align="center"
                                    verticalAlign="middle"
                                    rotation={angleDegrees} // Rota el texto según la dirección de la calle
                                    offsetX={(calle.text.length * 6) / 2} // Ajusta para centrar horizontalmente
                                />
                            </Group>
                            
                        );
                    })}


                    {/* Renderiza manzanas */}
                    {manzanas.map((manzana) => {
                        const xCoords = manzana.points.filter((_, i) => i % 2 === 0);
                        const yCoords = manzana.points.filter((_, i) => i % 2 !== 0);
                        const centerX = (Math.min(...xCoords) + Math.max(...xCoords)) / 2;
                        const centerY = (Math.min(...yCoords) + Math.max(...yCoords)) / 2;
                        const topRightX = Math.max(...xCoords) - 10;
                        const topRightY = Math.min(...yCoords) + 15;

                        // Divide el texto en líneas
                        const textLines = manzana.text.split("\n");
                        const totalLines = textLines.length;

                        return (
                            <Group
                                key={manzana.id}
                                onClick={() => handleManzanaClick(manzana)}
                                style={{ cursor: "pointer" }}
                                // rotation={-8}
                            >
                                <Line
                                    points={manzana.points}
                                    closed
                                    fill={selectManzana?.id === manzana.id ? '#28a768': manzana.color }
                                    stroke={selectManzana?.id === manzana.id ? 'rgb(255, 93, 93)' : 'black'}
                                    strokeWidth={selectManzana?.id === manzana.id ? 4 : 2}
                                />
                                {textLines.map((text, index) => (
                                    <Text
                                        key={index}
                                        x={centerX} // Centrado horizontalmente
                                        y={centerY + (index - (totalLines - 1) / 2) * 12} // Centrado verticalmente
                                        fontSize={13}
                                        fill={index === 0 ? "blue" : index === 1 ? "red" : "black"} // Cambia el color según el índice
                                        fontStyle="bold"
                                        text={text}
                                        align="center"
                                        offsetX={text.length * 3.5} // Ajusta este valor según la fuente y tamaño
                                    />
                                ))}
                                <Text
                                    x={topRightX - 25}
                                    y={topRightY - 11}
                                    fontSize={11}
                                    fill="black"
                                    text={manzana.mz}
                                    align="right"
                                />
                            </Group>
                        );
                    })}
                </Layer>
            </Stage>
        </>
    );
};

export default Mapa;
