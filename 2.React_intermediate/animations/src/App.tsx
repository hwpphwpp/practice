import {motion} from "framer-motion";
import {useRef, useEffect, useState} from "react"; 
import images from "./images";
import "./App.css";

function App(){ 

    const [width,setWidth]=useState(0);

    const carouself=useRef<HTMLDivElement>(null);

    console.log(carouself);
    useEffect(()=>{ 
        setWidth(carouself.current.scrollWidth-carouself.current.offsetWidth);
    }, []);
 
    return( 
           <motion.div ref={carouself}className="carousel" whileTap={{cursor:"grabbing"}}>
               <motion.div 
               drag="x" 
               dragConstraints={{ right:0, left:-width}}
               className="inner-carousel">
                   {images.map(image=>{
                       return(
                           <motion.div className="item" key={image}>
                               <img src={image} alt=""/>
                           </motion.div>
                       );
                   })}
                   </motion.div>
            </motion.div> 
    );

}

export default App;