import { Link } from 'react-router-dom'

import '../assets/css/cw.css'

import ButtonNavLink from '../components/ButtonNavLink'

export default ({ children }) => {
  return (
    <div className='w-full h-screen relative'>
      <div className='absolute h-screen w-full top-0 left-0 bgg-primary dark:bgg-primary-d -z-30' />
      <div className='absolute h-screen w-full top-0 left-0 -z-20 blur-sm opacity-75 overflow-hidden'>
        <img
          src=""
          alt='Imagen decorativa'
          className='absolute top-5 left-10 w-[450px] h-[450px] dark:opacity-20 dark:shadow-lg'
        />
        <img
          src=""
          alt='Imagen decorativa'
          className='absolute -bottom-10 left-[35%] w-[350px] h-[350px] dark:opacity-20 dark:shadow-lg'
        />
        <img
          src=""
          alt='Imagen decorativa'
          className='absolute top-[50px] -right-[80px] w-[350px] h-[350px] dark:opacity-20 dark:shadow-lg'
        />
      </div>

      <div className='adm-grid'>
        <div className='adm-nav border-r-2 border-teal-900/5 dark:border-teal-200/5'>
          <div className='w-full'>
            <h1 className='py-2 px-3 w-full h-[60px] flex justify-start items-center text-xl font-bold dark:text-slate-300'>
              LIU
            </h1>
          </div>
          <nav className='adm-navbar'>
            <Link to='/admin/dashboard'>
              <ButtonNavLink
                text='DashBoard'
              />
            </Link>
            <Link to='/admin/compra'>
              <ButtonNavLink
                text='Registrar Compra'
              />
            </Link>
            <Link to='/admin/compra/buscar'>
              <ButtonNavLink
                text='Buscar Compra'
              />
            </Link>
            <Link to='/admin/compra/listar'>
              <ButtonNavLink
                text='Listar Compra'
              />
            </Link>
            <Link to='/admin/venta/registrar'>
              <ButtonNavLink
                text='Registrar Venta'
              />
            </Link>
            <Link to='/admin/venta/buscar'>
              <ButtonNavLink
                text='Buscar Venta'
              />
            </Link>
            <Link to='/admin/venta/listar'>
              <ButtonNavLink
                text='Listar Venta'
              />
            </Link>
          </nav>
        </div>

        <div className='adm-header relative  border-b-2 border-teal-900/5 dark:border-teal-200/5'>
          <div className='absolute w-full h-full flex justify-between items-center px-3'>
            <div className='text-teal-600'>Welcome Page</div>
            <div className='text-teal-600 font-bold'>
              <button className="">Button</button>
            </div>
          </div>
        </div>

        <div className='adm-body overflow-auto'>
          <div className='p-3 p-sm-3 p-md-4 p-lg-5 relative min-h-full'>
            {children}
          </div>
          {/* <div className='bg-teal-600 block dark:bg-cyan-900'>
            <div className='text-center text-white py-3 container'>
              <p className='h6'>La práctica hace al maestro.</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
