const express=require('express')
const path=require('path')
const app=express()



app.get('/express_backend/:name',(req,res)=>{
  const APP_ID='d2bab044'
  const APP_KEY='530ef04c419309f99e1b48b368a4166d'
  const URL=`https://api.edamam.com/search?q=${req.params.name}&app_id=${APP_ID}&app_key=${APP_KEY}` 
  fetch(URL)
  .then(res=>{
  		console.log(res)
  	res.json()})
  .then(data=>{
  	console.log(data)
  	res.send({data})
  })
  .catch(err=>{
  	console.log('error')
  })
	
})

app.listen(process.env.PORT || 8080,()=>{
	console.log('listening on port 8080')
})

