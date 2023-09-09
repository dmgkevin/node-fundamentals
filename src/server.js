import http from 'node:http'

import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

// - HTTP => iremos obter estas informações através do "request"

// GET => Buscar recursos do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação especifica de um recurso no back-end
// DELETE => Deletar um recurso ddo back-end

//- Stateless => Não há memória (estado) que é mantido pelo programa.
// - Stateful => O programa tem uma memória (estado).

// Cabeçalhos (requisição/resposta) => Metadados

//HTTP Status code => comunicação entre o front e o back

//Query parameters: URL stateful => Filtros, paginação, não obrigatórios
//Route parameters: Idedntificação de recurso
//Request body: Envio de informações de um formulario (HTTPs)

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
