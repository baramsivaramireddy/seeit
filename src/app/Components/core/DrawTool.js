
'use client'
import React, { useRef, useLayoutEffect, forwardRef, useEffect, useState } from 'react';

import HelperComponent from './HelperComponent';
import ToolBar from '@/app/Components/core/toolBar'
const DrawTool = () => {
    const canvasRef = useRef(null);
    const drawingRef = useRef(false);
    const previousePoints = useRef([0, 0])
    const [isClient, setIsClient] = useState(false)
    const helperComponentRef = useRef(null)
    // tools rect line   ,null freehand
    const selectedTool = useRef(null)
    const handlePointerMove = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 2;

        if (drawingRef.current) {

            const tool = selectedTool.current
            switch (tool) {

                case "freehand":
                    if (previousePoints.current[0] == 0 && previousePoints.current[1] == 0) {
                        draw(ctx, e.x, e.y, e.x, e.y)
                    }
                    else {
                        draw(ctx, previousePoints.current[0], previousePoints.current[1], e.x, e.y)
                    }
                    break
                case "eraser":
                    ctx.strokeStyle = "white"
                    ctx.fillStyle = "white"
                    drawCircle(ctx, e.x, e.y, 10)
                    break
            }

            previousePoints.current[0] = e.x
            previousePoints.current[1] = e.y
        }
    };

    const drawCircle = (ctx, x, y, r) => {

        ctx.beginPath()
        ctx.arc(x, y, r, 0, 360 * (Math.PI / 180))
        ctx.stroke()
        ctx.closePath()

    }
    const drawRect = (ctx, x, y, width, height, px, py) => {
        ctx.beginPath()
        ctx.strokeRect(x, y, width, height)
        ctx.closePath()


    }
    const draw = (ctx, px, py, nx, ny) => {

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        ctx.closePath()

    }

    const handlePointerDown = (e) => {
        drawingRef.current = true;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 2;
        if (selectedTool.current == 'rect') {
            ctx.strokeStyle = "black"
            ctx.fillStyle = "black"
            drawRect(ctx, e.x, e.y, 100, 100)
        } else if (selectedTool.current == 'circle') {
            ctx.strokeStyle = "black"
            drawCircle(ctx, e.x, e.y, 6)
        }
    };

    const handlePointerUp = () => {
        drawingRef.current = false;
        previousePoints.current[0] = 0
        previousePoints.current[1] = 0
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

    const handleKeyDown = (e) => {


        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (e.key === 'R' || e.key === 'r') {
            selectedTool.current = 'rect';
        } else if (e.key === 'l' || e.key === "L") {
            selectedTool.current = 'line';
        }
        else if (e.key === 'f' || e.key === "F") {
            selectedTool.current = 'freehand';
        }
        else if (e.key == 0) {
            selectedTool.current = null
        }
        else if (e.key == 'c') {
            selectedTool.current = "circle"
        }
        else if (e.key == "c" && e.altkey) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
        else if (e.key == 'h' || e.key == 'H') {

            helperComponentRef.current.showModal()
        }
        else if (e.key == 'e') {
            selectedTool.current = "eraser"
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.addEventListener('pointerdown', handlePointerDown);
            canvas.addEventListener('pointerup', handlePointerUp);
            canvas.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('keydown', handleKeyDown);

        }
        window.addEventListener('resize', handleBrowserResize);

        return () => {
            if (canvas) {
                canvas.removeEventListener('pointerdown', handlePointerDown);
                canvas.removeEventListener('pointerup', handlePointerUp);
                canvas.removeEventListener('pointermove', handlePointerMove);
                canvas.removeEventListener('keydown', handleKeyDown);
            }

            window.removeEventListener('resize', handleBrowserResize);
        };
    }, []);



    useEffect(() => {
        setIsClient(true)
    }, [])



    if (isClient) {

        return (<>
            <div className='relative'>

                <canvas
                    id='canvas'
                    ref={canvasRef}
                    width={window.innerWidth}
                    height={window.innerHeight}
                >
                    Canvas
                </canvas>

                <div className='absolute top-5 right-5'>

                    <HelperComponent
                        ref={helperComponentRef} />
                </div>
            </div>
        </>)
    }
    return (
        <div className='relative'>
            <canvas
                id='canvas'
                ref={canvasRef}

            >
                Canvas
            </canvas>


        </div>
    );
};

export default DrawTool;
