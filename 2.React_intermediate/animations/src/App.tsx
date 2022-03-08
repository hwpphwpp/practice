import {motion} from "framer-motion";
import {useRef, useEffect, useState} from "react"; 
import images from "./images";
import "./App.css";

function App(){ 

    const [width,setWidth]=useState(0);

    const carousel=useRef<number>(0);

    useEffect(()=>{ 
        setWidth(carousel.current.scrollWidth-carousel.current.offsetWidth);
    }, []);
 
    return(
        <div className="BlogSection">


           <motion.div ref={carousel}className="BlogSlide" whileTap={{cursor:"grabbing"}}>
               <motion.div drag="x" 
               dragConstraints={{ right:0, left:-width}}
               className="SlideCard">
                   {images.map(image=>{
                       return(
                           <motion.div className="post" key={image}>
                               <img src={image} alt=""/>
                           </motion.div>
                       );
                   })}
                   </motion.div>
            </motion.div>

            
        </div>
    );

}

export default App;