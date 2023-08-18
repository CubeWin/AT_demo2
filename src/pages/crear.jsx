import { Box, Container, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import useCreateProject from '../hooks/useCreateProject'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Crear({ beginCreation }) {
  const { isLoadingProject, resMessage, setIsPost, isPost, setProject, success } = useCreateProject()

  useEffect(() => {
    if (!success) return
    beginCreation(false)
  }, [success])

  return (
    <Container className='absolute h-full w-full flex flex-col justify-between'>
      <div className='max-w-[450px] p-0 w-full'>
        <h1 className='my-5 font-thin text-center text-3xl font-[Helvetica]'>Crear nuevo Proyecto</h1>
        <TextField
          className='w-full mb-3 rounded'
          id='filled-name'
          label='Nombre'
          //   defaultValue='Nombre del Proyecto'
          placeholder='Nombre del Proyecto'
          name='name'
          variant='filled'
          onChange={(e) => {
            console.log(e.target.value)
            setProject((p) => ({ ...p, [e.target.name]: e.target.value }))
          }}
        />
        <TextField
          className='w-full mb-3 rounded'
          id='filled-descripcion'
          label='Descripción'
          //   defaultValue='Descripción del Proyecto'
          variant='filled'
          name='description'
          placeholder='Descripción del Proyecto'
          multiline
          rows={3}
          onChange={(e) => {
            console.log(e.target.value)
            setProject((p) => ({ ...p, [e.target.name]: e.target.value }))
          }}
        />
        {isLoadingProject && <p className='text-rose-600'>{resMessage}</p>}
      </div>
      <div className='p-2 flex justify-around'>
        <Button
          className='btn bg-slate-100 text-black border border-slate-600'
          onClick={() => {
            beginCreation(false)
          }}
        >
          Cancelar
        </Button>
        <Button className='btn bg-cyan-600 text-white active:ring-2 active:ring-teal-400' disabled={isPost} onClick={() => setIsPost(true)}>
          Crear
        </Button>
      </div>
    </Container>
  )
}
