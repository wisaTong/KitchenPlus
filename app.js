
var oven1 = -1
var oven2 = -1
var temp1 = 0
var temp2 = 0

const OVEN_1 = 'OVEN_1'
const OVEN_2 = 'OVEN_2'

const TEMP_O1 = 'TEMP_OVEN_1'
const TEMP_O2 = 'TEMP_OVEN_2'
const TEMP_KTCH = 'TEMP_KITCHEN'

const LPG = 'LPG'
const FAN = 'FAN_STATUS'

//return as promise
let getWeb = (sensor) => {
  return $.ajax({
    type: "GET"
    , url: `http://ecourse.cpe.ku.ac.th/exceed/api/terngpalm-${sensor}/view`
    , dataType: "text"
  });
}

let postWeb = (sensor, data) => {
  $.ajax({
    type: "POST"
    , url: `http://ecourse.cpe.ku.ac.th/exceed/api/terngpalm-${sensor}/set`
    , data: {
      value: data
    }
    , dataType: "json"
    , success: (response) => {
      console.log(`POST success [data: ${data}, sensor: ${sensor}]`)
    }
    , fail: (response) => {
      console.log(`POST fail [error: ${response}]`)
    }
  });
}

//SPECIFIC REQUEST HERE

let getLPG = () => {
  getWeb(LPG).then((res) => {

    $('#lpg').html(`<h1>${res} ppm</h1>`)

    if (res <= 1000) $('#safety').html(`<p class="font-weight-light italic" style="margin-bottom: 30px; font-size: 20px; color: grey">SAFTY LEVEL: SAFE</p>`)
    else if (res <= 1200) $('#safety').html(`<p class="font-weight-light italic" style="margin-bottom: 30px; font-size: 20px; color: grey">SAFTY LEVEL: UNSAFE</p>`)
    else if (res <= 1700)$('#safety').html(`<p class="font-weight-light italic" style="margin-bottom: 30px; font-size: 20px; color: grey">SAFTY LEVEL: DANGEROUS </p>`)
  })
}

let getOvenTemp = () => {
  getWeb(TEMP_O1).then((res) => { $('#oven-temp1').html(`<h1>${res} °c</h1>`) })
  getWeb(TEMP_O2).then((res) => { $('#oven-temp2').html(`<h1>${res} °c</h1>`) })
}

let getFanStatus = () => {
  getWeb(FAN).then((res) => {
    if (res < 0) $('#fan').html(`<p id="fan" class="font-weight-light" style="margin-top: 20px; font-size: 45px; color: lightgrey">FAN STATUS OFF</p>`)
    else $('#fan').html(`<p id="fan" class="font-weight-light" style="margin-top: 20px; font-size: 45px; color: grey">FAN STATUS ON</p>`)
  })
}

//END OF SPECIFIC REQUEST

let getAll = () => {
  getLPG()
  getOvenTemp()
  getFanStatus()
}

let setup = () => {
  $('#oven1').on('click', () => {
    window.location.replace('./nextpage.html')
  })  
}

let init = () => {
  setup()
  setInterval(getAll, 500)
}

$(init)
