import React, { useState, useEffect } from 'react';

interface DialogueBoxProps {
    text: string;
    onComplete?: () => void;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ text, onComplete }) => {
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);
    
    useEffect(() => {
        if (index < text.length) {
            const timer = setTimeout(() => {
                setDisplayText(prev => prev + text[index]);
                setIndex(i => i + 1);
            }, 30);
            return () => clearTimeout(timer);
        } else if (onComplete) {
            onComplete();
        }
    }, [index, text, onComplete]);
    
    useEffect(() => {
        setDisplayText('');
        setIndex(0);
    }, [text]);
    
    return (
        <div style={{
            backgroundColor: '#0a0a2a',
            border: '2px solid #4a4a6a',
            borderRadius: '12px',
            padding: '18px 22px',
            minHeight: '100px',
            color: '#e0e0e0',
            fontFamily: '"Noto Sans JP", monospace',
            fontSize: '16px',
            lineHeight: '1.6',
            letterSpacing: '0.5px'
        }}>
            {displayText}
            {index === text.length && (
                <span style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '16px',
                    backgroundColor: '#e0e0e0',
                    marginLeft: '4px',
                    animation: 'blink 1s step-end infinite'
                }} />
            )}
            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default DialogueBox;