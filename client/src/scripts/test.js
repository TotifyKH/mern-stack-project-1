let apiURL = process.env.REACT_APP_API_URL;

export const getTest = async () => {
  try{
    const result = await fetch(`${apiURL}/test`, {
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