import { Button, FormControl, FormLabel, TextField, Typography } from '@mui/material'
import { useSignIn } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../constants/dataConfig'

export default () => {
  const singIn = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (ev) => {
    ev.preventDefault()

    const input_username = document.getElementById('userNameId').value
    const input_password = document.getElementById('userPasswordId').value

    console.log(input_username, input_password)
    
    let res = await fetch(`${API_BASE_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: input_username, password: input_password })
    })
    res = await res.json()

    // console.log('First request', res)
    if (!res.success) {
      return
    }

    res = await fetch(`${API_BASE_URL}/validtoken`, {
      method: 'POST',
      headers: { 'auth-token': res.token }
    })
    res = await res.json()
    console.log(res.message)
    if (!res.success) {
      return
    }

    // console.log('Second request', res)
    singIn({
      token: res.token,
      tokenType: 'Bearer',
      expiresIn: 60 * 24,
      authState: { username: res.verfify.uid }
    })
    navigate('/AT_demo2')
  }

  return (
    <div className='flex h-full'>
      <div className='bg-slate-200 w-[30rem] h-full flex justify-center items-center'>
        <form
          className='p-5 rounded border border-slate-500  outline outline-2 outline-blue-300 flex flex-col justify-between w-[20rem] h-[23rem]'
          onSubmit={onSubmit}
        >
          <Typography className='text-center' variant='h4'>
            Iniciar sesión
          </Typography>
          <FormControl>
            <FormLabel htmlFor='userNameId'>Usuario</FormLabel>
            <TextField id='userNameId' placeholder='Ingresa un usuario'></TextField>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='userPaswordId'>Contraseña</FormLabel>
            <TextField id='userPasswordId' placeholder='Ingresa una contraseña' type='password'></TextField>
          </FormControl>
          <Button variant='contained' type='submit'>
            Iniciar seción
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
