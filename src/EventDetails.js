
import React, { useEffect, useState } from 'react'
import { useLocation ,useParams} from 'react-router-dom'
import { Card,Button,Modal,Accordion  } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";
import {TailSpin} from 'react-loader-spinner';
import axios from 'axios';

const EventDetails = () => {

    const [nameForGoing,setNameForGoing] = useState("");

    const [goingModalFlag,setgoingModalFlag] = useState(false);
    const  [detailsLoader,setDetailsLoader] = useState(false)
    
    const [event,setEvent] = useState({
       
            
           
            desc :"",
           
            going:[],
           
            images:[],
            
            name:"",
            
            orgName:"",

            date:"",
          
    });
   

    const location = useLocation();

    const goingToEvent = async(id,name) => {
         
        try{

            const response = await axios.post("https://react2-backend.vercel.app/getEventGoing",{
                eventId:id,
                name:nameForGoing
            });
            console.log(response , "<===== response after updating going")
            if(response.data){
                window.location.reload();
            }

        }catch(e){

            if(e){
                console.log("get event error")
            }
        }





    }

    



   
    useEffect(()=>{ 


        console.log(location.state.eventId , "<===== eventId" )
       
        
        const getEvent = async() => {

            

            try{
                
                setDetailsLoader(true)
                const response = await axios.post("https://react2-backend.vercel.app/getEvent",{
                    id:location.state.eventId
                });

                console.log(response.data[0] , "<====== event responses");
                
                setEvent((prev)=>{
                    return {...prev,name:response.data[0].name , 
                        desc:response.data[0].desc , 
                        orgName:response.data[0].orgName,
                        images:response.data[0].images,
                        going:response.data[0].going,
                        date:response.data[0].date
                    }
                })
                
                console.log(event , "<==== current event" )
                setDetailsLoader(false)
               
              
            }catch(e){
                
                if(e){
                    console.log(e)
                }

            }

        }

        getEvent();
           
    },[])
  

  return (

    <div style={{width:"100%",backgroundColor:"",display:"flex",justifyContent:"center"}} >

        <div style={{marginTop:"50px",height:"auto",padding:"50px"}} className='changeWidth' >
              
              <Button variant = "primary" href = "/" >go back</Button>

              <p></p>
              <Card> <Card.Header>  {event.name}</Card.Header>
                     <p></p>


                     {detailsLoader?<div style={{width:"100%",height:"300px",alignItems:"center",display:"flex",marginBottom:"15px",justifyContent:"center",marginTop:"10%"}} >
                           
                            <TailSpin
                        height="80"
                        width="80"
                        radius="9"
                        color="green"
                        ariaLabel="loading"
                        
                        />
                      </div>: <Card.Body>
                        {event.desc}
                        <p></p>
                        {event.date.slice(0,13).split(" ").join("/")}
                        <p></p>
                        <Accordion>
                            <Accordion.Item eventKey="0" >
                                 <Accordion.Header>People Are Going</Accordion.Header>
                                <Accordion.Body>
                                    
                                    <div style={{display:"flex",flexDirection:"column",gap:"5px"}} >
                                    {event.going.map((x)=>
                                    {
                                            return <Card style={{width:"300px",padding:"15px"}}  >
                                            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                                              <CgProfile size={40} /> <div>{x}</div>
                                            </div>
                                            </Card>
                                    })}

                                    
                                    </div>
                            
                            </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>

                        <p></p>

                        <div style={{display:"flex",gap:"15px"}} >
                          {
                            event.images.map((x)=>{
                                return  <img src = {`${x}`} style={{width:"200px",height:"200px",objectFit:"cover",borderRadius:"5px"}} />
                            })
                          }

                        </div>

                       
                       
                        </Card.Body>
                      

                     
                    }
                    
                   
                    
                    <Card.Footer>
                        <Button onClick={e=>setgoingModalFlag(true)} style={{backgroundColor:"#550082"}} >Going</Button></Card.Footer>
               

              </Card>
             
        </div>

        <Modal style={{marginTop:"20%"}} show = {goingModalFlag} >
             
             <Modal.Header>Enter Your Details</Modal.Header>
             <Modal.Body>
                   
                   <input onChange={e=>setNameForGoing(e.target.value)} style={{backgroundColor:"#dedede",border:"0px solid",width:"100%",borderRadius:"5px",padding:"15px"}} placeholder='name'/>
                 
             </Modal.Body>

             <Modal.Footer><Button variant='success' onClick={e=>{
                goingToEvent(location.state.eventId,e.target.value)
                setgoingModalFlag(false)
             }
             
             } >Submit</Button></Modal.Footer>

        </Modal>


        



    </div>
  )
}

export default EventDetails