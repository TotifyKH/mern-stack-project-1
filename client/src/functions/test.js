let baseURL = process.env.REACT_APP_BASE_URL;

export const getTest = async () => {
  try{
    const result = await fetch(`${baseURL}/test`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json", 
      }
    })
    
    return result.json();
  }catch(err){
    console.log(err);
  }
}