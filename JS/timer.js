
const SWITCH1 = 'SWITCH_OVEN_1'
const SWITCH2 = 'SWITCH_OVEN_2'

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
      console.log(`POST success [data: ${data}, route: ${route}]`)
    }
    , fail: (response) => {
      console.log(`POST fail [error: ${response}]`)
    }
  });
}

let setup = () => {
  $('#some-button').on('click', () => {
    postWeb()
  })
}

let init = () => {

}

$(init)
