const apiUrl= "http://api.openweathermap.org/data/2.5/weather?zip=";
const key = "&appid=99ebbc4e31fe684de5d992e3c8bc49d2";


let feelings = document.getElementById('feelings').value;
let generate = document.getElementById('app');


const getApiData = async (url = '')=>{
  const req = await fetch(url);
  try{
    const data = req.json();
    return data;
  }catch(err){
    console.log('error',err);
  }
}

const postData = async (url='',data ={})=>{
  const res = await fetch(url,{
    method: 'POST',
    credentials: 'same-origin',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)
  })
  try{
    const newData = await res.json();
    //console.log(newData);
    return newData;
  }catch(error){
    console.log('error',error);
  }
}

generate.addEventListener('submit',()=>{
  let zip = document.getElementById('zip').value;
  if(!zip) window.location.href='./error.html'
  getApiData(apiUrl+zip+key)
  .then((data)=>{
    //to turn unix time to human friendly formula
    function turnDate(date){
      let d = new Date(date*1000);
      return d.toLocaleString("en-US",{hour12: true});
    }
    let userRes = document.getElementById('feelings').value;
    const newVal = {
      tempCelsius : Math.round(data.main.temp - 273),
      date : turnDate(data.dt),
      userRes:userRes
    }
    postData('/add',newVal);
    updateUI()
    .then(data =>{
      let dateDiv = document.getElementById('date');
      let tempDiv = document.getElementById('temp');
      let contentDiv = document.getElementById('content');
      console.log(data);
      dateDiv.innerHTML += `<div>${data[data.length-1].date}</div>`;
      tempDiv.innerHTML += `<div>${data[data.length-1].temp}</div>`;
      contentDiv.innerHTML += `<div>${data[data.length-1].userRes}</div>`;
      
    })
  })
})

const updateUI = async () =>{
  const res = await fetch('/entry');
  try{
    const allData = res.json();
    return allData;
  }
  catch(error){
    console.log('error',error);
  }
}
