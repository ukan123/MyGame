import React from 'react';

interface InventoryProps {
    items: string[];
}

const Inventory: React.FC<InventoryProps> = ({ items }) => {
    if (items.length === 0) {
        return null;
    }
    
    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            backgroundColor: 'rgba(10, 10, 42, 0.9)',
            border: '1px solid #4a4a6a',
            borderRadius: '8px',
            padding: '10px 15px',
            minWidth: '120px',
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>📦 背包</div>
            {items.map((item, idx) => (
                <div key={idx} style={{ fontSize: '14px', color: '#ddd', padding: '2px 0' }}>
                    {item}
                </div>
            ))}
        </div>
    );
};

export default Inventory;