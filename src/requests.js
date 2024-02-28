import axios from 'axios'

axios.defaults.withCredentials = true

const URL = 'https://backend.pensatta.net/api' // 'http://localhost:3300/api'

function postRegister (objParams, cb, cbError) {
  axios({
    method: 'post',
    url: `${URL}/register`,
    data: objParams

  }
  )
    .then(function (response) { cb(response.data) })
    .catch(function (error) { cbError('Un error ha ocurrido ' + error.message) })
}

function getLogin (cb) {
  axios.get(`${URL}/login`)
    .then(response => {
      if (response.data.logged) {
        cb(response.data.user)
      } else {
        const empty = {}
        cb(empty)
      }
    }).catch(error => {
      console.log(error)
    })
}

function postLogin (objParams, cb, cbError) {
  axios.post(`${URL}/login`, objParams)
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (_error) {
      cbError('Un error ha ocurrido')
    })
}

function postLogout (cb) {
  axios.post(`${URL}/logout`)
    .then(function () {
      const empty = {}
      cb(empty)
      document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    })
    .catch(function (error) {
      console.log(error)
    })
}

function postExercise (objParams, cb, cbError) {
  axios.post(`${URL}/exercise`, objParams, { withCredentials: false })
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (error) {
      console.log(error)
      cbError('Un error ha ocurrido')
    })
}

function getInstitutions (cb) {
  axios.get(`${URL}/institution`)
    .then(response => {
      cb(response.data)
    }).catch(error => {
      console.log(error)
    })
}

function updateInsitutions (objParams, cb, cbError) {
  axios.put(`${URL}/institution`, objParams)
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (error) {
      console.log(error)
      cbError('Un error ha ocurrido')
    })
}

function addInstitution (objParams, cb, cbError) {
  axios.post(`${URL}/institution`, objParams)
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (error) {
      console.log(error)
      cbError('Un error ha ocurrido')
    })
}

function getStudentsHistory (studentId, cb) {
  axios.get(`${URL}/profile/exercises/${studentId}`)
    .then(response => { cb(response.data.history) })
    .catch(error => { console.log(error) })
}

function getMetrics (studentId, cb) {
  axios.get(`${URL}/profile/metrics/${studentId}`)
    .then(response => { cb(response.data) })
    .catch(error => { console.log(error) })
}

function getResumen (studentId, cb) {
  axios.get(`${URL}/profile/resumen/${studentId}`)
    .then(response => { cb(response.data) })
    .catch(error => { console.log(error) })
}

function coordinacionMetricsAll (coordinatorId, cb) {
  axios.get(`${URL}/coordinacion/inicio/${coordinatorId}`)
    .then(response => { cb(response.data) })
    .catch(error => { console.log(error) })
}

function coordinacionGrupos (coordinatorId, cb) {
  axios.get(`${URL}/coordinacion/grupos/${coordinatorId}`)
    .then(response => { cb(response.data) })
    .catch(error => { console.log(error) })
}
function coordinacionMetrics (coordinatorId, nivel, cb) {
  axios.get(`${URL}/coordinacion/metrics/${coordinatorId}/${nivel}`)
    .then(response => { cb(response.data) })
    .catch(error => { console.log(error) })
}
function coordinacionMetricsStudents (coordinatorId, gradoId, cb) {
  axios.get(`${URL}/coordinacion/grado/${coordinatorId}/${gradoId}`)
    .then(response => { cb(response.data) })
    .catch(error => { console.log(error) })
}

function profesorMetricsAll (profesorId, cb) {
  axios.get(`${URL}/profesor/inicio/${profesorId}`)
    .then(response => { cb(response.data) })
    .catch(error => { console.log(error) })
}
function profesorResumen (profesorId, cb) {
  axios.get(`${URL}/profesor/resumen/${profesorId}`)
    .then(response => { cb(response.data) })
    .catch(error => { console.log(error) })
}
function profesorMetrics (profesorId, nivel, cb) {
  axios.get(`${URL}/profesor/metrics/${profesorId}/${nivel}`)
    .then(response => { cb(response.data) })
    .catch(error => { console.log(error) })
}
function profesorMetricsStudents (profesorId, gradoId, cb) {
  axios.get(`${URL}/profesor/grado/${profesorId}/${gradoId}`)
    .then(response => { cb(response.data) })
    .catch(error => { console.log(error) })
}
function addGroup (coordinatorId, objParams, cb, cbError) {
  axios.post(`${URL}/coordinacion/grupos/addgrupos/${coordinatorId}`, objParams)
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (error) {
      console.log(error)
      cbError('Un error ha ocurrido')
    })
}
function addStudent (coordinatorId, objParams, cb, cbError) {
  axios.post(`${URL}/coordinacion/grupos/addstudent/${coordinatorId}`, objParams)
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (error) {
      console.log(error)
      cbError('Un error ha ocurrido')
    })
}

function getTeachers (coordinatorId, cb) {
  axios.get(`${URL}/coordinacion/grupos/addgrupos/${coordinatorId}`)
    .then(response => {
      cb(response.data)
    }).catch(error => {
      console.log(error)
    })
}
function changePassword (coordinatorId, objParams, cb, cbError) {
  axios.put(`${URL}/coordinacion/changepassword/${coordinatorId}`, objParams)
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (error) {
      console.log(error)
      cbError('Un error ha ocurrido')
    })
}

function reasignTeacher (coordinatorId, objParams, cb, cbError) {
  axios.put(`${URL}/coordinacion/grupos/reasignteacher/${coordinatorId}`, objParams)
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (error) {
      console.log(error)
      cbError('Un error ha ocurrido')
    })
}

function deleteStudentFromCourse (coordinatorId, objParams, cb, cbError) {
  axios.put(`${URL}/coordinacion/grupos/deletestudent/${coordinatorId}`, objParams)
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (error) {
      console.log(error)
      cbError('Un error ha ocurrido')
    })
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
  coordinacionGrupos,
  coordinacionMetrics,
  coordinacionMetricsStudents,
  profesorMetricsAll,
  profesorResumen,
  profesorMetrics,
  profesorMetricsStudents,
  addGroup,
  getTeachers,
  addStudent,
  changePassword,
  reasignTeacher,
  deleteStudentFromCourse
}
