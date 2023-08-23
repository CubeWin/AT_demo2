import { useState, useEffect} from 'react';

export default (containerRef, size1, size2) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false); //para el texto de descripcion
    const [isSmallScreen2, setIsSmallScreen2] = useState(false); //para los tables

    // Observar el tamaño de la ventana y actualizar el estado de isSmallScreen
    useEffect(() => {
      const handleResize = () => {
        if (containerRef.current) {
          setIsSmallScreen(containerRef.current.offsetWidth < size1);
          setIsSmallScreen2(containerRef.current.offsetWidth < size2);
        }
      };
  
      handleResize(); // Llamar a la función al montar el componente para establecer el valor inicial
  
      // Observar los cambios en el tamaño del contenedor
      const observer = new ResizeObserver(handleResize);
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
  
      return () => {
        observer.disconnect();
      };
    }, []);

    return [isSmallScreen, isSmallScreen2]
}
