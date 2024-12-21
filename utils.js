const getDataFromParam = (req, paramKey, returnType='string')=>{
  if(returnType==='float'){
    return parseFloat(req.query[paramKey])
  }
  return req.query[paramKey]
} 

module.exports = {
  getDataFromParam
}