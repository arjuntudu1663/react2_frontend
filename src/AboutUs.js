import React from 'react'
import {Card ,Button} from 'react-bootstrap'

const AboutUs = () => {
  return (


    <div style={{backgroundColor:"",width:"100%",display:"flex",justifyContent:"center"}}>

         <div style={{ marginTop:"10%" }} className='changeWidth' >
                  
                  <Button href="/"> Go back </Button>
                  <p></p>
                  <Card style = {{width:"100%"}}>
                     
                     <Card.Body>  We are here to provide you the best possible experience with our service </Card.Body>
                     
                     <p></p>

                     <Card.Footer> <Button variant = "success" > Go To The List  </Button> </Card.Footer>
                  </Card>
         
         </div>


    </div>

  )
}

export default AboutUs