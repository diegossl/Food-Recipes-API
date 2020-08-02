# Searcher for the most popular TV series

Search and collect data from the most popular series currently available on the AdoroCinema website.

## Setup

To execute the project, it will be necessary to install as dependencies by typing the following command in the terminal:

```bash
yarn install
```

Then, create a file called **.env** and copy to the contents of the file **.env.exemple**, which already exists in the project and enter your credentials.

Credentials can be obtained from the following website:

[https://www.mongodb.com](https://www.mongodb.com)


Finally, type the following command in the terminal to start the server:

```bash
yarn dev
```

### Use

The system is ready to be used on the route:

[http://localhost:3000/series](http://localhost:3000/series)

## Example of data entry:

```bash
GET /series
```

## Example output:

An array of JSON objects containing features from the TV series.
 
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

## License

MIT
