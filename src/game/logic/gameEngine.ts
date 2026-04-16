import { scenes } from '../data/gameData';
import { gameState, addToInventory, updateGameState, hasItem } from './gameState';
import type { GameItem } from '../types/gameTypes';

export interface InteractionResult {
    dialogue: string;
    newSceneId?: string;
    updated: boolean;
}

export function interactWithItem(item: GameItem): InteractionResult {
    // 检查是否需要特定道具
    if (item.requiredItem && !hasItem(item.requiredItem)) {
        return {
            dialogue: `需要【${item.requiredItem}】才能使用。`,
            updated: false
        };
    }
    
    let dialogue = item.description;
    
    // 获得道具
    if (item.givesItem) {
        addToInventory(item.givesItem);
        dialogue += ` 你获得了【${item.givesItem}】。`;
    }
    
    // 切换场景
    let newSceneId = undefined;
    if (item.nextScene) {
        newSceneId = item.nextScene;
        updateGameState({ currentSceneId: newSceneId });
    }
    
    return {
        dialogue,
        newSceneId,
        updated: true
    };
}

export function getCurrentScene() {
    return scenes[gameState.currentSceneId];
}