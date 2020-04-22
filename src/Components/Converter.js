import React,{useState,useEffect} from 'react'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {SwapVert} from '@material-ui/icons';
import axios from 'axios'

const Converter=()=>{
	const [data,setData]=useState({
		currencies:['USD','AUD','SGD','EUR','PHP'],
		base:'USD',
		amount:'',
		convertto:'USD',
		result:'',
		date:''
	})

	const useStyles = makeStyles((theme) => ({
  		formControl: {
    		margin: theme.spacing(1),
    		minWidth: 120,
  		},
  		selectEmpty: {
  		  	marginTop: theme.spacing(2),
  		},
  		root: {
    		minWidth: 120,
    		maxWidth: 400,
  		},
  		title: {
  		  	fontSize: 14,
  		},
  		pos: {
  		  	marginBottom: 12,
  		},
  		roott: {
   		  	flexGrow: 1,
  		},
  		paper: {
  		  	padding: theme.spacing(1),
  		  	textAlign: 'center',
  		  	color: theme.palette.text.secondary,
  		  	border:0,
  		},
  		
	}));


  	const classes = useStyles();
 
	
	const handleInput=(e)=>{
		setData({...data,[e.target.name]:e.target.value,
						result:null})
	}

	const handleSelect=(e)=>{
		setData({...data,[e.target.name]:e.target.value,
						result:null})
	}


	const SwapCurr=()=>{
		setData({...data,base:data.convertto,
						convertto:data.base,
						result:null})
	}




	const convertCurr=()=>{
		const amount=data.amount
		if (amount===''){
			return
		}else{
			
			   axios
			    .get(`https://api.exchangeratesapi.io/latest?base=${data.base}`)
			    .then(response=>{
			    	const date=response.data.date
			    	const result=(response.data.rates[data.convertto] * data.amount).toFixed(4)

			     	setData({...data,date:date,
			     					result:result})
			    })
			    .catch(err=>{
			      console.log(err)
			    })
					}
	}


	useEffect(()=>{
		convertCurr()
  	},[data.amount,data.base,data.convertto])
	return(
		<>
			<Typography align="center" component='div' variant='body1' >
				<Typography variant="h2">
					Currency Converter	
				</Typography>
				<Card style={{'margin':'auto'}} className={classes.root} raised variant="outlined">
	      			<CardContent>
	      				<Typography variant="h5">
	  						{data.amount} {data.base} is equevalent to
						</Typography>
						<Typography variant="h2">
							{data.result} {data.convertto}
						</Typography>
						<Typography variant="subtitle1">
							Asss of {data.date}
						</Typography>
	        
	        			<div className={classes.roott}>
			 				<Grid container >
				 				<Grid container item xs={10} >
				  					<FormControl variant="outlined" className={classes.formControl}>
				 						<Grid container item xs={12} >
		        							<Grid item xs={6}>
		          								<Paper elevation={0} className={classes.paper}>
		          									<TextField
				 									variant="outlined"
		         									id="outlined-number"
		         									label="Convert from"
		         									type="number"
		         									InputLabelProps={{
		         									   shrink: true,
		          									}}
		          									name='amount' value={data.amount} onChange={handleInput}
		        									/>
		          								</Paper>
		        							</Grid>
		        							<Grid item xs={6}>
		          								<Paper elevation={0} className={classes.paper}>
		            								<Select
		          									native
		          									value={data.base}
		          									onChange={handleSelect}
		          									inputProps={{
		          										name: 'base',
		            									id: 'outlined-age-native-simple',
		          									}}
		        									>
		     											{data.currencies.map(currency=>(
														<option value={currency} key={currency}>{currency}</option>
														))}
		        									</Select>
		          								</Paper>
		        							</Grid>
		        						</Grid>
		         					</FormControl>
		      						
		     
		      
		      						<FormControl variant="outlined" className={classes.formControl}>
		      							<Grid container item xs={12} >
		        							<Grid className={classes.paperr} item xs={6}>
		          								<Paper elevation={0} className={classes.paper}>
		          									<TextField variant="outlined" disabled id="outlined-number" label="Convert to" type="text" InputLabelProps={{shrink: true}} name='result' value={data.result===null ? 'Calculating...' : data.result}  />
		         								 </Paper>
		        							</Grid>
		        							<Grid item xs={6}>
		          								<Paper elevation={0} className={classes.paper}>
		            								<Select
		         								 	native
		         								 	value={data.convertto}
		         								 	onChange={handleSelect}
		         								 	inputProps={{
		            									name: 'convertto',
		         								   		id: 'outlined-age-native-simple',
		         								 	}}
		       								 		>								
		     											{data.currencies.map(currency=>(
														<option value={currency} key={currency}>{currency}</option>
														))}
		        									</Select>
		          								</Paper>
		        							</Grid>
		      							</Grid>
		      						</FormControl>
		      					</Grid>
	      						<Grid container item xs={2} >
	      							<button  style={{border:0}} onClick={SwapCurr}><SwapVert/></button>
	      						</Grid>
	      					</Grid>
	     				 </div>
	      			</CardContent>
	    		</Card>
	    	</Typography>	
		</>
		)
}

export default Converter