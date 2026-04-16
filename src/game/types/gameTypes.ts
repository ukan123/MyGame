// 可交互物品
export interface GameItem {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    description: string;
    givesItem?: string;
    requiredItem?: string;
    nextScene?: string;
}

// 游戏场景
export interface GameScene {
    id: string;
    name: string;
    backgroundImage: string;
    items: GameItem[];
    initialDialogue: string;
}

// 游戏状态
export interface GameState {
    currentSceneId: string;
    inventory: string[];
    flags: Record<string, boolean>;
}