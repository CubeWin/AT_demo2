import React, { useRef, useState } from 'react'
import { API_BASE_URL } from '../constants/dataConfig'

const FileUploadView = () => {
  const fileInputRef = useRef(null)
  const [invoiceData, setInvoiceData] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [showModal, setShowModal] = useState(false) // Estado para controlar la visibilidad de la ventana flotante

  const handleFileChange = async (event) => {
    const file = event.target.files[0]

    if (file) {
      const fileContent = await file.text()
      const parser = new DOMParser()
      const xmlDOM = parser.parseFromString(fileContent, 'text/xml')

      // Definir los espacios de nombres utilizados en el XML con sus prefijos
      const namespaces = {
        cbc: 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
        cac: 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2'
      }

      // Obtener los valores necesarios del objeto DOM con sus prefijos
      const invoiceId = xmlDOM.getElementsByTagNameNS(namespaces.cbc, 'ID')[0]?.textContent
      const streetName = xmlDOM.getElementsByTagNameNS(namespaces.cbc, 'StreetName')[0]?.textContent
      const issueDate = xmlDOM.getElementsByTagNameNS(namespaces.cbc, 'IssueDate')[0]?.textContent
      const dataRuc = xmlDOM.getElementsByTagNameNS(namespaces.cbc, 'CustomerAssignedAccountID')[0]?.textContent
      const companyaRuc = xmlDOM.getElementsByTagNameNS(namespaces.cbc, 'CustomerAssignedAccountID')[1]?.textContent
      const payableAmount = xmlDOM.getElementsByTagNameNS(namespaces.cbc, 'PayableAmount')[0]?.textContent
      const customerName = xmlDOM.getElementsByTagNameNS(namespaces.cac, 'PartyName')[1]?.textContent
      const customerPhone = xmlDOM.getElementsByTagNameNS(namespaces.cbc, 'Telephone')[0]?.textContent
      const companyName = xmlDOM.getElementsByTagNameNS(namespaces.cac, 'PartyName')[2]?.textContent
      const streetCompanyName = xmlDOM.getElementsByTagNameNS(namespaces.cbc, 'StreetName')[1]?.textContent
      const payName = xmlDOM.getElementsByTagNameNS(namespaces.cbc, 'PaymentMeansID')[0]?.textContent
      const itemDescription = xmlDOM.getElementsByTagNameNS(namespaces.cbc, 'StreetName')[1]?.textContent
      const payCompany = xmlDOM.getElementsByTagNameNS(namespaces.cbc, 'Note')[0]?.textContent
      const descripcionPay = xmlDOM.getElementsByTagNameNS(namespaces.cbc, 'Description')[0]?.textContent
      const emisionFecha = xmlDOM.getElementsByTagNameNS(namespaces.cbc, 'IssueDate')[0]?.textContent
      const totalPay = xmlDOM.getElementsByTagNameNS(namespaces.cbc, 'PayableAmount')[0]?.textContent
      const totalNetoPay = xmlDOM.getElementsByTagNameNS(namespaces.cbc, 'TaxableAmount')[0]?.textContent
      const percent = xmlDOM.getElementsByTagNameNS(namespaces.cbc, 'Percent')[0]?.textContent

      // Actualizar el estado con los datos obtenidos
      setInvoiceData({
        percent,
        totalNetoPay,
        totalPay,
        emisionFecha,
        customerPhone,
        descripcionPay,
        payCompany,
        payName,
        streetCompanyName,
        companyaRuc,
        companyName,
        streetName,
        dataRuc,
        invoiceId,
        issueDate,
        payableAmount,
        customerName,
        itemDescription
      })
      setSelectedFile(file)
    }
  }

  const handleCreateClick = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleSaveJsonClick = async () => {
    const jsonToSave = formatInvoiceData(invoiceData)

    let res = await fetch(`${API_BASE_URL}/receipt/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonToSave)
    })

    let data = await res.json()
    console.log(data)
  }

  const formatInvoiceData = (data) => {
    const formattedData = {}
    for (const key in data) {
      if (typeof data[key] === 'string') {
        formattedData[key] = data[key].replace(/[\n\t]/g, '').trim()
      } else {
        formattedData[key] = data[key]
      }
    }
    return formattedData
  }

  return (
    <div className='bg-white pr-44 pl-44 min-h-screen'>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-3'>
          <h1 className='text-gray-400 text-3xl mt-7'>Cargar Archivo XML</h1>
        </div>

        <div className='col-span-3 flex relative'>
          <label className='absolute top-0 left-0 text-[10px] text-gray-600'>Archivo RH</label>
          <span id='file-chosen' className='flex-grow block font-sans text-[13px] bg-gray-100 px-2 py-1 border-b-2 border-gray-300 pt-5'>
            {/* En caso no se seleccione un archivo aparecera en el input el mensaje 'Seleccionar Archivo' caso contrario se pondra el nombre del archivo */}
            {selectedFile ? selectedFile.name : 'Seleccionar Archivo'}
          </span>
          <input type='file' ref={fileInputRef} className='hidden' onChange={handleFileChange} id='file-input' />
          <button
            onClick={() => fileInputRef.current.click()}
            className='bg-blue-600 text-white text-xs px-6 py-3 font-sans rounded-md cursor-pointer ml-4'
          >
            BUSCAR ARCHIVO
          </button>
        </div>

        <div className='col-span-3 mt-7 space-y-2 h-auto'>
          {invoiceData && (
            //Estructura de la boleta que aparecera una vez que se seleccione un archivo
            <div className='col-span-3 mt-7 space-y-2'>
              <div className='grid grid-cols-3 gap-9'>
                <div className='col-start-1'>
                  <p className='font-bold'> {invoiceData.customerName} </p>
                  <p> {invoiceData.streetName} </p>
                  <p>
                    <strong>Telefono:</strong> {invoiceData.customerPhone}{' '}
                  </p>
                </div>
                <div className='col-end-4 text-center border border-gray-400 p-4 text-[13px]'>
                  <p>R.U.C. {invoiceData.dataRuc}</p>
                  <p>RECIBO POR HONORARIOS ELECTRONICOS</p>
                  <p>Nro {invoiceData.invoiceId}</p>
                </div>
                <div className='col-start-1 col-span-3'>
                  <p>
                    <strong>Recibi de:</strong> {invoiceData.companyName}{' '}
                  </p>
                  <p>
                    <strong>Identificado con</strong> RUC <strong>numero</strong> {invoiceData.companyaRuc}{' '}
                  </p>
                  <p>
                    <strong>Domiciliado en </strong> {invoiceData.streetCompanyName}{' '}
                  </p>
                  <p>
                    <strong>Forma de Pago:</strong> {invoiceData.payName}{' '}
                  </p>
                  <p>
                    <strong>La suma de:</strong> {invoiceData.payCompany}{' '}
                  </p>
                  <p>
                    <strong>Por concepto:</strong> {invoiceData.descripcionPay}{' '}
                  </p>
                  <p>
                    <strong>Observacion:</strong> {}{' '}
                  </p>
                  <p>
                    <strong>Inciso</strong> "A" <strong>DEL ARTICULO 33 DE LA LEY DEL IMPUESTO DE LA RENTA</strong>
                  </p>
                  <p>
                    <strong>Fecha de emision:</strong> {invoiceData.emisionFecha}{' '}
                  </p>
                </div>
                <div className='col-start-2 text-center'>
                  <p>
                    <strong>Total del Honorario: {invoiceData.totalPay} </strong>
                  </p>
                  <p>
                    <strong>Retencion ({invoiceData.percent}%) IR: 0.00</strong>
                  </p>
                  <p>
                    <strong>Total Neto Recibido:</strong> {invoiceData.totalNetoPay} SOLES
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='col-span-3 text-right pb-20 relative'>
          <button onClick={handleCreateClick} className='bg-blue-600 text-white text-xs px-6 py-3 font-sans rounded-md justify-end'>
            CREAR
          </button>
        </div>

        {showModal && (
          <div className='fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50'>
            <div className='bg-white p-6 rounded-md'>
              <h2 className='text-lg font-bold mb-4'>Contenido del XML en JSON:</h2>
              <pre>
                <code>{JSON.stringify(formatInvoiceData(invoiceData), null, 2)}</code>
              </pre>

              <button onClick={handleSaveJsonClick} className='bg-blue-600 text-white text-xs px-6 py-3 font-sans rounded-md mt-4'>
                Guardar JSON
              </button>

              <button onClick={handleCloseModal} className='bg-blue-600 text-white text-xs px-6 py-3 font-sans rounded-md mt-4'>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileUploadView
