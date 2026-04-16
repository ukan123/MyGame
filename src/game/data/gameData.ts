import type { GameScene } from '../types/gameTypes';

export const scenes: Record<string, GameScene> = {
    room1: {
        id: 'room1',
        name: '老旧的房间',
        backgroundImage: '',
        initialDialogue: '你睁开眼，发现自己躺在一张陌生的床上。房间里很暗，只有窗外透进来的月光。',
        items: [
            {
                id: 'desk',
                name: '书桌',
                x: 250, y: 200, width: 120, height: 80,
                description: '一张积满灰尘的书桌。',
                givesItem: 'diary'
            },
            {
                id: 'window',
                name: '窗户',
                x: 500, y: 100, width: 100, height: 150,
                description: '窗外是寂静的街道，空无一人。'
            },
            {
                id: 'door',
                name: '房门',
                x: 100, y: 150, width: 60, height: 120,
                description: '房门紧锁着。',
                requiredItem: 'key',
                nextScene: 'hallway'
            }
        ]
    },
    hallway: {
        id: 'hallway',
        name: '走廊',
        backgroundImage: '',
        initialDialogue: '走廊很长，尽头是一扇半开的门。墙上的挂钟停止了摆动。',
        items: [
            {
                id: 'clock',
                name: '挂钟',
                x: 300, y: 50, width: 80, height: 120,
                description: '钟停在 11:45。'
            },
            {
                id: 'door',
                name: '尽头的门',
                x: 600, y: 200, width: 60, height: 100,
                description: '门后传来奇怪的声音。',
                nextScene: 'final_room'
            }
        ]
    },
    final_room: {
        id: 'final_room',
        name: '未知的房间',
        backgroundImage: '',
        initialDialogue: '你推开门，眼前的一幕让你愣住了...',
        items: []
    }
};