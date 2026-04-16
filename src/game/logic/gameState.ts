import type { GameState } from '../types/gameTypes';

export let gameState: GameState = {
    currentSceneId: 'room1',
    inventory: [],
    flags: {}
};

export function updateGameState(newState: Partial<GameState>) {
    Object.assign(gameState, newState);
}

export function addToInventory(item: string) {
    if (!gameState.inventory.includes(item)) {
        gameState.inventory.push(item);
    }
}

export function hasItem(item: string): boolean {
    return gameState.inventory.includes(item);
}

export function setFlag(flag: string, value: boolean) {
    gameState.flags[flag] = value;
}

export function getFlag(flag: string): boolean {
    return gameState.flags[flag] || false;
}