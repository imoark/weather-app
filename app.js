const url = 'http://services.gisgraphy.com//geocoding/geocode?'
const url1 = 'http://free.gisgraphy.com/geocoding/geocode?'
const urlDark = 'https://api.darksky.net/forecast/'
const urlGeo = 'https://locationiq.org/v1/search.php?key='
const city = 'Vancouver'
const country = 'CA'

// const lng = '-123.11933898925781'
// const lat = '49.24966049194336'
const keyAPI = 'YOUR LOCATIONIQ KEY API'

var form = document.getElementById("weather")
const display = document.getElementById("display");

let cityGeo = []

console.log(`${url1}address=${city}&country=${country}&format=JSON&from=1&to=10`)

const cityToGeo = function (e){
	e.preventDefault();
	display.innerHTML=""
	const inputCity = document.getElementById('city').value
	const inputCountry = document.getElementById('country').value
	// fetch(`${url1}address=${city}&country=${country}&format=JSON&from=1&to=10`)
	fetch(`${urlGeo}${keyAPI}&format=json&city=${inputCity}&country=${inputCountry}`)
	// console.log(`${urlDark}${keyAPI}/${lat},${lng}`)
	// fetch(`${urlDark}${keyAPI}/${lat},${lng}`)
	.then((response) => response.json())
	.then((data) => {
		console.log(data)
		console.log(data[0].lon)
		console.log(data[0].lat)
		lat = data[0].lat
		lon = data[0].lon
		// cityGeo.push(data[0].lat)
		// cityGeo.push(data[0].lon)
		console.log(cityGeo)
		geoToWeather(lat, lon)
		fiveForecast(lat, lon)
	})
}

const baseUrl = 'https://api.apixu.com/v1'
const cWeather = '/current.json?'
const fWeather = '/forecast.json?'
const xuAPI = 'YOUR APIXU KEY API'

console.log(`${baseUrl}${cWeather}key=${xuAPI}&q=${cityGeo}`)

let currentC = []
let currentF = []
let currentText = []
let currentIcon = []

const geoToWeather = function (lat, lon){
	fetch(`${baseUrl}${cWeather}key=${xuAPI}&q=${lat},${lon}&days=5`)
	.then((response) => response.json())
	.then((data) =>{
		console.log(data)
		console.log(data.current.temp_c)
		console.log(data.current.temp_f)
		console.log(data.current.condition.text)
		console.log(data.current.condition.icon)
		currentC.push(data.current.temp_c)
		currentF.push(data.current.temp_f)
		currentText.push(data.current.condition.text)
		currentIcon.push(data.current.condition.icon)
		render()

	})
}

const fiveForecast = function (lat, lon){
	// console.log(`${baseUrl}${fWeather}key=${xuAPI}&q=${lat},${lon}&days=5`)
	fetch(`${baseUrl}${fWeather}key=${xuAPI}&q=${lat},${lon}&days=5`)
	.then((response) => response.json())
	.then((data) =>{
		console.log(data)
		let dataForecast = data.forecast.forecastday
		console.log(dataForecast)
		for(i = 0; i < dataForecast.length; i++) {
			console.log(i)
            let newDiv = document.createElement("div")
            newDiv.id = 'future'
			let nextDay = document.createElement("h1");
			nextDay.textContent = 'Day ' + (i + 1) + ' from today'
			newDiv.appendChild(nextDay)
            console.log(newDiv)
            let futureIcon = document.createElement("img")
            futureIcon.src = `http:`+ dataForecast[i].day.condition.icon
            console.log(futureIcon)
            newDiv.appendChild(futureIcon)
            let futureTemp = document.createElement("p")
            futureTemp.textContent = dataForecast[i].day.avgtemp_c + `°C or ` + dataForecast[i].day.avgtemp_f + `°F`
            newDiv.appendChild(futureTemp)
            let futureCondition = document.createElement("h3")
            futureCondition.textContent = dataForecast[i].day.condition.text
            newDiv.appendChild(futureCondition)
            
            display.appendChild(newDiv)
        }
	})
}


const render = (e) => {

	let today = document.createElement("h1");
	today.textContent = "Today Weather"
	display.appendChild(today)


	const newIcon = document.createElement("img");
	newIcon.src = `http:`+ currentIcon[0]
	console.log(newIcon)
	display.appendChild(newIcon)

	const newNumberC = document.createElement("p");
	newNumberC.textContent = currentC[0] + "°C"
	display.appendChild(newNumberC)

	const newNumberF = document.createElement("p");
	newNumberF.textContent = currentF[0] + "°F"
	display.appendChild(newNumberF)

	const newCondition = document.createElement("h3");
	newCondition.textContent = currentText[0]
	display.appendChild(newCondition)

	cityGeo = []
	currentC = []
	currentF = []
	currentText = []
	currentIcon = []

}

form.addEventListener("submit", cityToGeo);

