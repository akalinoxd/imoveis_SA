import axios from 'axios'

const apiURL = 'http://localhost:3001'

const authService = {

    async authenticate(data){
        const endpoint = `${apiURL}/login`
        return axios.post(endpoint, data)
    },

    setLoggedUser(data){
        let parsedData = JSON.parse(data)
        localStorage.setItem("user", parsedData)
    },

    getLoggedUser(){
        let data = localStorage.getItem("user")
        if(!data) return null
        try {
            let parsedData = JSON.parse(data)
            return parsedData
        }catch(error){
            console.log(error)
            return null
        }
    }
}

export default authService