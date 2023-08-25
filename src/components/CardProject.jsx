// import Box from '@mui/material/Box'
// import Card from '@mui/material/Card'

// import CardContent from '@mui/material/CardContent'
// import Chip from '@mui/material/Chip'
// import Typography from '@mui/material/Typography'
// import { CardActionArea, CardActions } from '@mui/material'
// import { Link } from 'react-router-dom'

// const bull = (
//   <Box component='span' sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
//     •
//   </Box>
// )

// const truncateDescription = (description, maxLength) => {
//   const words = description.split(' ')
//   if (words.length > maxLength) {
//     return words.slice(0, maxLength).join(' ') + '...'
//   }
//   return description
// }

// export default ({ project, handleProjectSelect, isSelected }) => {
//   const { NAME, author, date, DESCRIPTION, tables } = project
//   const maxChips = 3
//   const truncatedDescription = truncateDescription(DESCRIPTION, 30)
//   return (
//     <div>
//       <Card
//         key={NAME}
//         id={`my-card-${NAME}`}
//         style={{ cursor: 'pointer', border: isSelected ? '2px solid #1565C0' : '2px solid transparent' }}
//         onClick={() => handleProjectSelect(project)}
//       >
//         <CardActionArea>
//           <CardContent>
//             <Typography variant='h5' component='div' gutterBottom>
//               {NAME}
//             </Typography>
//             <Typography sx={{ fontSize: 14 }} color='text.secondary'>
//               {author} {bull} {date}
//             </Typography>
//             <Typography variant='h6' component='div'>
//               Descripción
//             </Typography>
//             <Typography variant='body2' sx={{ fontWeight: 'light', fontSize: 13, height: '80px' }} gutterBottom>
//               {truncatedDescription}
//             </Typography>
//             {tables && tables.length > 0 && tables.slice(0, maxChips).map((table) => <Chip key={table} sx={{ mr: 1 }} label={table} />)}
//             {tables && tables.length > maxChips && <Chip sx={{ mr: 1 }} label='...' />}{' '}
//             {/* Agrega un último elemento si hay más elementos que no se muestran */}
//           </CardContent>
//         </CardActionArea>
//       </Card>
//     </div>
//   )
// }
import React, { useRef } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { CardActionArea, CardActions } from '@mui/material'
import Bull from './Bull'
import useSmallScreen from '../hooks/useSmallScreen'
import { truncateDescription } from '../helpers/CardProject'

export default ({ project, handleProjectSelect, isSelected }) => {
  const { ID_PROJECT, NAME, DESCRIPTION, DATE_CREATE, USER_CREATE, TABLES } = project
  const containerRef = useRef(null)
  const [isSmallScreen, isSmallScreen2] = useSmallScreen(containerRef, 355, 300)
  const truncatedDescription = isSmallScreen ? truncateDescription(DESCRIPTION, 15) : truncateDescription(DESCRIPTION, 30)
  const maxChips = isSmallScreen2 ? 2 : 3
  return (
    <div ref={containerRef}>
      <Card
        // key={ID_PROJECT}
        id={`my-card-${ID_PROJECT}`}
        style={{ cursor: 'pointer', border: isSelected ? '2px solid #1565C0' : '2px solid transparent' }}
        onClick={() => handleProjectSelect(project)}
      >
        <CardActionArea>
          <CardContent>
            <Typography variant='h5' component='div' gutterBottom>
              {NAME}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color='text.secondary'>
              {USER_CREATE} <Bull /> {DATE_CREATE}
            </Typography>
            <Typography variant='h6' component='div'>
              Descripción
            </Typography>
            <Typography variant='body2' className='font-light text-12 h-20' gutterBottom>
              {truncatedDescription}
            </Typography>
            {/* {!!TABLES &&
              TABLES.length > 0 &&
              TABLES.split(',')
                .slice(0, maxChips)
                .map((table) => <Chip key={`chip-${table}`} className='mr-1' label={table} />)}
            {TABLES !== null && TABLES.length > maxChips && <Chip className='mr-1' label='...' />} */}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
