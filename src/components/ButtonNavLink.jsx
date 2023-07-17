
const ButtonNavLink = ({ children, active = false, icon, text }) => {
  return (
    <div className='relative h-[40px] mx-3 my-2 py-1 px-3 rounded-xl flex items-center cursor-pointer btnlink-hover overflow-hidden'>
      <div className='under-on-relative btnlink-bg-color dark:btnlinkdark-bg-color' />
      {/* <div className='under-on-relative btnlink-bg-blur'>
        <img
          src=""
          alt='image'
          className='absolute -top-[35px] left-[30px] w-[65px] h-[65px] opacity-60'
        />
        <img
          src=""
          alt='image'
          className='absolute -bottom-[30px] -right-[10px] w-[65px] h-[65px] opacity-50'
        />
      </div> */}
      <div className='w-100 flex justify-between items-center btnlink-text dark:text-slate-300 '>
        {icon && icon}
        <p className='font-medium text-sm'>{text}</p>
      </div>
    </div>
  )
}

export default ButtonNavLink
