// Función para formatear una fecha en formato 'YYYY-MM-DD HH:MM:SS'

export function formatDate (date) {
  const fecha = date

  // Obtener los componentes de fecha y hora
  const año = fecha.getFullYear()
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0') // Sumar 1 al mes porque los meses comienzan desde 0
  const dia = fecha.getDate().toString().padStart(2, '0')
  const horas = fecha.getHours().toString().padStart(2, '0')
  const minutos = fecha.getMinutes().toString().padStart(2, '0')
  const segundos = fecha.getSeconds().toString().padStart(2, '0')

  // Crear la cadena de fecha en el nuevo formato
  const fechaFormateada = año + '-' + mes + '-' + dia + ' ' + horas + ':' + minutos + ':' + segundos

  return fechaFormateada
}
