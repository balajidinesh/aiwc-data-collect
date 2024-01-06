// PartType.tsx
import React, { useState } from 'react';
import PartTypeDetails from './PartTypeDetails'; // Replace with your actual component

interface PartTypeProps {
    onFilledPartTypes: (partTypes: any[]) => void;
}

const PartType: React.FC<PartTypeProps> = ({ onFilledPartTypes }) => {
    const [partTypes, setPartTypes] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<number | null>(null);

    const handleAddPartType = () => {
        setPartTypes([...partTypes, { id: Date.now(), label: `Part Type ${partTypes.length + 1}` }]);
        setActiveTab(partTypes.length);
    };

    const handleRemovePartType = (id: number) => {
        const updatedPartTypes = partTypes.filter((partType) => partType.id !== id);
        setPartTypes(updatedPartTypes);
        setActiveTab(null);
    };

    const handleTabClick = (id: number) => {
        setActiveTab(id);
    };

    const handleFilledPartType = (partType: any) => {
        const updatedPartTypes = partTypes.map((pt) => (pt.id === activeTab ? { ...pt, ...partType } : pt));
        setPartTypes(updatedPartTypes);
    };

    const handleSavePartTypes = () => {
        onFilledPartTypes(partTypes);
    };

    return (
        <div className="flex space-x-4 mt-10">
            <h2>Part Types</h2>
            <div className="flex space-x-4">
                {partTypes.map((partType) => (
                    <div
                        key={partType.id}
                        onClick={() => handleTabClick(partType.id)}
                        className={`cursor-pointer h-10 p-2 border rounded ${activeTab === partType.id ? 'bg-yellow-600' : ''}`}
                    >
                        {partType.label}
                        <button
                            type="button"
                            onClick={() => handleRemovePartType(partType.id)}
                            className="text-red-500 ml-5"
                        >
                            &#10006;
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddPartType} className="h-10 bg-blue-500 text-white p-2 rounded">
                    Add
                </button>
                <button type="button" onClick={handleSavePartTypes} className="h-10 bg-green-500 text-white p-2 rounded">
                    Save
                </button>
            </div>
            {partTypes.map((partType) => (
                <div key={partType.id} style={{ display: activeTab === partType.id ? 'block' : 'none' }}>
                    <PartTypeDetails index={partType.id} onFilledPartType={handleFilledPartType} />
                </div>
            ))}
        </div>
    );
};

export default PartType;
