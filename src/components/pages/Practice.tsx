import { Button } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useRef, useState } from "react"
import { RiContactsBookLine } from "react-icons/ri";
import { useKey, usePrevious } from "react-use";
import styled from "styled-components"
import invImg from "../../invader.png"


//キャンバススタイル
const SCanvas = styled.canvas`
    width: 70%;
    background-color: white 
`;

// export const Practice = () => {
// const canvasRef = useRef<HTMLCanvasElement>(new HTMLCanvasElement);
// const c2Ref = useRef(canvasRef.current.getContext('2d'))
// const imgRef = useRef(new Image)

// useEffect(() => {
//     const canvas: any = canvasRef.current;
//     var c2 = canvas.getContext('2d');
//     c2Ref.current = c2;


//     // Image オブジェクトを生成
//     var img = new Image();
//     img.src = '../../../public/images/invader.png';
//     imgRef.current = img;

//     // // Image オブジェクトを生成
//     // var img = new Image();
//     // img.src = '../../../public/images/invader.png';

//     // // 画像読み込み終了してから描画
//     // img.onload = function () {
//     //     c2.drawImage(img, 10, 10, 50, 50);
//     //     alert(img.src)
//     // }
// }, [])

// const on = () => {
//     // 画像読み込み終了してから描画
//     imgRef.current.onload = function () {
//         c2Ref.current!.drawImage(imgRef.current, 10, 10, 50, 50);
//         alert(imgRef.current.src)
//     }
// }

// return (
//     <>
//         <SCanvas className="canvas" ref={canvasRef} />
//         <p>aa</p>
//         <Button onClick={on}>ボタン</Button>
//     </>
// )


export const Practice = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const image = new Image();
        image.src = invImg;

        image.addEventListener('load', function () {
            // 背景画像
            canvas.width = 3000;
            canvas.height = 3000;
            const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
            ctx.drawImage(image, 10, 10);


        });
    });

    return (

        <div >

            <canvas
                ref={canvasRef}
                id='background'
                width={4000}
                height={4000}
            />
        </div>
    );
}






// export const Practice = () => {
//     const [count, setCount] = useState(0);
//     const countRef = useRef(0);
//     countRef.current = count;
//     useEffect(() => {
//         console.log("useffect")
//         setCount((count) => count + 1)
//         console.log("useEffect pure :" + count)
//         console.log("useEffect ref :" + countRef.current)
//     }, [])
//     useEffect(() => {
//         console.log("useffect2")
//         setCount((count) => count + 1)
//         console.log("useEffect pure2 :" + count)
//         console.log("useEffect ref2 :" + countRef.current)
//     }, [])

//     console.log("practice")
//     console.log("practice pure :" + count)
//     console.log("practice ref :" + countRef.current)



//     return (
//         <>
//             <p>{countRef.current}</p>
//             {console.log("element")}
//             {console.log("element pure :" + count)}
//             {console.log("element ref :" + countRef.current)}

//         </>
//     )
// }


// type test = {
//     id: number;
//     age: number;
// }

// export const Practice = () => {
//     const [count, setCount] = useState<number>(0);
//     const [count2, setCount2] = useState<number>(0);
//     const [test, setTest] = useState<test>({ id: 1, age: 1 });
//     const testRef = useRef(0)
//     let te = 1


//     console.log("000A")
//     useEffect(() => {
//         setCount(count + 1);
//         console.log("111")
//     }, [count2])

//     const clickButton = useCallback(() => {
//         // test.id += 1;
//         // console.log(test.id)
//         setCount2((count2) => count2 + 1);
//         te += 1
//         console.log("te :" + te)
//         console.log("222")
//     }, [])
//     console.log("000B")

//     return (
//         <>
//             <p>aa</p>
//             <Button onClick={clickButton}>ボタン</Button>
//             {console.log("1 :" + count)}
//             {console.log("2 :" + count2)}

//         </>
//     )
// }
