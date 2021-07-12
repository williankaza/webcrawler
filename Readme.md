# WebCrawler

[pt-br] Projeto desenvolvido com Node.js, banco de dados Postgres e TypeORM. 

[en-us] Project developed with Node.js, Postgres database and TypeORM


## Introdução | Introduction
----
[pt-br] O principal objetivo deste projeto é através de uma URL de origem conseguir extrair todas as urls de referência, navegando por elas até o nivel informado na requisição. 

[en-us] The main objective for this project is through an origin URL, extract all URLs, browse through them until the level informed in the request

## API

### POST- /appearences/
---

Body example:
```json
{
    "url": "https://www.google.com/doodles",
    "level": 2
}
```

#### [pt-br]
----
A requisição é responsável por realizar todo o processo de extração e navegação do projeto, sendo o unico método que realiza alguma persistência no banco. Para esta requisição é necessário que seja passada a `url` inicial e o `level` que deseja extrair as informações. 

A cada URL encontrada no HTML da pagina o sistema irá continuar a buscar os dados e varrer a proxima página, sendo limitado ao valor informado no `level` ou a disponibilidade da páginas. Caso alguma página retorne um timeout ou qualquer outra exceção o sistema irá pular e voltar ao nivel superior

Ao término do processamento o resultado será gravado no banco e retornará para o client todas as URL's encontradas, a quantidade de vezes encontrada, e quantas vezes apareceu por nível, calculando também o percentual por nível com base no total de ocorrencias.

Caso a extração já tenha sido realizada anteriormente o sistema irá retornar o registro do banco de dados inves de realizar o processo novamente

#### [en-us]
----
The request is responsible for carrying out the entire extraction and navigation process of the project, being the only method that performs any persistence in the database. For this request it is necessary to pass the initial `url` and the `level` that you want to extract the information.

For each URL found in the page's HTML, the system will continue to fetch the data and scan the next page, being limited to the value informed in the `level` or the availability of the pages. If any page returns a timeout or any other exception, the system will jump and go back to the upper level

At the end of processing, the result will be recorded in the database and will return to the client all the URL's found, the number of times found, how many times it appeared per level, also calculating the percentage per level based on the total number of occurrences

If the extraction has already been performed previously, the system will return the database record instead of performing the process again
#### Response
----
```json
[
    {
        "url": "https://www.google.com/doodles",
        "level": 2,
        "appearences": [
            {
                "url": "https://www.google.com/doodles",
                "totalApperences": 13,
                "levels": [
                    {
                        "level": 1,
                        "quantity": 1,
                        "percentage": 0.07692307692307693
                    },
                    {
                        "level": 2,
                        "quantity": 12,
                        "percentage": 0.9230769230769231
                    }
                ]
            },
            {
                "url": "https://www.google.com/doodles#archive",
                "totalApperences": 13,
                "levels": [
                    {
                        "level": 2,
                        "quantity": 12,
                        "percentage": 0.9230769230769231
                    },
                    {
                        "level": 1,
                        "quantity": 1,
                        "percentage": 0.07692307692307693
                    }
                ]
            },
        ]
    }
]
```
----

### POST - appearences/find
---

Body example:
```json
{
    "url": "https://www.google.com/doodles",
    "level": 2
}
```

#### [pt-br]
----
Este método é responsável por realizar consulta no banco de extrações anteriores. Caso não encontre o registro com a exata `url` e `level`, irá retornar vazio. Se o sistema identificar que houve uma extração anterior, irá retornar todos os registros conforme o retorno da requisição `POST-/appearences/`.

#### [en-us]
----
This method is responsible for querying the database of previous extractions. If it doesn't find the exact `url` with the exact `level`, it will return empty. If the system identifies that there was a previous extraction, it will return all records as returned by the `POST-/appearences/` request.
#### Response
```json
[
    {
        "url": "https://www.google.com/doodles",
        "level": 2,
        "appearences": [
            {
                "url": "https://www.google.com/doodles",
                "totalApperences": 13,
                "levels": [
                    {
                        "level": 1,
                        "quantity": 1,
                        "percentage": 0.07692307692307693
                    },
                ]
            }
        ]
    }
]                    
```
---

### POST - /appearences/predictions
---

Body example:
```json
{
    "initialURL": "https://www.google.com/doodles/uefa-euro-2020-winner-italy",
    "predictURL": "https://www.google.com/doodles/halloween-2016"
}
```

#### [pt-br]
----
Este método é responsável por realizar a predição de ocorrências que uma url (`predictURL`) possa ter em determinada página (`initialURL`). A varredura é realizada com base nas extrações realizadas a partir do endpoint `POST-/appearences/`. 

Caso as ocorrências já tenham sido calculadas, o sistema irá retornar a quantidade de resultados e o tipo será `calculated`. 

Caso não encontre, será feita uma varredura nas ocorrências da URL desejada (`predictURL`) em páginas que contenham partes da `initialURL`, reduzindo a URL inicial até encontrar alguma ocorrência. Caso encontre a URL durante essa varredura, irá realizar um calculo que será retornado e o tipo será `predictedByDestination`

Caso não ainda assim não encontre, o sistema irá realizar uma busca na URL inicial `initialURL` e caso encontre ocorrências da URL preditada (`predictURL`) irá contabilizar as ocorrências e retornar o tipo como `extracted`.

#### [en-us]
----
This method is responsible for predicting occurrences that a url (`predictURL`) may have on a given page (`initialURL`). The scan is performed based on extracts performed from the `POST-/appearences/` endpoint.

If the occurrences have already been calculated, the system will return the number of occurrences and the type will be `calculated`.

If not, it will scan occurrences of the desired URL (`predictURL`) on pages that contain parts of the `initialURL`, shortening the initial URL until it finds some occurrence. If it finds the URL during this scan, it will perform a calculation that will be returned and the type will be `predictedByDestination`

If it still doesn't find it, the system will perform a search on the initial URL `initialURL` and if it finds occurrences of the predicted URL (`predictURL`) it will count the occurrences and return the type as `extracted`.

#### Response
```json
{
    "quantity": 0,
    "type": ["calculated","extracted","error","predictedByDestination"]
}
```
----
### GET - /appearences/relations
----
#### [pt-br]
----
Este método é utilizado para retornar todas as relações entre as urls encontradas durante a extração

#### [en-us]
----

#### Response 
```json
{
    "response": [
        {
            "id": "ee9bb83c-2968-4a9e-884a-ff8bd20915c6",
            "origin": "https://www.google.com/doodles",
            "destination": "https://www.google.com/doodles/40th-anniversary-of-the-national-monument-of-indonesia",
            "quantity": 1
        },
    ]
}
```
----
## Database

[pt-br]

O banco escolhido foi o Postgres. Foram criadas duas entidades, `appearences` e `url_relations`. `appearences` é responsável por guardar as extrações realizadas para diminuir o tempo de resposta em requisições reincidentes. `url_relations` é gravada durante a extração e armazena a quantidade de ocorrências entre duas URL's.

[en-us]

The chosen database is Postgres. Two entities were created, `appearences` and `url_relations`. `appearences` is responsible for saving the performed extractions to decrease the response time in repeated requests. `url_relations` is written during extraction and stores the number of hits between two URL's.

## Enviroment

[pt-br]

Use o comando `docker-compose up`. Para utilizar a API ela está disponivel na porta `8080` enquanto o banco está na porta `11543`.

[en-us]

Use the `docker-compose up` command. To use the API it is available on port `8080` while the database is on port `11543`.