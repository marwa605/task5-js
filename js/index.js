let todayData =document.getElementById("today-data")
let todayLocation =document.getElementById("today-location")
let todayTemp =document.getElementById("today-temp")
let todayImg =document.getElementById("today-img")
let todayText =document.getElementById("today-text")
let humidity =document.getElementById("humidity")
let wind =document.getElementById("wind")
let windDirc =document.getElementById("wind-dirc")
let weatherData 



let nextDayData=document.getElementsByClassName("next-day-data")
let nextDayImg=document.getElementsByClassName("next-day-img")
let nextDayTemp=document.getElementsByClassName("next-day-temp")
let nextDayMinTemp=document.getElementsByClassName("next-day-min-temp")
let nextDayText=document.getElementsByClassName("next-day-text")


let search=document.getElementById("search")


async function getApi(city)
{
    let response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a0b3baf2d8c4400eaea211107242906&q=${city}&days=3&aqi=no&alerts=no`)
    let data=await response.json();
    return data

}
function displayToday(data)
{
    let today=new Date()
    todayData.innerHTML=today.toLocaleDateString("en-Us",{weekday:"long"})
    todayLocation.innerHTML=data.location.name
    todayTemp.innerHTML=data.current.temp_c+"C"
    todayImg.setAttribute("https","src",data.current.condition.icon)
    todayText.innerHTML=data.current.condition.text
    humidity.innerHTML=data.current.humidity+"%"
    wind.innerHTML=data.current.wind_kph+"Km/kg"
    windDirc.innerHTML=data.current.wind_dir


}
function displayNextDay(data)
{
    for(let i=0;i<2;i++)
    {
        let next=new Date(data.forecast.forecastday[i+1].date)
        nextDayData[i].innerHTML=next.toLocaleDateString("en-Us",{weekday:"long"})

        nextDayTemp[i].innerHTML=data.forecast.forecastday[i+1].day.maxtemp_c+"C"
        nextDayMinTemp[i].innerHTML=data.forecast.forecastday[i+1].day.mintemp_c+"C"
        nextDayText[i].innerHTML=data.forecast.forecastday[i+1].day.condition.text
        nextDayImg[i].setAttribute("https","src",data.forecast.forecastday[i+1].day.condition.icon)
    }
}


async function allData(town="cairo")
{
    let getApii=await getApi(town)
    displayToday(getApii)
    displayNextDay(getApii)
}
allData()


search.addEventListener("input",function()
{
    allData(search.value)

})

