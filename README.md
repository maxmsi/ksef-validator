# 🛡️ KSeF Validator AI

[![Java](https://img.shields.io/badge/Java-21-orange?style=flat&logo=openjdk)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-green?style=flat&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ed?style=flat&logo=docker)](https://www.docker.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql)](https://www.postgresql.org/)

> **Inteligentna "bramka bezpieczeństwa" dla Twoich faktur przed wysyłką do Ministerstwa Finansów.**

![Dashboard Preview](assets/screenshot.png)
*(Tutaj wstaw zrzut ekranu aplikacji)*

## 🚀 O Projekcie

Wprowadzenie KSeF (Krajowego Systemu e-Faktur) zmienia zasady gry: wysłanej faktury nie da się cofnąć ani poprawić bez wystawiania korekty. Błędy merytoryczne mogą skutkować karami ze strony Urzędu Skarbowego.

**KSeF Validator AI** to rozwiązanie typu "Pre-Flight Check". Aplikacja analizuje pliki XML pod kątem:
1.  **Technicznym:** Walidacja zgodności ze schemą XSD (FA 2 / FA 3).
2.  **Merytorycznym:** Wykorzystanie AI (LLM) do wykrywania anomalii biznesowych, których nie widzą zwykłe systemy ERP (np. brak kodu GTU dla części samochodowych, błędne stawki VAT, brak oznaczenia MPP).

## ⚡ Główne Funkcjonalności

* ✅ **Walidacja XSD:** Natychmiastowe sprawdzanie poprawności struktury XML (Java Validator).
* 🧠 **Audytor AI:** Analiza semantyczna treści faktury (OpenAI / Mock) wykrywająca ryzyka podatkowe.
* 🔒 **Bezpieczeństwo Danych:** Mechanizm hashowania plików (SHA-256) zapobiegający duplikatom i zbędnym kosztom analizy.
* 🎨 **Nowoczesny UI:** Drag & Drop, walidacja po stronie klienta, responsywny design (Tailwind CSS).
* 🐳 **Dockerized:** Całe środowisko (Frontend, Backend, Baza) wstaje jedną komendą.

## 🛠️ Tech Stack

### Backend (Monolit Modularny)
* **Java 21** & **Spring Boot 3**
* **Spring AI** (Integracja z LLM)
* **Spring Data JPA** + **Hibernate**
* **PostgreSQL** (Baza danych)
* **Lombok** & **Maven**

### Frontend
* **React 18** (Vite)
* **TypeScript**
* **Tailwind CSS** (Styling)
* **Lucide React** (Ikony)

### DevOps
* **Docker** & **Docker Compose**
* **Nginx** (Serwer produkcyjny dla frontendu)

## ⚙️ Jak uruchomić (Lokalnie)

Wymagania: Zainstalowany Docker i Docker Compose.

1.  **Sklonuj repozytorium:**
    ```bash
    git clone [https://github.com/TWOJ_NICK/ksef-validator.git](https://github.com/TWOJ_NICK/ksef-validator.git)
    cd ksef-validator
    ```

2.  **Skonfiguruj zmienne środowiskowe:**
    Utwórz plik `.env` w głównym katalogu i wklej:
    ```ini
    DB_USER=ksef_user
    DB_PASSWORD=twoje_haslo
    DB_NAME=ksef_validator
    OPENAI_API_KEY=sk-.... (opcjonalnie, jeśli używasz Mocka to wpisz cokolwiek)
    ```

3.  **Uruchom aplikację:**
    ```bash
    docker compose up --build
    ```

4.  **Gotowe!**
    * Frontend: [http://localhost:3000](http://localhost:3000)
    * Backend API: [http://localhost:8080/api/status](http://localhost:8080/api/status)

## 🏗️ Architektura

Aplikacja zbudowana jest w architekturze warstwowej (Layered Architecture):

```mermaid
graph TD
    User[Użytkownik] -->|Upload XML| React[Frontend React]
    React -->|REST API| Controller[Spring Controller]
    Controller -->|DTO| Service[InvoiceService]
    Service -->|1. Check| XSD[Walidator XSD]
    Service -->|2. Check| AI[AiAuditor Service]
    AI -->|Prompt| LLM[OpenAI / Gemini]
    Service -->|Save| Repo[Repository]
    Repo -->|Persist| DB[(PostgreSQL)]
