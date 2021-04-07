const apiUrl= "http://api.openweathermap.org/data/2.5/weather?zip=";
const key = "&appid=99ebbc4e31fe684de5d992e3c8bc49d2";


let feelings = document.getElementById('feelings').value;
let generate = document.getElementById('app');


const getApiData = async (url = '')=>{
  const res = await fetch(url);
  try{
    const data = res.json();
    console.log(data);
  }catch(err){
    console.log('error',err);
  }
}

generate.addEventListener('submit',()=>{
  let zip = document.getElementById('zip').value;
  getApiData(apiUrl+zip+key);
});
