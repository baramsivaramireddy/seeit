
'use client'
import React, { useRef, useLayoutEffect, forwardRef, useEffect, useState } from 'react';
import PanelComponent from './Panel';
import HelperComponent from './HelperComponent';
import ToolBar from '@/app/Components/core/toolBar'
const DrawTool = () => {
    const canvasRef = useRef(null);
    const drawingRef = useRef(false);
    const previousePoints = useRef([0, 0])
    const [isClient, setIsClient] = useState(false)
    const helperComponentRef = useRef(null)
    const [fillStyle, setFillStyle] = useState('black');
    const [strokeStyle, setStrokeStyle] = useState('black');
    const [lineWidth, setLineWidth] = useState(2)
    const selectedTool = useRef(null)
    // tools rect,  line  ,  circle,text,null freehand
    const handleLineWidth = (e) => {


        setLineWidth(e.target.value)
    }

    const handlefillStyle = (e) => {


        setFillStyle(e.target.value)
    }

    const handlefillStroke = (e) => {
        setStrokeStyle(e.target.value)
    }


    const handlePointerMove = (e, ctx) => {



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
        ctx.rect(x, y, width, height)
        ctx.stroke()
        ctx.closePath()


    }
    const draw = (ctx, px, py, nx, ny) => {

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        ctx.closePath()

    }

    const handlePointerDown = (e, ctx) => {
        drawingRef.current = true;
        if (selectedTool.current == 'rect') {
            drawRect(ctx, e.x, e.y, 100, 100)
        } else if (selectedTool.current == 'circle') {

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

    const handleKeyDown = (e, ctx) => {
        const canvas = canvasRef.current;
        
        if (selectedTool.current == 'text') {

            ctx.fillText('kajsdlkj', e.x, e.y)
        }
        else if (e.key === 'R' || e.key === 'r') {
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
        else if (e.key == "k") {

            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
        else if (e.key == 'c') {
            selectedTool.current = "circle"
        }
        else if (e.key == 'a') {
            selectedTool.current = "text"
        }

        else if (e.key == 'h' || e.key == 'H') {

            helperComponentRef.current.showModal()
        }
        else if (e.key == 'e') {
            selectedTool.current = "eraser"
        }
    };

    const handleWriting = (e, ctx) => {

        console.log(e.x, e.y)

    }
    useEffect(() => {
        const canvas = canvasRef.current;

        const ctx = canvas.getContext('2d');
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        // ctx.fillStyle = fillStyle;
        if (canvas) {
            canvas.addEventListener('pointerdown', (e) => { handlePointerDown(e, ctx) });
            canvas.addEventListener('pointerup', handlePointerUp);
            canvas.addEventListener('pointermove', (e) => { handlePointerMove(e, ctx) });
            window.addEventListener('keydown', (e) => { handleKeyDown(e, ctx) });
            canvas.addEventListener('dblclick', (e) => { handleWriting(e, ctx) })

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
    }, [lineWidth, strokeStyle, fillStyle]);



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
                <div className='absolute top-5 left-5'>
                    <PanelComponent
                        fillStyle={fillStyle}
                        lineWidth={lineWidth}
                        strokeStyle={strokeStyle}
                        handleLineWidth={handleLineWidth}
                        handlefillStroke={handlefillStroke}
                        handlefillStyle={handlefillStyle}
                    />
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
