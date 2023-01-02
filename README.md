# 🏡 Realty Zone 

## 📋 Spis treści
1. Wprowadzenie
2. Użyte technologie
3. [Instalacja projektu](#3-instalacja-projektu)
4. [Docker - uruchomienie aplikacji](#4-docker---uruchomienie-aplikacji)
5. Pozostałe:
   1. [Licencja](#licencja)
   2. [Kontakt](#kontakt)



## 1. Wprowadzenie

## 2. Technologie

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)


![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

## 3. Instalacja projektu

### I. Klonowanie z GitHub 
1. Otwórz terminal i sklonuj repozytoria, wykonując poniższe polecenia:
    ```bash  
   $ git clone https://github.com/Przekol/realty-zone-backend.git
   $ git clone https://github.com/Przekol/realty-zone-frontend.git
    ``` 
2. Przejdź do katalogu `realty-zone-backend`:
    ```bash 
   $ cd realty-zone-backend
    ```
3. Stwórz pliki `.env` oraz `docker.env` w katalogu `realty-zone-backend` i ustaw swoje zmienne środowiskowe na podstawie pliku `.env.example` i `docker.env`.

### II. Uruchomienie bazy danych PostgreSQL
##### _1. Instalacja bazy danych na komputerze_:
   1. Pobierz i zainstaluj najnowszą wersję bazy danych PostgreSQL ze strony https://www.postgresql.org/download/.
   2. Po zakończeniu instalacji otwórz program `pgAdmin`.
   3. W programie `pgAdmin` kliknij prawym przyciskiem myszy na pozycję `Servers` i wybierz opcję `Create` > `Server...`.
   4. W oknie `Create - Server` wprowadź nazwę serwera (np. "realty-zone-db") i kliknij przycisk `Connect`.
   5. Jeśli połączenie zostanie nawiązane pomyślnie, baza danych PostgreSQL zostanie uruchomiona i będzie dostępna do użytku.
##### _2. Uruchomienie bazy danych w kontenerze Docker_:
   1. Upewnij się, że masz zainstalowany Docker na swoim komputerze. Jeśli go jeszcze nie masz, możesz go pobrać ze strony https://www.docker.com/.
   2. Otwórz terminal i przejdź do katalogu `realty-zone-backend`, w którym znajduje się plik `db-docker-compose.yml`.
   3. Aby utworzyć kontener, wykonaj jedno z poleceń:
   ```bash
    # Utworzenie i uruchomienie w kontenerze o nazwie "database" w terminalu
    $ docker compose -f db-docker-compose.yml -p database up 
   ```
   ```bash 
   # Utworzenie i uruchomienie w kontenerze o nazwie "database" w tle
   $ docker compose -f db-docker-compose.yml -p database up -d
  ```
  Kontener zostanie automatycznie uruchomiony po jego utworzeniu.

### III. Uruchomienie aplikacji
1. Otwórz terminal, przejdź do katalogu `realty-zone-backend` i zainstaluj zależności, wykonując polecenie:
    ```bash 
   $ npm install
    ```
2. Uruchom aplikacje backendową:
    ```bash 
   $ npm start
    ```
3. Następnie otwórz terminal w katalogu `realty-zone-frontend` i zainstaluj zależności, wykonując polecenie:
    ```bash 
   $ npm install
    ```
4. Uruchom aplikację frontendową:
    ```bash 
   $ npm run dev
    ```
- serwer backendowy zostanie uruchomiony pod adresem: http://localhost:3001
- serwer frontendowy zostanie uruchomiony pod adresem: http://localhost:3000
- swagger zostanie uruchomiony pod adresem: http://localhost:3001/api
   


## 4. Docker - uruchomienie aplikacji

1. Upewnij się, że masz zainstalowanego Docker na swoim komputerze. Jeśli go jeszcze nie masz, możesz go pobrać ze strony https://www.docker.com/.
2. Wykonaj polecenia z części [I. Klonowanie z GitHub](#i-klonowanie-z-github)
3. Otwórz terminal i przejdź do katalogu `realty-zone-backend`, w którym znajduje się plik `docker-compose.yml`. 
4. Aby utworzyć kontener, wykonaj jedno z poleceń:
    ```bash
    # Utworzenie i uruchomienie kontenera o nazwie "realty-zone" w terminalu
    docker compose -p realty-zone up
   ```
   ```bash
   # Utworzenie i uruchomienie kontenera w tle
   docker compose -p realty-zone up -d
    ```

    Kontener zostanie automatycznie uruchomiony po jego utworzeniu.

5. Inne polecenia przydatne w dalszej pracy z kontenerem:
     ```bash
     # Wyłączenie kontenera (bez usunięcia go z pamięci)
     docker compose -p realty-zone stop
    ```
    ```bash
    # Uruchomienie kontenera (już po wcześniejszym utworzeniu)
    docker compose -p realty-zone start
     ```
   ```bash
    # Usunięcie kontenera z pamięci
    docker compose -p realty-zone down
     ```

## 5. Pozostałe

### Licencja

[MIT](https://choosealicense.com/licenses/mit/)


### Kontakt
E-mail: [Przemysław Wojciechowski](mailto:przemyslaw.r.wojciechowski@gmail.com)
#### 🌐 Socials:
[![GitHub](https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white)](https://github.com/przekol)
[![Twitter](https://img.shields.io/badge/twitter-%2300acee.svg?&style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/przemyslaw_woj) [![LinkedIn](https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/przemyslaw-wojciechowski/) [![Facebook](https://img.shields.io/badge/facebook-%232E87FB.svg?&style=for-the-badge&logo=facebook&logoColor=white)](https://facebook.com/przemek.wojciechowski.184/)