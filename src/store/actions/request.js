import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const request =  axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.get('patientToken')}`
  },  
   transformResponse: [res => {
    return res
   }]

});
request.defaults.baseURL = 'http://api.sasthoboi.com/src/bootstrap.php';

export default request;
