import React, { useState } from 'react';
import './Entregasuplemento.module.css'

const Entregasuplemento = ({ title, presentationOptions, defaultPresentation }) => {
  const [deliveryNumber] = useState(1);
  const [date] = useState(new Date().toISOString().split('T')[0]);
  const [quantity, setQuantity] = useState('');
  const [presentation, setPresentation] = useState(defaultPresentation);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Suplemento entregado:\n${title}\nN° Entrega: ${deliveryNumber}\nFecha: ${date}\nCantidad: ${quantity}\nPresentación: ${presentation}`);
  };

  return (
    <div className="supplement-card">
      <h2>{title}</h2>
      <div className="notification">
        <p>Puede entregar estos suplementos!</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>N° Entrega:</label>
          <input type="number" value={deliveryNumber} readOnly />
        </div>
        <div className="form-group">
          <label>Fec. Atención:</label>
          <input type="date" value={date} readOnly />
        </div>
        <div className="form-group">
          <label>Cantidad:</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="C, J, C, B"
            required
          />
        </div>
        <div className="form-group">
          <label>Presentación:</label>
          <select
            value={presentation}
            onChange={(e) => setPresentation(e.target.value)}
          >
            {presentationOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Entregar</button>
      </form>
    </div>
  );
};

const EntregasuplementoContainer = () => {
  const supplementData = [
    { title: 'VITAMINA A', presentationOptions: ['VA', 'VB', 'VC'], defaultPresentation: 'VA' },
    { title: 'Zinc', presentationOptions: ['ZN', 'ZM', 'ZO'], defaultPresentation: 'ZN' },
    { title: 'Antiparasitario', presentationOptions: ['MZ', 'MC', 'MB'], defaultPresentation: 'MZ' },
    { title: 'Suplemento 24m-35m', presentationOptions: ['MN', 'MO', 'MP'], defaultPresentation: 'MN' },
  ];

  return (
    <div className="supplement-form-container">
      {supplementData.map((data, index) => (
        <Entregasuplemento
          key={index}
          title={data.title}
          presentationOptions={data.presentationOptions}
          defaultPresentation={data.defaultPresentation}
        />
      ))}
    </div>
  );
};

// Export the container instead of the single component
export default EntregasuplementoContainer;
