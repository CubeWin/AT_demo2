import { Button, FormControl, FormHelperText, FormLabel, Snackbar, TextField, Typography } from '@mui/material'
import { useSignIn } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
import { authenticate, isAvailable, login } from '../services/ApiLogin'
import { useState } from 'react'

const LogginSpinner = ({ isLogging }) => {
  return (
    <div id='spinner-login-container'>
      <div id='spinner-login' style={{ opacity: isLogging ? 'initial' : '0%' }} />
    </div>
  )
}

export default () => {
  const singIn = useSignIn()
  const navigate = useNavigate()

  const [userError, setUserError] = useState()
  const [passwordError, setPasswordError] = useState()
  const [generalError, setGeneralError] = useState()
  const [isLogging, setIsLogging] = useState(false)

  const onChangeUser = (ev) => {
    setUserError()
  }
  const onChangePassword = (ev) => {
    setPasswordError()
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()

    setGeneralError()

    const available = await isAvailable()
    if (!available) {
      console.log(available)
      return
    }

    const input_username = document.getElementById('userNameId').value
    const input_password = document.getElementById('userPasswordId').value

    if (input_username === '') {
      setUserError('EL usuario es obligatorio')
    }
    if (input_password === '') {
      setPasswordError('La contraseña es obligatoria')
    }
    if (input_password === '' || input_username === '') {
      return
    }

    setIsLogging(true)
    let login_data = await login(input_username, input_password)
    if (!login_data.success) {
      console.log(login_data)
      if (login_data.error === "Cannot read properties of undefined (reading 'PASSWORD')") {
        setUserError('El usuario no existe')
      } else if (login_data.error === 'Usuario o clave incorrecto.') {
        setPasswordError('La contraseña es incorrecta')
      } else if (login_data.error === 'Illegal arguments: string, undefined') {
        setGeneralError('Servicio no disponible')
      }

      setIsLogging(false)
      return
    }

    let auth_data = await authenticate(login_data.token)
    if (!auth_data.success) {
      setIsLogging(false)
      return
    }

    singIn({
      token: auth_data.token,
      tokenType: 'Bearer',
      expiresIn: 60 * 24,
      authState: { username: auth_data.verfify.uid }
    })

    setIsLogging(false)
    navigate('/AT_demo2')
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '30rem', height: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <form
          onSubmit={onSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '17rem',
            height: '23rem'
          }}
        >
          <Typography variant='h4' sx={{ marginBottom: '1.5rem' }}>
            Iniciar sesión
          </Typography>
          <FormControl sx={{ marginBottom: '1rem' }}>
            <FormLabel required sx={{ marginBottom: '0.2rem', fontSize: 15 }} htmlFor='userNameId' style={{ fontWeight: 'bold' }}>
              Usuario
            </FormLabel>
            <TextField
              onChange={onChangeUser}
              error={Boolean(userError)}
              id='userNameId'
              size='small'
              placeholder='Ingrese un usuario'
            ></TextField>
            <FormHelperText error sx={{ marginLeft: 0 }}>
              {userError}
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ marginBottom: '1.5rem' }}>
            <FormLabel required sx={{ marginBottom: '0.2rem', fontSize: 15 }} htmlFor='userPaswordId' style={{ fontWeight: 'bold' }}>
              Contraseña
            </FormLabel>
            <TextField
              onChange={onChangePassword}
              error={Boolean(passwordError)}
              id='userPasswordId'
              size='small'
              placeholder='Ingrese una contraseña'
              type='password'
            ></TextField>
            <FormHelperText error sx={{ marginLeft: 0 }}>
              {passwordError}
            </FormHelperText>
          </FormControl>

          <FormHelperText error sx={{ marginLeft: 0 }}>
            {generalError}
          </FormHelperText>
          <Button disabled={isLogging} variant='contained' color={generalError ? 'error' : 'primary'} type='submit'>
            Iniciar sesión
            <LogginSpinner isLogging={isLogging} />
          </Button>
        </form>
      </div>
      <div
        style={{ flexGrow: 1 }}
        className='bg-gradient-to-br from-[#25245F] from-20% via-[#009B8B] via-85% to-[#649c33] to-100% text-white'
      >
        image
      </div>
    </div>
  )
}