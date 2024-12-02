import React, { useEffect, useState } from 'react'
import { Row ,Col , Button, Card , Modal } from 'react-bootstrap'
import {motion} from 'framer-motion'
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { object, use } from 'framer-motion/client';
import { useLocation } from 'react-router-dom';

const key = "e34b686ea01e7391d28fa5bb390e65bb"

const Admin = () => {

  const [flag,setFlag] = useState("events");
  const [startDate,setStartDate] = useState(new Date());
  const [adminName,setAdminName] = useState("");
  const [image,setImage] = useState();

  const [imageModal,setImageModal] = useState(false);

  const [currImage,setCurrImage] = useState("");

  const [imgUrlList,setImgUrlList] = useState([]);

  const location = useLocation();
  console.log(location.state, "< ============ admin id")


 

  const [event,setEvent] = useState({
    name:"",
    orgName:"",
    images:[],
    desc:"",
    going:[],
    date:startDate+"",
  });
  const [events,setEvents] = useState([]); 

  const imgUpload = async() => {
     
     const form = new FormData();

     form.append('key',"e34b686ea01e7391d28fa5bb390e65bb");
     form.append('image',image)
     try{
        
      const response = await axios.post("https://api.imgbb.com/1/upload",form)
      console.log(response , " <====== img response")
      setCurrImage(response.data.data.url)
      setImgUrlList((prev)=>{
         return [...prev,response.data.data.url]
      })
      setEvent((prev)=>{
         return {...prev,images:[...prev.images,response.data.data.url]}
      })

     }catch(e){
       
      console.log(e);

     }




  }


  const deleteEvent = async(eventId) => {

   console.log(eventId, " <=== eventId")

   



     try{
      
      const response = await axios.post("https://react2-backend.vercel.app/deleteEvent",{
         eventId:eventId,
         
      })
      
      window.location.reload();

     }catch(e){
       
      if(e){
         console.log(e);
      }

     }









  }

  const saveEvent = async() => {

   imgUpload();

   console.log(event)

   try{
      const response = await axios.post("https://react2-backend.vercel.app/createEvent",{...event,orgName:location.state.id});
      
      if(response.status === 200){
         window.location.reload();
      }
      
   }catch(e){
      if(e){
         console.log("saving event error")
      }else{
         window.location.reload();
      }
   }
     
   }


  
  let elements ;

  switch(flag){

     case "events" :
       
           elements = <div className='push_down'>
              
              <input onChange={e=>setEvent((prev)=>{
               return {...prev,name:e.target.value}
              })} style={{backgroundColor:"#dedede",width:"100%",border:"0px solid",padding:"15px",borderRadius:"5px"}} placeholder='name of the event' />
              
           

              <p></p>
              <input onChange={e=>setEvent((prev)=>{
               return {...prev,desc:e.target.value}
              })} style={{backgroundColor:"#dedede",border:"0px solid",height:"90px",width:"100%",padding:"15px",borderRadius:"5px"}} placeholder='description of the event' />
              <p></p>
              <Button onClick={e=>setImageModal(true)} variant = "success" >Image</Button>
              <p></p>
              {
               event.images.map((x)=>{
                  return  <img src = {`${x}`} style={{width:"100px",height:"100px",objectFit:"cover"}} />
               })
              }
               <p></p>
               <DatePicker  selected={startDate} onChange={(date) => setStartDate(date)} />
               <p></p>
               <Button style={{padding:"15px",width:"50%",backgroundColor:"#550082"}} onClick = {saveEvent} >Save</Button>
               
               <hr></hr>

                {
                  events.map((x)=>{
                     if(x.orgName === location.state.id){
                       return<Card style={{marginBottom:"15px"}} >
                         
                         <Card.Body>
                           
                           <div style={{display:"flex",gap:"15px"}} >
                         
                         <div style={{width:"100%"}}>
                         <div style={{backgroundColor:"#dedede",padding:"15px"}} >Event Name - <span style={{fontWeight:"bold"}} >{x.name}</span></div>
                          <p></p>
                          <div>Organizer Id- <span style={{fontWeight:"bold"}} >{x.orgName}</span></div>
                          <p></p>
                          <div>Description- <span style={{fontWeight:"bold"}} >{x.desc}</span></div>
                          <p></p>
                          <div>Date- <span style={{fontWeight:"bold"}} >{x.date.slice(0,13).split(" ").join("/")}</span></div>
                         </div>
                          </div>
                          <p></p>
                          <div style={{display:"flex",gap:"15px"}} >
                             {
                              x.images.map((x)=>{
                                 return   <img src={`${x}`} style={{width:"100px",height:"100px",objectFit:"cover",borderRadius:"5px"}} />
                              })
                             }

                          </div>
                         </Card.Body>
                       
                       <Card.Footer>
                       <Button onClick={e=>{
                           return deleteEvent(x._id)
                          }} variant='danger' >Delete</Button>
                       </Card.Footer>
                         
                        
                       </Card>
                    
                       
                       
                      
                     }
                  })
                }
               
              
            

           </div>

        break;

     case "organizers" :
       
        elements = <div  >
           
           <h1>organizers</h1>

             
        </div>

     break;

  }


  useEffect(()=>{ 

    console.log(window.location.state, " <========== admin id")
      
    const getEvents = async() => {
        
      try{
         const response = await axios.get("http://localhost:5000/getEvents");

         console.log(response.data," <====== response of /getEvents")
         
         setEvents(response.data)
         
         console.log(events , "<===events data")
      
      }catch(e){
         if(e){
            console.log("get event error")
         }
      }

    }

    const getOrgName = async() => {

      console.log(location.state.id, "<====== admin id currently")
       
      try{
          
         const response = await axios.post("http://localhost:5000/getOrgName",{
            id:location.state.id
         })
        
        if(response.data.length>0){
          
         setTimeout(function(){},5000)
         
         setAdminName(response.data[0].name);
         console.log(adminName , " <===== admin name")

        }
        

      }catch(e){
         
         if(e){
           
            console.log("get org name error");

         }


      }




    }
    getEvents();
    getOrgName();
    
    

    console.log(adminName," <===== name of the admin")
   

  },[])

  
  


  return (
    <div style={{width:"100%",display:"flex",justifyContent:"center"}} >
          <p></p>
          <hr></hr>
          <p></p>
          <div className='changeWidth' style={{height:"300px",marginTop:"5%"}} >
                
                <Row style={{width:"100%"}} >

                   <Col lg = {4}  className='pushDown' >
                     <div style={{width:"100%",backgroundColor:"",display:"flex",flexDirection:"column",gap:"15px",paddingLeft:"15px"}} >
                          
                          
                          <motion.div
                          whileHover={{scale:"1.1"}}
                          onClick={e=>setFlag("events")}
                          style={{width:"80%"}}
                          >
                             
                          <div style={{width:"100%",backgroundColor:"#550082",display:"grid",placeItems:"center",padding:"15px",borderRadius:"15px"}} >
                           <h4 style={{color:"white"}} >Events</h4>
                          </div>
                          </motion.div>


                          <motion.div
                          whileHover={{scale:"1.1"}}
                          onClick={e=>setFlag("organizers")}
                          style={{width:"80%"}}
                          >
                          <div style={{width:"100%",backgroundColor:"#550082",display:"grid",placeItems:"center",padding:"15px",borderRadius:"15px"}} >
                           <h4 style={{color:"white"}} >Organizers</h4>
                          </div>
                          </motion.div>

                          <motion.div
                          whileHover={{scale:"1.1"}}
                          onClick={e=>setFlag("organizers")}
                          style={{width:"80%"}}
                          >
                           <Button href='/' variant='link' style={{fontWeight:"bold"}} >Go back</Button>
                          </motion.div>
                          

                     </div>
                   
                   </Col>

                   <Col lg = {8} >

                   <div className = "pushDown" style={{width:"100%",padding:"35px",boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",marginLeft:"10px",overflow:"",borderRadius:"15px",height:""}} >
                          
                          {elements}

                     </div>
                     <p></p>
                     
                  
                   
                   
                   </Col>



                </Row>

          </div> 
          <Modal style={{padding:"15px",marginTop:"10%"}} show = {imageModal} >
            
             <Modal.Body>
                 
              <div style={{display:"flex"}}>  <input  type='file' onChange = {e=>setImage(e.target.files[0])} /> 
              <p></p>
              <Button 
              onClick={e=>{ 
               imgUpload();
               }} type='file' variant = "success" >Upload</Button>  
              </div>
              
                <div style={{display:"flex",gap:"15px"}} >
                {
                  event.images.map((x)=>{
                     return <img src={`${x}`} style={{width:"100px",height:"100px",objectFit:"cover",borderRadius:"5px"}} />
                  })
               }

                </div>
              <p></p>
             <Button onClick={e=>{
                setImageModal(false)
             }}  >Done</Button>
             </Modal.Body>
            
          </Modal>

    </div>
  )
}

export default Admin