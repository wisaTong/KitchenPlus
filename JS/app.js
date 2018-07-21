
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

const WARN = 'WARNING'

const SWITCH1 = 'SWITCH_OVEN_1'
const SWITCH2 = 'SWTICH_OVEN_2'

//return as promise
let getWeb = (route) => {
  return $.ajax({
    type: "GET"
    , url: `http://ecourse.cpe.ku.ac.th/exceed/api/terngpalm-${route}/view`
    , dataType: "text"
  });
}

let postWeb = (route, data) => {
  $.ajax({
    type: "POST"
    , url: `http://ecourse.cpe.ku.ac.th/exceed/api/terngpalm-${route}/set`
    , data: {
      value: data
    }
    , dataType: "json"
    , success: (response) => {
      console.log(`POST success [data: ${data}, sensor: ${route}]`)
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

    if (res <= 1000) $('#safety').html(`<p class="font-weight-light italic" style="margin-bottom: 10px; font-size: 20px; color: grey">SAFTY LEVEL: SAFE</p>`)
    else if (res <= 1200) {
      $('#safety').html(`<p class="font-weight-light italic" style="margin-bottom: 10px; font-size: 20px; color: grey">SAFTY LEVEL: UNSAFE</p>`)
      postWeb(WARN, 1)
    }
    else if (res <= 1700) $('#safety').html(`<p class="font-weight-light italic" style="margin-bottom: 10px; font-size: 20px; color: grey">SAFTY LEVEL: DANGEROUS </p>`)
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

let getRoomTemp = () => {
  getWeb(TEMP_KTCH).then((res) => { $('#room-temp').html(`<p id="room-temp" class="font-weight-light" style="top: 90px; font-size: 20px; color: grey">ROOM TEMPERATURE: ${res} °c</p>`) })
}

let getOvenStatus = () => {
  getWeb(OVEN_1).then((res) => { oven1 = res })
  getWeb(OVEN_2).then((res) => { oven2 = res })
}

//END OF SPECIFIC REQUEST

let getAll = () => {
  getLPG()
  getOvenTemp()
  getFanStatus()
  getRoomTemp()
  getOvenStatus()
}

let setup = () => {
  $('#oven1').on('click', () => {
    window.location.replace('./nextpage.html')
  })
  $('#some-button1').on('click', () => {
    //TODO finish this method
  })
}

let init = () => {
  setup()
  setInterval(getAll, 500)
}

$(init)
