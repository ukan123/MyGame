import React, { useState, useEffect } from 'react';
import GameCanvas from './components/GameCanvas';
import DialogueBox from './components/DialogueBox';
import Inventory from './components/Inventory';
import { getCurrentScene, interactWithItem } from './logic/gameEngine';
import { gameState, updateGameState } from './logic/gameState';

const GameApp: React.FC = () => {
    const [currentScene, setCurrentScene] = useState(getCurrentScene());
    const [dialogue, setDialogue] = useState(currentScene.initialDialogue);
    const [showDialogue, setShowDialogue] = useState(true);
    const [inventory, setInventory] = useState([...gameState.inventory]);
    
    // 监听状态变化
    useEffect(() => {
        const scene = getCurrentScene();
        setCurrentScene(scene);
        setDialogue(scene.initialDialogue);
        setShowDialogue(true);
        setInventory([...gameState.inventory]);
    }, [gameState.currentSceneId]);
    
    const handleItemClick = (itemId: string) => {
        const item = currentScene.items.find(i => i.id === itemId);
        if (!item) return;
        
        const result = interactWithItem(item);
        setDialogue(result.dialogue);
        setShowDialogue(true);
        
        if (result.newSceneId) {
            setCurrentScene(getCurrentScene());
            setInventory([...gameState.inventory]);
        } else {
            setInventory([...gameState.inventory]);
        }
    };
    
    const handleDialogueComplete = () => {
        setShowDialogue(false);
    };
    
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#0a0a0a',
            padding: '20px'
        }}>
            <div style={{ position: 'relative' }}>
                <GameCanvas scene={currentScene} onItemClick={handleItemClick} />
                <Inventory items={inventory} />
            </div>
            
            <div style={{ width: '800px', marginTop: '20px' }}>
                {showDialogue && (
                    <DialogueBox 
                        text={dialogue} 
                        onComplete={handleDialogueComplete}
                    />
                )}
            </div>
            
            <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
                当前场景: {currentScene.name}
            </div>
        </div>
    );
};

export default GameApp;