/* eslint-disable import/no-anonymous-default-export */

const { default: axiosClient } = require('./axioxClient')

function addUser(data) {
    console.log(data)
    return axiosClient.post('/customers', data)
}

export default { addUser }