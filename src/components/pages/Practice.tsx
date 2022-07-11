import { Button } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useRef, useState } from "react"
import { useKey, usePrevious } from "react-use";

export const Practice = memo(() => {

    const [count, setCount] = useState(0);
    const [eventCnt, setEventCnt] = useState(0);
    const countRef = useRef<number>(0);
    // const [keypressEvent, setKeypressEvent] = useState<((e: KeyboardEvent) => void)>((e: KeyboardEvent) => "")
    countRef.current = count;



    // var aaa = 0;
    // useEffect(() => {
    //     aaa = 1
    // })
    const onCnt = useCallback(() => {
        setCount((cnt) => cnt + 1);
        console.log(count)
    }, [])

    const onEventCnt = useCallback(() => {
        // setCount((cnt) => cnt + 1);
        console.log(countRef.current)
        setEventCnt(countRef.current);
    }, [count])

    useKey('ArrowLeft', onCnt);
    useKey('ArrowRight', onEventCnt);
    // const keypress_ivent = (e: KeyboardEvent) => {
    //     if (e.key === 'Enter') {
    //         console.log(count)
    //         onCnt();
    //     }
    //     else if (e.key === ' ') {
    //         console.log("count")
    //         onEventCnt();
    //     }
    // }

    // useEffect(() => {
    //     // setKeypressEvent(keypress_ivent);
    // }, [count])
    // const prevKeypressEvent = usePrevious(keypress_ivent);

    // document.removeEventListener('keypress', keypress_ivent);
    // document.addEventListener('keypress', keypress_ivent);
    // useEffect(() => {
    //     document.removeEventListener('keypress', keypress_ivent);
    // }, [count])

    return (
        <>
            <p>{count}</p>
            <p>{eventCnt}</p>
            {/* {console.log(aaa)} */}

        </>

    )
})

// export const Practice = memo(() => {

//     const [count, setCount] = useState(0);
//     const [eventCnt, setEventCnt] = useState(0);
//     const countRef = useRef(null);
//     // const [keypressEvent, setKeypressEvent] = useState<((e: KeyboardEvent) => void)>((e: KeyboardEvent) => "")




//     // var aaa = 0;
//     // useEffect(() => {
//     //     aaa = 1
//     // })
//     const onCnt = useCallback(() => {
//         setCount((cnt) => cnt + 1);
//         console.log(count)
//     }, [])

//     const onEventCnt = useCallback(() => {
//         // setCount((cnt) => cnt + 1);
//         console.log(count)
//         setEventCnt(count);
//     }, [count])

//     // useKey('ArrowLeft', onCnt);
//     // useKey('ArrowRight', onEventCnt);
//     const keypress_ivent = (e: KeyboardEvent) => {
//         if (e.key === 'Enter') {
//             console.log(count)
//             onCnt();
//         }
//         else if (e.key === ' ') {
//             console.log("count")
//             onEventCnt();
//         }
//     }

//     useEffect(() => {
//         // setKeypressEvent(keypress_ivent);
//     }, [count])
//     // const prevKeypressEvent = usePrevious(keypress_ivent);

//     document.removeEventListener('keypress', keypress_ivent);
//     document.addEventListener('keypress', keypress_ivent);
//     // useEffect(() => {
//     //     document.removeEventListener('keypress', keypress_ivent);
//     // }, [count])

//     return (
//         <>
//             <p>{count}</p>
//             <p>{eventCnt}</p>
//             {/* {console.log(aaa)} */}

//         </>

//     )
// })


// export const Practice = memo(() => {

//     const [count, setCount] = useState(0);
//     const [eventCnt, setEventCnt] = useState(0);



//     // var aaa = 0;
//     // useEffect(() => {
//     //     aaa = 1
//     // })
//     const onCnt = useCallback(() => {
//         setCount((cnt) => cnt + 1);
//     }, [])

//     const onEventCnt = useCallback(() => {
//         setEventCnt(count);
//     }, [count])


//     return (
//         <>
//             <Button onClick={onCnt}>button1</Button>
//             <p>{count}</p>
//             <Button onClick={onEventCnt}>button1</Button>
//             <p>{eventCnt}</p>
//             {/* {console.log(aaa)} */}

//         </>

//     )
// })