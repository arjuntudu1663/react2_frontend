import React from 'react';
import Header from './Header';
import {Row,Col, Button,Card,Form,Modal} from 'react-bootstrap'
import {motion} from 'framer-motion'
import { CiBookmark, CiPlay1 ,CiUser   } from "react-icons/ci";
import { useState ,useEffect } from 'react';
import {Audio,BallTriangle,Bars,Puff,Rings, ThreeDots,Grid,TailSpin} from 'react-loader-spinner'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GrDisabledOutline } from 'react-icons/gr';

function Home() {
  
  const [flag,setFlag] = useState("events");

  const navigation = useNavigate();
  const [list,setList] = useState([]);

  const [eventList,setEventList] = useState([]);
  const [organizerList,setOrganizerList] = useState([]);
  const [savedEvents,setSavedEvents] = useState([]);

  const [loader,setLoader] = useState(false);
  const [detailLoader,setDetailLoader] = useState(false);
  const [organizerLoader,setOrganizerLoader] = useState(false);



  const [detailsModal,setDetailsModal] = useState(false);
  const [currentEventId,setCurrentEventId] = useState("");
  const [detailModal,setDetailModal] = useState({
    id:"",
    name:"",
    desc:"",
    images:[],
    orgName:"",
    going:[],
  });

  let elements ; 

  const moveToDetails = (id) => {
     console.log(id, "<==== eventId before details")
     navigation("/eventDetails",{state:{eventId:id}})
  }

  const openModal = async(id) => {
   
    console.log(id);
    setDetailsModal(true)

    try{
      
      setDetailLoader(true)
       const response = await axios.post("https://react2-backend.vercel.app/getEvent",{
         id:id
       })
       
       console.log(response , "<==== repsonse modal");
       setDetailModal((prev)=>{
        return {...prev,name:response.data[0].name,id:response.data[0]._id ,desc:response.data[0].desc, 
          orgName:response.data[0].orgName , going:response.data[0].going
        }
       })
       setDetailLoader(false)

    }catch(e){
       
      if(e){
        console.log(e);
      }
        
    }

    
    


  }

  const getOranizers = async() => {

     try{
       
      setOrganizerLoader(true)

      const response = await axios.get("https://react2-backend.vercel.app/getOrganizers");

      console.log(response.data , "<=====response of organizers")

      setOrganizerList(response.data);

      setOrganizerLoader(false)

     

     }catch(e){
      
      if(e){
        
        console.log("get organizers error")

      }


     }




  }

  const getEvents = async() => {
         
    try{
        
        setLoader(true)
        const response = await axios.get("https://react2-backend.vercel.app/getEvents");
        setEventList(response.data);
        console.log(response.data , " <==== getEvnets response")
        setLoader(false)
        

    }catch(e){
        
      if(e){
        console.log("get events error")
      }

    }

  }

  const moveToAbout = function(){
     
      navigation("/aboutUs");

  }


  switch(flag){
        
    case "events" :

    elements = 
       
         <div>
            {
               loader ?  <div style={{width:"100%",height:"auto",display:"flex",justifyContent:"center",marginTop:"30%"}} >
                <TailSpin
               height="80"
               width="80"
               radius="9"
               color="green"
               ariaLabel="loading"
               
             />
               </div> : <>{
                eventList.map((x)=>{
                  return <Card style={{marginBottom:"15px",padding:"15px"}} >
                    
                    <Card.Body>
                   
                       Event Name - <span style={{fontWeight:"bold"}}></span>{x.name}
                      <p></p>
                      <p> Date- {x.date.slice(0,13).split(" ").join("/") }</p>
                      <p></p>
                      <Button onClick={e=>openModal(x._id)} variant = 'success' style={{backgroundColor:"#550082",width:"30%"}} > Details </Button>
                      </Card.Body>
                  </Card>
                })
               }</> 
            }
       
       </div>
    
    

    break;

    case "organizers" :

    elements =<div> 


      {organizerLoader ?  <div style={{width:"100%",height:"500px",display:"flex",justifyContent:"center",marginTop:"10%"}} >
                <TailSpin
               height="80"
               width="80"
               radius="9"
               color="green"
               ariaLabel="loading"
               
             />
               </div> : <> {organizerList.map((x)=>{return <Card style={{padding:"15px",marginBottom:"15px"}} >

                    <Card.Body>  <div> Organizer Name - <span style={{fontWeight:"bold"}} >{x.name}</span></div>
                      <p></p>
                      {x.desc}
                      <p></p> 
                      All Events
                      <p></p>
                      <div style={{display:"flex"}} >

                      {
                          [...x.events].map((x)=>{
                            return <motion.div

                            whileHover={{scale:"1.2"}}
                            
                            style={{width:"180px",padding:"15px",borderRadius:"5px",backgroundColor:"#dedede",marginRight:"15px"}} >
                              
                              <span style={{fontWeight:"bold"}} >{x.name}</span>
                              <p></p>
                              {x.date.slice(0,13).split(" ").join("/")}
                            </motion.div>

                      })
                  }


  </div>
   </Card.Body>


</Card>

})}</> }
        
        </div>

    break;


    case "saved events" :

    elements =  <></>
    break;
  }

  useEffect(()=>{
    
    getEvents();
    getOranizers();

  },[])


  return (
    <div>

       <Header/>
      
       <div  style={{width:"100%",display:"flex",justifyContent:"center"}} >
            <div className='changeWidth' style={{paddingLeft:"55px",paddingRight:"55px"}} >
                
                 <motion.div 
                 
                 initial = {{y:-50}}
                 animate = {{y:0}}

                 >
                 <img src = {require("./pic.jpg")} style={{width:"100%",height:"300px",objectFit:"cover",marginTop:"55px",borderRadius:"15px",marginBottom:"55px"}} />
                 </motion.div>
                  
                 

                 <p></p>

                 <Row style={{gap:"0px",marginBottom:"15px"}}>

                    <Col lg = {4} sm = {4} xs = {4} >


                      <motion.div className='pushDown'
                      onClick={e=>setFlag("events")}
                       whileHover={{scale:1.2}}
                      style={{display:"flex",justifyContent:"center",borderRadius:"15px",alignItems:"center",height:"80px",backgroundColor:"#550082"}}>
                        <div style={{display:"flex",alignItems:"center",gap:"15px"}} >
                      <CiPlay1 color='white' size={40} />
                      <p className='hideONmobile' style={{color:"white",marginTop:"15px"}}>Events</p>
                      </div>
                      </motion.div>
                    


                      </Col>

                     



                    <Col lg = {4} sm = {4} xs ={4} >
                       


                    <motion.div 
                    className='pushDown'
                    onClick={e=>setFlag("organizers")}
                    whileHover={{scale:1.2}}
                    style={{display:"flex",borderRadius:"15px",justifyContent:"center",alignItems:"center",height:"80px",backgroundColor:"#550082"}}>
                       <div style={{display:"flex",alignItems:"center",gap:"15px"}} >
                      <CiUser color='white' size={40} />
                      <p className='hideONmobile' style={{color:"white",marginTop:"15px"}}> Event Organizers</p>
                      </div>         
                      </motion.div>
                    


                    </Col>
                     



                 </Row>
                 <p></p>

                 <div style={{width:"100%",height:"500px",overflowY:"scroll",marginTop:"35px",marginBottom:"50px",backgroundColor:""}} >

                    {
                      elements
                    }

                 </div>
                 
                 <Row  >
                     
                     <Col  lg = {6} sm = {12} style={{backgroundColor:""}} >
                         
                        <motion.div 
                        
                        initial = {{x:-100}}
                        animate = {{x:0}}
                        
                        className='pushDown' style={{height:"300px",display:"flex",flexDirection:"column",backgroundColor:"#dedede",justifyContent:"space-between",padding:"25px",borderRadius:"15px"}} >
                            
                             <div>
                             <h4>Know About Us Even More</h4>
                             </div>


                            <Button onClick={moveToAbout} variant='success' style={{width:"100%",borderRadius:"15px",height:"20%",backgroundColor:"#550082"}} >Click</Button>
                        </motion.div>
                      
                     </Col>

                     <Col  lg = {6} sm = {12} >

                       <motion.div style={{height:"100%"}} initial = {{scale:0.1}} animate = {{scale:1}} >
                           
                       <img src = {require("./pic2.jpg")} style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"15px"}} />

                       </motion.div>
                        
                     
                    
                     </Col>

                 </Row>

                 <hr></hr>

                
                 <p></p>
                 
                 <div style={{border:"1px solid",padding:"25px",borderRadius:"15px",marginBottom:"85px"}} >
                 <h1>Contact Us</h1>
                  <div>

                  <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                   
                    <Form.Control style={{backgroundColor:"#dedede"}} type="email" placeholder="Name" />
                    
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    
                    <Form.Control style={{backgroundColor:"#dedede",height:"80px"}} type="password" placeholder="Your Massege" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  <Button variant="success" style={{height:"",padding:"15px"}} type="submit">
                    Submit
                  </Button>
                </Form>

                  </div>
                 </div>


            </div>
       </div>
      

     
     <div style={{position:"absolute",height:"100px",width:"100%",backgroundColor:"#550082",display:"flex",alignItems:"center",justifyContent:"center"}} >
          
          <h1 style={{color:"white"}} >@Raaste</h1>

     </div>
      
      <Modal show={detailsModal} style={{marginTop:"10%"}} >
          
          <Modal.Header><h1> Details </h1> </Modal.Header>
         <Modal.Body>
          
          <div style={{width:"100%",backgroundColor:"",padding:"15px"}} > 
             

             {detailLoader? <div style={{width:"100%",height:"auto",display:"flex",justifyContent:"center",marginTop:"5%"}} >
                <TailSpin
               height="80"
               width="80"
               radius="9"
               color="green"
               ariaLabel="loading"
               
             />
               </div>: <>

                  <p style={{fontWeight:"bold"}}>{detailModal.name}</p>
                  <p></p>
                  <p style={{fontWeight:"bold"}} >{detailModal.desc}</p>

                  </>
               
               
               }
            
             
          </div>
         </Modal.Body>
         <Modal.Footer>
         <Button onClick={e=>moveToDetails(detailModal.id)} variant = "primary"> Show More </Button>
        <Button onClick={e=>setDetailsModal(false)} > Close</Button></Modal.Footer>
      </Modal>

    </div>
  );
}

export default Home;
