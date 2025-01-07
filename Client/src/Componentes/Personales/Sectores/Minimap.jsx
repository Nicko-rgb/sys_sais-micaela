import React, { useEffect, useRef } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import miniMap from '../../IMG/miniMap.png'
import { useState } from 'react';

const MiniMap = ({ viewDataMap  }) => {
    const imageRef = useRef(null);
    const [image, setImage] = React.useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 }); // Posición inicial del mapa
    const [scale, setScale] = useState(2); // Escala inicial para el zoom
    

    useEffect(() => {
        const img = new window.Image();
        img.src = miniMap
        img.onload = () => {
            setImage(img);
        };
    }, []);

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
        <div className={`miniMap ${viewDataMap ? '' : 'noView'}`}>
            <Stage
                width={window.innerWidth / 2}
                height={window.innerHeight / 2}
                draggable
                onDragEnd={handleDrag}
                onWheel={handleWheel}
                scaleX={scale}
                scaleY={scale}
                x={position.x}
                y={position.y}
            >
                <Layer>
                    {image && (
                        <KonvaImage
                            ref={imageRef}
                            image={image}
                            x={5} 
                            y={5}
                            width={100}
                            height={100}
                        />
                    )}
                </Layer>
            </Stage>
        </div>
    );
};

export default MiniMap;
