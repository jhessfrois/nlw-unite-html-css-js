let participantes = [
  {
    nome: "Jhessica Frois",
    email: "jhessicafrois@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0),
  },
  {
    nome: "João Silva",
    email: "joaosilva@example.com",
    dataInscricao: new Date(2024, 2, 23, 10, 30),
    dataCheckIn: null,
  },
  {
    nome: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    dataInscricao: new Date(2024, 2, 24, 14, 0),
    dataCheckIn: new Date(2024, 2, 27, 16, 20),
  },
  {
    nome: "Pedro Santos",
    email: "pedrosantos@example.com",
    dataInscricao: new Date(2024, 2, 25, 16, 45),
    dataCheckIn: new Date(2024, 2, 28, 11, 10),
  },
  {
    nome: "Ana Souza",
    email: "anasouza@example.com",
    dataInscricao: new Date(2024, 2, 26, 8, 15),
    dataCheckIn: null,
  },
  {
    nome: "Carlos Ferreira",
    email: "carlosferreira@example.com",
    dataInscricao: new Date(2024, 2, 27, 13, 40),
    dataCheckIn: new Date(2024, 3, 1, 12, 5),
  },
  {
    nome: "Mariana Costa",
    email: "marianacosta@example.com",
    dataInscricao: new Date(2024, 2, 28, 11, 55),
    dataCheckIn: new Date(2024, 3, 2, 14, 25),
  },
  {
    nome: "Felipe Pereira",
    email: "felipepereira@example.com",
    dataInscricao: new Date(2024, 2, 29, 17, 20),
    dataCheckIn: new Date(2024, 3, 3, 8, 50),
  },
  {
    nome: "Patrícia Lima",
    email: "patricialima@example.com",
    dataInscricao: new Date(2024, 2, 30, 20, 5),
    dataCheckIn: new Date(2024, 3, 4, 17, 15),
  },
  {
    nome: "Ricardo Almeida",
    email: "ricardoalmeida@example.com",
    dataInscricao: new Date(2024, 2, 31, 9, 30),
    dataCheckIn: new Date(2024, 3, 5, 10, 40),
  },
]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
        <br>
        <small>
          ${participante.email}
        </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document.querySelector("tbody").innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null,
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if (participanteExiste) {
    alert("E-mail já cadastrado!")
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?"
  if (confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}
