export function success (req, res, message = '', status = 200) {
  res.status(status).send({
    error: false,
    status,
    body: message
  })
}

export function notContent (req, res, message = 'No hay Contenido', status = 204) {
  res.status(status).send({
    error: false,
    status,
    body: message
  })
}

export function error (req, res, message = 'Error Interno', status = 500) {
  res.status(status).send({
    error: true,
    status,
    body: message
  })
}

export function notFound (req, res, message = 'Not Found', status = 404) {
  res.status(status).send({
    error: true,
    status,
    body: message
  })
}
