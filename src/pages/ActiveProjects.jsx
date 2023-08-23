import { useEffect, useState } from 'react'
import CardProject from '../components/CardProject'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import '../assets/css/scroll.css'
import { getProjectList } from '../services/ApiProject'
import useActiveProjectsGet from '../hooks/useActiveProjectsGet'

// export default () => {
//   //El const projects es un ejemplo para mostrar los proyectos
//   // const projects = [
//   //   {
//   //     name: 'Proyecto01',
//   //     author: 'frank',
//   //     date: '20/07/2023',
//   //     description:
//   //       'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
//   //     tables: ['table1', 'table2', 'table3', 'table4', 'table5', 'table6', 'table7', 'table8', 'table9']
//   //   },
//   //   {
//   //     name: 'Proyecto02',
//   //     author: 'maria',
//   //     date: '25/07/2023',
//   //     description: 'ipsum ipsum ipsum ipsum ipsum ipsum',
//   //     tables: ['table4', 'table5']
//   //   },
//   //   {
//   //     name: 'Proyecto03',
//   //     author: 'juan',
//   //     date: '30/07/2023',
//   //     description: 'dolor dolor dolor dolor dolor dolor',
//   //     tables: ['table6', 'table7', 'table8']
//   //   },
//   //   {
//   //     name: 'Proyecto04',
//   //     author: 'ana',
//   //     date: '05/08/2023',
//   //     description: 'sit amet sit amet sit amet sit amet sit amet sit amet sit amet',
//   //     tables: ['table1', 'table3', 'table5']
//   //   },
//   //   {
//   //     name: 'Proyecto05',
//   //     author: 'pablo',
//   //     date: '10/08/2023',
//   //     description: 'consectetur consectetur consectetur consectetur',
//   //     tables: ['table2', 'table4', 'table6', 'table8']
//   //   },
//   //   {
//   //     name: 'Proyecto06',
//   //     description: 'adipiscing adipiscing adipiscing adipiscing adipiscing'
//   //   },
//   //   {
//   //     name: 'Proyecto07',
//   //     description: 'elit elit elit elit elit elit elit elit'
//   //   },
//   //   {
//   //     name: 'Proyecto08',
//   //     description: 'sed sed sed sed sed sed sed sed sed'
//   //   }
//   // ]

//   const [selectedProject, setSelectedProject] = useState(null)
//   const [projects, setProjects] = useState([])

//   useEffect(() => {
//     const getProject = async () => {
//       const getProy = await getProjectList()
//       setProjects(getProy)
//     }
//     getProject()
//   }, [])

//   const handleProjectSelect = (project) => {
//     setSelectedProject(project) // Actualiza el estado con el proyecto seleccionado
//   }
//   return (
//     <div>
//       <Box
//         sx={{
//           width: '100%',
//           height: '100vh',
//           pt: '1%',
//           pb: '1%',
//           pl: '10%',
//           pr: '10%',
//           bgcolor: '#ffffff'
//         }}
//       >
//         <Typography variant='h4' color='text.secondary' gutterBottom>
//           Proyectos activos
//         </Typography>
//         <br />
//         <Box
//           sx={{
//             width: '100%',
//             height: '76vh',
//             pt: '1%',
//             pb: '1%'
//           }}
//         >
//           <div className='my-content'>
//             <Grid container spacing={3}>
//               {projects.length > 0 &&
//                 projects.map((project) => (
//                   <Grid key={project.ID_PROJECT} item xs={12} sm={6} md={4}>
//                     <CardProject
//                       project={project}
//                       handleProjectSelect={handleProjectSelect}
//                       isSelected={selectedProject && selectedProject.ID_PROJECT === project.ID_PROJECT}
//                     />
//                   </Grid>
//                 ))}
//             </Grid>
//           </div>
//         </Box>
//         <br />
//         <Box
//           sx={{
//             textAlign: 'right'
//           }}
//         >
//           <Link to={selectedProject ? `/AT_demo2/workbook/${selectedProject.ID_PROJECT}` : ''}>
//             <Button variant='contained'>Continuar</Button>
//           </Link>
//         </Box>
//       </Box>
//     </div>
//   )
// }
// import useActiveProjectsGet from "../hooks/useActiveProjectsGet";

export default () => {
  //El const projects es un ejemplo para mostrar los proyectos
  const [selectedProject, setSelectedProject] = useState(null)
  const handleProjectSelect = (project) => {
    setSelectedProject(project)
  }

  const [isLoading, projects] = useActiveProjectsGet()
  if (isLoading) return <i>...Loading</i>

  return (
    <div>
      <Box className='w-full h-full pt-[1%] pb-[1%] pl-[5%] pr-[5%] bg-white'>
        <Typography variant='h4' color='text.secondary' gutterBottom>
          Proyectos activos
        </Typography>
        <Box className='w-full h-[75vh] pt-[1%] pb-[1%]'>
          <div className='my-content'>
            <Grid container spacing={3}>
              {projects.length > 0 &&
                projects.map((project) => (
                  <Grid key={project.NAME} item xs={12} sm={6} md={4}>
                    <CardProject
                      project={project}
                      handleProjectSelect={handleProjectSelect}
                      isSelected={selectedProject && selectedProject.NAME === project.NAME}
                    />
                  </Grid>
                ))}
            </Grid>
          </div>
        </Box>
        <Box className='text-right pt-2.5'>
          <Link to={selectedProject ? `/AT_demo2/workbook/${selectedProject.ID_PROJECT}` : ''}>
            <Button variant='contained'>Continuar</Button>
          </Link>
        </Box>
      </Box>
    </div>
  )
}
