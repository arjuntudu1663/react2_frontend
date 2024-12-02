import React, { useEffect, useState } from 'react'
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { Button, Modal , Nav } from 'react-bootstrap';
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { VscError } from "react-icons/vsc";
import {motion} from 'framer-motion'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const [modalFlag,setModalFlag] = useState(false);
  const [msg,setMsg] = useState("");
  const [successFlag,setSuccessFlag] = useState(false)
  const [loginSuccess,setLoginSuccess] = useState(false);
  const [loginError,setLoginError] = useState(false)

  const navigation = useNavigate();

  const [organizer,setOrganizer]= useState({

    name:"",
    password:"",
    re_password:""

  }); 

  const [orgLogin,setOrgLogin] = useState({
     
     name :"",
     password:""

  })



  const [flag,setFlag] = useState("login");

  const registerOrganizer = async() => { 
      
    console.log(organizer)

    try{
       
      const response = await axios.post("https://react2-backend.vercel.app/organizerRegister",organizer);

      console.log(response , " <========= org register successfully");

      if(response.status == 200){

         setSuccessFlag(true);
         setOrganizer((prev)=>{
          return {...prev,name:"",password:"",re_password:""}
         })
         setLoginError(false)
         
      }
    }catch(e){

      if(e){
        console.log(e);
      }

    }

  }


 const organizerLogin = async() => {

     try{
         
      const response = await axios.post("https://react2-backend.vercel.app/organizerLogin",orgLogin);

      if(response.data.length>0){ 


        navigation("/admin",{state:{id:response.data[0]._id}})
        setLoginSuccess(true)

        setOrgLogin((prev)=>{
           
          return {...prev,name:"",password:""}

        })

       



      }else{

        setLoginSuccess(false)
        setLoginError(true)

      }

     }catch(e){
        
      if(e){
         console.log(e);
      }

     }




 }

  

  
  let element ; 
  
  switch(flag){

     case "login":
       
        element = <div>  <input value = {orgLogin.name}  onChange={e=>setOrgLogin((prev)=>{
                      
          return {...prev,name:e.target.value}

              })}  style={{width:"100%",backgroundColor:"#dedede",padding:"15px",border:"0px solid",borderRadius:"5px"}} placeholder='username'  />
                
                <p></p>

                <input type='password' value = {orgLogin.password} onChange={e=>setOrgLogin((prev)=>{
                  
                  return {...prev,password:e.target.value}

              })}  style={{width:"100%",backgroundColor:"#dedede",padding:"15px",border:"0px solid",borderRadius:"5px"}} placeholder='password'  />
              

            <p></p>  
             
            <div style={{display:"flex",flexDirection:"row"}}>
              
            {
              loginSuccess ? <><IoCheckmarkDoneCircleOutline size={50} /><p style={{marginTop:"15px",fontWeight:"bold"}} >successfully login</p></>: <>   <Button onClick = {organizerLogin} variant='success' style={{backgroundColor:"#550082"}}>Login</Button></>
            }
            <p></p>
            
            
            
          

            </div>


            

            
           


            </div>   

      break;

      case "register":
         
          element = <div>  <input value={organizer.name} onChange={e=>setOrganizer((prev)=>{
                      
                      return {...prev,name:e.target.value}
            
                  })}  style={{width:"100%",backgroundColor:"#dedede",padding:"15px",border:"0px solid",borderRadius:"5px"}} placeholder='username'  />
                    
                    <p></p>
            
                    <input value={organizer.password} type='password' onChange={e=>setOrganizer((prev)=>{
                      
                      return {...prev,password:e.target.value}
            
                  })}  style={{width:"100%",backgroundColor:"#dedede",padding:"15px",border:"0px solid",borderRadius:"5px"}} placeholder='password'  />
                    
                    <p></p>

                     <input value={organizer.re_password} type='password' onChange={e=>setOrganizer((prev)=>{
                      
                      return {...prev,re_password:e.target.value}
            
                  })}  style={{width:"100%",backgroundColor:"#dedede",padding:"15px",border:"0px solid",borderRadius:"5px"}} placeholder='re-enter password'  />
                  
            
                  <p></p>  

                  <div style={{display:"flex"}}>

                  <motion.div style={{display:"flex",flexDirection:"row"}}>

                  {
                    successFlag? <> <IoCheckmarkDoneCircleOutline size={40} /> <h4 style={{marginTop:"10px"}} >Done</h4> </> :  <Button onClick={registerOrganizer} variant='success' style={{backgroundColor:"#550082"}}>register</Button>
                  }

                  </motion.div>

                  </div>

               </div>     
  }


  useEffect(()=>{
    
    
    

  },[])


  return (
    <div style={{width:"100%",height:"auto",backgroundColor:"#550082",display:"flex",justifyContent:"center",padding:"35px 25px 35px 25px"}} >
         
         <div className='changeWidth' style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
              <h1 className='headerFont' style={{fontWeight:"bolder",color:"white",marginLeft:"25px"}} >Raastein</h1>
               
               <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"15px"}} >
               <p  style={{color:"white",marginLeft:"25px",marginTop:"15px"}} >Enter as Organizer</p>
                 
                 <motion.div 
                 whileHover={{scale:"1.5"}}
                 onClick={e=>setModalFlag(true)}
                 >
                 <IoArrowForwardCircleOutline size= {40} color='white'/>

                 </motion.div>

               </div>
         </div>



         <Modal style={{marginTop:"18%"}} show = {modalFlag} >
                <Modal.Header>  
                
                <h5>Enter as Organizer</h5>
               
               <div style={{display:"flex",flexDirection:"row",gap:"15px"}} >

                 <Button onClick={e=>{
                   setFlag("login")
                   setSuccessFlag(false);
                   setLoginSuccess(false)
                 }} >Login</Button>

                 <Button onClick={e=>{
                  setFlag("register")
                  setSuccessFlag(false);
                  setLoginSuccess(false)
                 }} >Register</Button>
                 
               </div> 
               </Modal.Header>
             <Modal.Body> 

              {element}
               
             </Modal.Body>

               <Modal.Footer>
                <Button variant='danger' style={{width:"100%"}} onClick={e=>{
                    setSuccessFlag(false);
                    setModalFlag(false)
                    setLoginSuccess(false)
                    setLoginError(false)
                }} > Close </Button>
              </Modal.Footer>

         </Modal>
    </div>
  )
}

export default Header