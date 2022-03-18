import styled from "styled-components";
import { motion } from "framer-motion";
import mt from "./assets/mt.png";

// const Wrapper = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Box = styled(motion.div)`
//   width: 200px;
//   height: 200px;
//   background-color: rgba(255, 255, 255, 0.2);
//   border-radius: 40px;
//   display:grid;
//   grid-template-columns:repeat(2, 1fr);
//   box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
// `;

// const Circle = styled(motion.div)`
//   background-color:white;
//   height:70px;
//   width:70px;
//   border-radius:35px;
//   place-self:center;
//   box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);

//   `;

//   const boxVariants={
//     start: {
//       opacity:0,
//       scale:0.5
//     },
//     end: {
//       opacity:1,
//       scale:1,
//       transition:{
//         type:"spring",
//         duration:0.5,
//         bounce:0.5,
//         delayChildren:0.5,
//         staggerChildren:0.2, //framer motion의 기본 유틸리티로, 원마다 다른 딜레이 타임을 가지게 한다
//       },
//     },
//   }

// const circleVariants={
//   start:{
//     opacity:0,
//     y:10
//   },
//   end:{
//    opacity:1,
//    y:0,
//     },
// }
const Wrapper=styled(motion.div)`
    height:300vh;
    display:flex;
    justify-content:center; 
`
const Sky=styled(motion.div)`
    width:100vw;
    height:80vh;
    background-color:blue;
`
const Ocean=styled(motion.div)`
    width:100vw;
    height:50vh;
    background-color:yellow;
`

const OceanVariant={
    start:{
        y:0, 
    },
    end:{
        y:-30,  
        transition:{
          type:"spring",
          duration:2,
          bounce:0.2 
         },
    },
}

const Mt=styled(motion.div)<{url:string}>`
    width:40vw;
    height:30vh;
    background-image: url(${mt});
    margin-left:50vw;
    position:absolute;
    margin-top:30vh;

    background-repeat:no-repeat;
    background:url(${(props)=>props.url});
    background-size:cover;

`;

const MtVariant={
    start:{
        y:0, 
    },
    end:{
        y:-30,  
        transition:{
          type:"spring",
          duration:2,
          bounce:0.2 
         },
    },
}

const Sun=styled(motion.div)`
    width:200px;
    height:200px;
    border-radius:100px;
    background-color:orange;
    position:relative;
    
    margin-left:60vw; 
`;

const SunVariant={
    start:{
        y:-30, 
    },
    end:{
        y:90,  
        transition:{
          type:"spring",
          duration:2,
          bounce:0.2 
         },
    },
}
function App() {  
  return ( 
      <Wrapper>
        <Sky>
        <Sun variants={SunVariant} initial="start" animate="end"></Sun>
        
        <Ocean variants={OceanVariant} initial="start" animate="end">
        <Mt url={`./assets/mt.png`} variants={MtVariant} initial="start" animate="end"></Mt>
        </Ocean>
        </Sky>
        </Wrapper>
    //   {/* <Box variants={boxVariants} initial="start" animate="end">
    //     <Circle variants={circleVariants}/>
    //     <Circle variants={circleVariants}/>
    //     <Circle variants={circleVariants}/>
    //     <Circle variants={circleVariants}/>
    //   </Box> */}
 
  );
}

export default App;