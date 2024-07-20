import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';

const DrawTool = () => {
    const canvasRef = useRef(null);
    const drawingRef = useRef(false);

    const handlePointerMove = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 15;

        if (drawingRef.current) {
            ctx.beginPath();
            ctx.moveTo(e.clientX, e.clientY);
            ctx.lineTo(e.clientX + 1, e.clientY + 1);
            ctx.stroke();
            ctx.closePath();
        }
    };

    const handlePointerDown = () => {
        drawingRef.current = true;
    };

    const handlePointerUp = () => {
        drawingRef.current = false;
    };

    const handleBrowserResize = () => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            handleBrowserResize();
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.addEventListener('pointerdown', handlePointerDown);
            canvas.addEventListener('pointerup', handlePointerUp);
            canvas.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('resize', handleBrowserResize);
        }

        return () => {
            if (canvas) {
                canvas.removeEventListener('pointerdown', handlePointerDown);
                canvas.removeEventListener('pointerup', handlePointerUp);
                canvas.removeEventListener('pointermove', handlePointerMove);
                window.removeEventListener('resize', handleBrowserResize);
            }
        };
    }, []);

    return (
        <div className='relative'>
            <canvas
                id='canvas'
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
            >
                Canvas
            </canvas>

          
        </div>
    );
};

export default DrawTool;
