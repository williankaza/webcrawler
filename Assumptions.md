# [pt-br]

Para este desafio considerei os seguintes pontos:

## Parte 01

Ao realizar a varredura utilizei o `get-hrefs` para me auxiliar na obtenção dos links dentro da página, no dia da entrevista técnica fiquei receoso quanto a proibição de "automated scraping frameworks". Porem entendo que a utilização de uma biblioteca para obtenção dos links não cai nessa proibição. Outro ponto ainda a cerca das URL's foi a diferenciação das URL's com as Ancor's (`https://www.google.com/doodles`, `https://www.google.com/doodles#archive`), como elas podem trazer um significado diferente para a página a ser exibida, optei por considera-las diferentes assim como URL's que contem `Query parameters`.

Outra duvida que tive durante o desenvolvimento foram os [f1...fn] presentes na segunda tabela, inicialmente não entendi o que seriam mas depois de refletir entendia que seriam percentuais que são calculados com base na quantidade de ocorrencias no nivel e o total (quantidade no nivel / total de ocorrências).

## Parte 02

Para a parte da predição pensei em realizar a média entre a existência de ocorrências, ou seja, pensando no seguinte cenário:

Dado os seguintes valores:
    "initialURL": "https://www.google.com/doodles/eiko-ishiokas-79th-birthday",
    "predictURL": "https://www.google.com/doodles/gioachino-rossinis-220th-birthday-leap-year-2012"

Inicialmente vou tentar encontrar a relação entre os dois, se encontrar, significa que a `predictURL` foi encontrada na `initialURL` e retorno ela.
Caso não tenha encontrado, eu busco todas as ocorrências de `predictURL` como `destination`, filtrando as ocorrências pela `initialURL` até o ultima `/`, ou seja `https://www.google.com/doodles/`. Se encontrar, realizo a soma de todas as ocorrências e divido pelo numero de origens que contem esse relacionamento. Caso não encontre, vou reduzindo a `initialURL` até ser uma URL válida.
Caso ainda assim ela não encontre, realizo a extração de `initialURL` buscando pela `predictURL`, se encontro retorno de imediato o resultado da extração, caso contrário retorno zerada a quantidade de ocorrências.

E para os entregáveis fiquei em duvida sobre o Dockerfiles, se deveria ter feito somente até o Dockerfile, mas acabei por criar o DockerCompose para subir ambos os containeres (aplicação e banco de dados), fiquei na duvida pois não tenho muita pratica com Docker.
----

# [en-us]

For this challenge I considered the following points:

## Part 01

When performing the scan I used `get-hrefs` to help me get the links inside the page, on the day of the technical interview I was worried about the prohibition of "automated scraping frameworks". However, I understand that the use of a library to obtain links does not fall under this prohibition. Another point about URL's was the differentiation of URL's from Ancor's (`https://www.google.com/doodles`, `https://www.google.com/doodles#archive`), as they can bring a different meaning to the page to be displayed, I chose to consider them different as well as URL's that contain `Query parameters`.

Another doubt I had during development was the [f1...fn] present in the second table, initially I didn't understand what they would be, but after reflecting, I understood that they would be percentages that are calculated based on the number of occurrences at the level and the total ( amount in the level / total occurrences).

## Part 02

For the prediction part, I thought about performing the average between the existence of occurrences, that is, thinking about the following scenario:

Given the following values:
    "initialURL": "https://www.google.com/doodles/eiko-ishiokas-79th-birthday",
    "predictURL": "https://www.google.com/doodles/gioachino-rossinis-220th-birthday-leap-year-2012"

Initially I'll try to find the relationship between the two, if I do, it means the `predictURL` was found in the `initialURL` and I return it.
If not, I look for all occurrences of `predictURL` as `destination`, filtering the occurrences by `initialURL` to the last `/`, ie `https://www.google.com/doodles/`. If found, I sum all occurrences and divide by the number of sources that contain this relationship. If I don't find it, I'll reduce the `initialURL` until it's a valid URL.
If it still doesn't find it, I perform the extraction of `initialURL` looking for the `predictURL`, if I find the result of the extraction immediately returned, otherwise the number of occurrences returns zero.

And for the deliverables I was in doubt about the Dockerfiles, if I should have done only up to the Dockerfile, but I ended up creating the DockerCompose to upload both containers (application and database), I was in doubt because I don't have much practice with Docker.