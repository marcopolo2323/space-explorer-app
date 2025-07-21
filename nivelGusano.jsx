import React from 'react';
import GameGusano from './GameGusano';

export default function NivelGusano({ onRegresar }) {
  return (
    <div style={{ padding: '20px' }}>
      <button onClick={onRegresar} style={{
        marginBottom: '10px',
        backgroundColor: '#6cb7ef',
        padding: '8px 16px',
        borderRadius: '10px',
        border: 'none',
        color: '#fff',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}>
        ⬅ Regresar al menú
      </button>
      <GameGusano />
    </div>
  );
}
