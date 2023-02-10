import axios from "axios"

axios.defaults.withCredentials = true

const URL = "http://localhost:3300/api" //"http://3.84.3.50:8000/api" //"http://localhost:3300/api"//'http://www.pensatta.net/pensatta-backend/api'//http://127.0.0.1:3001/api http://www.pensatta.net/pensatta-backend/api

function postRegister(objParams, cb, cbError){
  axios({
    method : "post",
    url : `${URL}/register`,
    data : objParams

  }
  )
            .then(function (response) { cb(response.data) })
            .catch(function (error) { cbError('Un error ha ocurrido ' + error.message) })
}

function getLogin(cb) {
    axios.get(`${URL}/login`)
      .then(response => {
        if (response.data.logged){
          cb(response.data.user)
        }else{
          cb({})
        }
      }).catch(error => {
        console.log(error)
      })
}

function postLogin(objParams, cb, cbError){
  axios.post(`${URL}/login`, objParams)
        .then(function (response) {
          cb(response.data)
      })
      .catch(function (error) {
          cbError('Un error ha ocurrido')
      })
}

function postLogout(cb){
  axios.post(`${URL}/logout`)
        .then(function () {
            cb({})
            document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        })
        .catch(function (error) {
            console.log(error)
        })
}

function postExercise(objParams, cb, cbError){
  axios.post(`${URL}/exercise`, objParams)
        .then(function (response) {
          cb(response.data)
        })
        .catch(function (error) {
          console.log(error)
          cbError('Un error ha ocurrido')
        })
}

function getInstitutions(cb){
  axios.get(`${URL}/institution`)
      .then(response => {
        cb(response.data)
      }).catch(error => {
        console.log(error)
      })
}

function updateInsitutions(objParams, cb, cbError){
  axios.put(`${URL}/institution`, objParams)
        .then(function (response) {
          cb(response.data)
        })
        .catch(function (error) {
          console.log(error)
          cbError('Un error ha ocurrido')
        })
}

function addInstitution(objParams, cb, cbError){
  axios.post(`${URL}/institution`, objParams)
        .then(function (response) {
          cb(response.data)
        })
        .catch(function (error) {
          console.log(error)
          cbError('Un error ha ocurrido')
        })
}

function getStudentsHistory(studentId, cb){
  axios.get(`${URL}/profile/exercises/${studentId}`)
	.then(response => {cb(response.data.history)})
	.catch(error => {console.log(error)})
}

function getMetrics(studentId, cb){
  axios.get(`${URL}/profile/metrics/${studentId}`)
  .then(response => {cb(response.data)})
  .catch(error => {console.log(error)})
}

function getResumen(studentId, cb){
  axios.get(`${URL}/profile/resumen/${studentId}`)
  .then(response => {cb(response.data)})
  .catch(error => {console.log(error)})
}

function coordinacionMetricsAll(coordinatorId, cb){
  axios.get(`${URL}/coordinacion/inicio/${coordinatorId}`)
  .then(response => {cb(response.data)})
  .catch(error => {console.log(error)})
}

function coordinacionGrupos(coordinatorId, cb){
  axios.get(`${URL}/coordinacion/grupos/${coordinatorId}`)
  .then(response => {cb(response.data)})
  .catch(error => {console.log(error)})
}

export {
  getLogin, 
  postLogin, 
  postRegister, 
  postLogout, 
  postExercise, 
  getInstitutions, 
  updateInsitutions, 
  addInstitution, 
  getStudentsHistory, 
  getMetrics,
  getResumen,
  coordinacionMetricsAll,
  coordinacionGrupos
}
