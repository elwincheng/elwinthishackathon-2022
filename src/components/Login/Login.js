import * as React from 'react'
import { useState } from 'react'
import { Snackbar, Paper, Button, Container, Grid, Typography, Avatar } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux'
//import { signin, signup } from '../../actions/auth.js';
import { useNavigate } from 'react-router-dom'
import Alert from '../Snackbar/Alert.js';

import Field from './Field.js'
import styles from './Login.module.css'


const initialState = { firstName: '', lastName: '', email: 'admin@admin.com', password: 'admin', confirmPassword: '' }

const Login = () => {

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [formData, setFormData] = useState(initialState)
	const [isSignup, setIsSignup] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const [open, setOpen] = useState(false)
	const [success, setSuccess] = useState(false)

	const handleSuccess = () => {
		setSuccess(true);
		setOpen(true);
	}

	const handleFail = () => {
		setOpen(true);
		setSubmitted(false);
	}

	const handleClose = (event, reason) => {
		setOpen(false);
	}

	async function fetchAccountData() {
		try {
			const accounts = await fetch("https://otvrgk0ip2.execute-api.us-east-2.amazonaws.com/getUP", {
				method: "GET", mode: "cors", headers: {
					'Access-Control-Allow-Origin': '*'
				}
			});
			const accountData = await accounts.json();
			console.log(accountData)
			return accountData
		} catch (e) {
			console.log(e)
		}
	}

	const handleSubmit = (e) => {
		setSubmitted(true);
		e.preventDefault();

		if (isSignup) {
			//dispatch(signup(formData))
		} else {
			fetchAccountData().then(accounts => {
				let currUser = null;
				for (let account of accounts) {
					if (account.username == formData.username && account.password == formData.password) {
						currUser = account;
						console.log(currUser)
						break;
					}
				}

				//Redirect do whatever you want here xd
			})
		}
	}


	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	const switchMode = () => {
		setIsSignup(!isSignup);
	}



	return (
		<Container component="main" maxWidth="xs">
			<Paper className={styles.paper} elevation={2}>
				<Avatar sx={{ bgcolor: '#1976d2', margin: '10px' }} className={styles.lock}>
					<LockIcon />
				</Avatar>
				<h2 style={{ padding: '10px 10px 30px 10px' }}>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup &&
							<>
								<Field name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
								<Field name="lastName" label="Last Name" handleChange={handleChange} autoFocus half />
							</>
						}
						<Field name="username" label="Username" handleChange={handleChange} type="name" />
						<Field name="password" label="Password" handleChange={handleChange} type="password" />
						{isSignup && <Field name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
					</Grid>
					<div className={styles.buttons}>
						<div>
							<Button variant="contained" type="submit" >{submitted ? <CircularProgress /> : isSignup ? 'Sign up' : 'Sign in'}</Button>
						</div>
					</div>
					<Grid container justifyContent="center">
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>

			<Snackbar sx={{ width: '100%' }} open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} sx={{ width: '100%' }} severity={success ? "success" : "error"}>
					{success ? "Log in Successful" : "Invalid Credentials"}
				</Alert>
			</Snackbar>
		</Container>
	)
}

export default Login;