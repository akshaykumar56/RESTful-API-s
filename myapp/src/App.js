import './App.css';
import {useState,useEffect} from 'react';

function App() {
  let[arr,setArr]=useState([])

  function openForm(id,name,email,contact) {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("element").style.display = "none";
    document.getElementById("idelement").value=id;
    document.getElementById("ename").value=name;
    document.getElementById("eemail").value=email;
    document.getElementById("econtact").value=contact;
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

//  1.Add Data to contact form
  let fetchData=async ()=>{
   let data=await fetch('http://localhost:4000/getData');
   let response=await data.json();
   setArr([...response])
  }

  useEffect(()=>{
    fetchData()
  })

//  2. Delete Data
  const deleteNote = async (id) => {
    console.log(id)
    const response = await fetch(`http://localhost:4000/deleteData/${id}`, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response)
  }
  
// 3. Delete Data
  //   const updateNote = async (id) => {

  //     const response = await fetch(`http://localhost:4000/updateData/${id}`, 
  //     {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body:JSON.stringify({name:"rakesh",email:'as@gmail.com',contact:'9418188455',contactfor:'web dev'})
  //     });
  // }


  
  return (
    <>
    <section style={{display:'flex',justifyContent:'center',alighItems:'center'}}>
    <form className='form' method="post" action="http://localhost:4000/addData"  style={{width:'80vw',height:'auto',margin:'20px',padding:'30px 40px'}}>
      <label style={{display:'flex',flexDirection:"column",margin:"5px 30px",fontSize:'32px',fontFamily:'Bebas Neue',color:'white'}}>
        Name
        <input type='text' id='name' name='name' style={{height:'40px',width:'549px',margin:'10px 0px',borderRadius:'10px'}}/>
      </label>


      <label style={{display:'flex',flexDirection:"column",margin:"5px 30px",fontSize:'32px',fontFamily:'Bebas Neue',color:'white'}}>
        Email
        <input type='email' id='email' name='email' style={{height:'40px',width:'549px',margin:'10px 0px',borderRadius:'10px'}}/>
      </label>


      <label style={{display:'flex',flexDirection:"column",margin:"5px 30px",fontSize:'32px',fontFamily:'Bebas Neue',color:'white'}}>
        Contact No.
        <input type='text' id='contact' name='contact' style={{height:'40px',width:'549px',margin:'10px 0px',borderRadius:'10px'}}/>
      </label>

      <label style={{display:'flex',flexDirection:"column",margin:"5px 30px",fontSize:'32px',fontFamily:'Bebas Neue',color:'white'}}>
        Contacting For

      <div style={{display:'flex',flexDirection:'row',margin:'15px 0px'}}>
    <div className="button" style={{backgroundColor:'#65c891',color:'white',borderRadius:'5px'}}>
  <input type="radio" id="a25" name="contactfor" value='App Developer' />
  <label className="btn btn-default" htmlFor="a25" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>App Dev</label>
</div>
<div className="button" style={{backgroundColor:'#2986F3',color:'white',borderRadius:'5px'}}>
  <input type="radio" id="a50" name="contactfor" value='Web Developer'/>
  <label className="btn btn-default" htmlFor="a50" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>Web Dev</label>
</div>
<div className="button" style={{backgroundColor:'#EB28A9',color:'white',borderRadius:'5px'}}>
  <input type="radio" id="a75" name="contactfor" value='Graphic Designing'/>
  <label className="btn btn-default" htmlFor="a75" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>Graphic Designing</label>
</div>
<div className="button" style={{backgroundColor:'#62d7ed',color:'white',borderRadius:'5px'}}>
  <input type="radio" id="a100" name="contactfor" value='Digital Marketing'/>
  <label className="btn btn-default" htmlFor="a100" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>Digital Marketing</label>
</div>
        </div>
      </label>
 <button type='submit' style={{width:'200px',border:'2px solid purple',borderRadius:'5px',background:'transparent',margin:"40px 30px",fontSize:'32px',fontFamily:'Bebas Neue',color:'purple'}}>Submit</button>
    </form>
    </section>

<section style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',margin:'100px'}}> 
 <h1>Contact</h1>
  <table style={{width:'70vw',boderRadius:'30%',border:'2px solid black',backgroundColor:'grey',padding:'10px 5px 10px 10px',borderRadius:'20px'}}>
    <thead>
      <th></th>
      <th></th>
      <th style={{textAlign:'left'}}>Name</th>
      <th style={{textAlign:'left'}}>Email</th>
      <th style={{textAlign:'left'}}>Contact</th>
      <th style={{textAlign:'left'}}>Contact For</th>
    </thead>
    <tbody>
  {arr.map(element=>{return <tr style={{border:'2px solid red'}} key={element._id}> 
    {/* onClick={deleteNote(element._id)} */}
    <td><span className="open-button material-symbols-outlined" onClick={()=>openForm(element._id,element.name,element.email,element.contact)}>edit</span></td>
    <td><span className="material-symbols-outlined" onClick={() => deleteNote(element._id)}>delete</span></td>
    <td>{element.name}</td>
    <td>{element.email}</td>
  <td>{element.contact}</td>
  <td>{element.contactfor}</td>
  </tr>})}
  </tbody>
  </table>
  </section>


  <div className="form-popup" id="myForm">
  
 
  <form className='form-container' method="post" action="http://localhost:4000/updateData"  style={{backgroundColor:'grey',width:'40vw',height:'auto',margin:'20px',padding:'30px 40px',border:'2px solid black',borderRadius:'15px'}}>
      
  <label id="element" style={{display:'flex',flexDirection:"column",margin:"5px 30px",fontSize:'32px',fontFamily:'Bebas Neue',color:'white'}}>
        Id
        <input type='text' id='idelement' name='id' style={{height:'40px',width:'549px',margin:'10px 0px',borderRadius:'10px'}}/>
      </label>
      
      <label style={{display:'flex',flexDirection:"column",margin:"5px 30px",fontSize:'32px',fontFamily:'Bebas Neue',color:'white'}}>
        Name
        <input type='text' id='ename' name='name' style={{height:'40px',width:'549px',margin:'10px 0px',borderRadius:'10px'}}/>
      </label>


      <label style={{display:'flex',flexDirection:"column",margin:"5px 30px",fontSize:'32px',fontFamily:'Bebas Neue',color:'white'}}>
        Email
        <input type='email' id='eemail' name='email' style={{height:'40px',width:'549px',margin:'10px 0px',borderRadius:'10px'}}/>
      </label>


      <label style={{display:'flex',flexDirection:"column",margin:"5px 30px",fontSize:'32px',fontFamily:'Bebas Neue',color:'white'}}>
        Contact No
        <input type='text' id='econtact' name='contact' style={{height:'40px',width:'549px',margin:'10px 0px',borderRadius:'10px'}}/>
      </label>
 <button type='submit' style={{width:'200px',border:'2px solid purple',borderRadius:'5px',background:'transparent',margin:"40px 30px",fontSize:'32px',fontFamily:'Bebas Neue',color:'purple'}}>Submit</button>
 <div>
 <button style={{width:'100px'}} type="button" class="btn cancel" onClick={()=>closeForm()}>Close</button>
 </div>
    </form>




</div>
</>
      );
}

export default App;



