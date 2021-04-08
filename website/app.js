const apiUrl= "http://api.openweathermap.org/data/2.5/weather?zip=";
const key = "&appid=99ebbc4e31fe684de5d992e3c8bc49d2";


let feelings = document.getElementById('feelings').value;
let generate = document.getElementById('app');


const getApiData = async (url = '')=>{
  const req = await fetch(url);
  try{
    const data = req.json();
    return data;
    //console.log(data);
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
    console.log(newData);
    return newData;
  }catch(error){
    console.log('error',error);
  }
}

generate.addEventListener('submit',()=>{
  let zip = document.getElementById('zip').value;
  getApiData(apiUrl+zip+key)
  .then((data)=>{
    //console.log(data)
    //to turn unix time to human friendly formula
    function turnDate(date){
      let d = new Date(date*1000);
      return d.toLocaleString("en-US",{timeZoneName: "short"});
    }
    let userRes = document.getElementById('feelings').value;
    const newVal = {
      tempCelsius : Math.round(data.main.temp - 273),
      date : turnDate(data.dt),
      userRes:userRes
    }
    postData('/add',newVal)
  })
})
