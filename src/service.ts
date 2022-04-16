import axios from "axios";

const baseUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study/";


const UPaymentService = {
  get(url: string){
    return axios.request({
      method: "GET",
      baseURL: baseUrl,
      url
    });
  },
  post(url: string, data: object){
    return axios.request({
      method: "POST",
      baseURL: baseUrl,
      url,
      data
    })
  },
  delete(url: string){
    return axios.request({
        method: "DELETE",
        baseURL: baseUrl,
        url
    })
  },

  getCategories(){
    return new Promise<any>((resolve, reject) => {
      this.get("categories")
      .then(res => {
        resolve(res.data.map((category: any) => ({
          label: category.name,
          value: category.name
        })))
      })
      .catch(reject);
    })
  }
}

export default UPaymentService;