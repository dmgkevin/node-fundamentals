export async function json(req, res) {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  res.setHeader('Content-type', 'application/json')
}

//middlewares => interceptador
/*Dentro do node, um middlewares é uma funcao que vai interceptar nossa requisicao. Middlewares sempre vao receber como parametro req e res*/ 
