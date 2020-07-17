# Buscador de séries de TV mais populares

Busca as séries mais populares do site AdoroCinema.

## Setup

Para executar o projeto, será necessário instalar as dependências digitando o seguinte comando no terminal:

```bash
npm install
```

Em seguida, crie um arquivo chamado **.env** e copie para ele o conteúdo do arquivo **.env.exemple**, que já existe no projeto, e coloque suas credenciais. Então digite o seguinte comando no terminal:

Por fim, digite o seguinte comando no terminal para iniciar o servidor:

```bash
npm dev
```

### Uso

O sistema está pronto para ser usado na rota:

[http://localhost:3000/series](http://localhost:3000/series)

## Exemplo de saída de dados:

Um array de objetos JSON contendo caracteristicas da série de TV.
 
```javascript
[
  {
    "title": "This Is Us",
    "genres": [
      "Drama"
    ],
    "direction": [
      "Dan Fogelman"
    ],
    "cast": [
      "Milo Ventimiglia",
      "Mandy Moore",
      "Sterling K. Brown"
    ],
    "nationality": "EUA",
    "originalChannel": "NBC",
    "synopsis": "A série é uma crônica da relação de um grupo de pessoas que nasceram no mesmo dia, incluindo Rebecca (Mandy Moore), Jack (Milo Ventimiglia), um casal esperando trigêmeos em Pittsburgh e Kevin (Justin Hartley), um belo ator de televisão que está se cansando da vida de solteirão cobiçado."
  }
]
```

## Licença

MIT