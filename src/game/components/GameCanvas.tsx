import React, { useRef, useEffect } from 'react';
import type { GameScene } from '../types/gameTypes';

interface GameCanvasProps {
    scene: GameScene;
    onItemClick: (itemId: string) => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ scene, onItemClick }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // 绘制背景（深色渐变）
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 绘制物品热点（蓝色半透明，调试用）
        scene.items.forEach(item => {
            ctx.fillStyle = 'rgba(100, 150, 255, 0.3)';
            ctx.fillRect(item.x, item.y, item.width, item.height);
            ctx.strokeStyle = '#ffffff';
            ctx.strokeRect(item.x, item.y, item.width, item.height);
            ctx.fillStyle = '#ffffff';
            ctx.font = '14px "Noto Sans JP", sans-serif';
            ctx.fillText(item.name, item.x + 5, item.y + 20);
        });
        
    }, [scene]);
    
    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;
        
        const clickedItem = scene.items.find(item =>
            clickX >= item.x && clickX <= item.x + item.width &&
            clickY >= item.y && clickY <= item.y + item.height
        );
        
        if (clickedItem) {
            onItemClick(clickedItem.id);
        }
    };
    
    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={450}
            onClick={handleClick}
            style={{
                border: '2px solid #2a2a4a',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
        />
    );
};

export default GameCanvas;