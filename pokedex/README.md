Pokedex - README
Opis projektu
Pokedex to aplikacja webowa, która pozwala na przeglądanie, wyszukiwanie, dodawanie do ulubionych oraz modyfikowanie danych Pokémonów. Projekt wykorzystuje zewnętrzne API https://pokeapi.co/ i zarządza ich rozszerzonymi informacjami (takimi jak statystyki walk czy ulubione) za pomocą JSON-server oraz LocalStorage.
Aplikacja pozwala na:
•	Przeglądanie i filtrowanie Pokémonów,
•	Dodawanie nowych Pokémonów,
•	Edytowanie statystyk Pokémonów,
•	Zapisywanie swoich ulubionych,
•	Walki Pokémonów na Arenie,
•	Tworzenie rankingu na podstawie wybranych kryteriów.
Projekt zawiera logowanie i rejestrację użytkowników w oparciu o dane przechowywane w JSON-server.
Funkcjonalności
Nawigacja
•	Logo (lewy górny róg, „Pokedex”) – przekierowuje do strony głównej.
•	Informacja o zalogowanym użytkowniku – wyświetla się w prawym górnym rogu, jeśli użytkownik jest zalogowany.
•	Przełącznik trybu jasny/ciemny (obok informacji o użytkowniku) – zmienia motyw aplikacji.
•	Przyciski nawigacyjne (prawy górny róg):
o	Dla niezalogowanego użytkownika:
	„Logowanie” – prowadzi do strony logowania,
	„Rejestracja” – prowadzi do strony rejestracji.
o	Dla zalogowanego użytkownika:
	„Ulubione” – wyświetla listę ulubionych Pokémonów,
	„Arena” – umożliwia walki pomiędzy Pokémonami,
	„Ranking” – prezentuje listę Pokémonów wg wybranych kryteriów,
	„Edycja” – umożliwia zarządzanie i dodawanie nowych Pokémonów,
	„Wyloguj” – wylogowuje użytkownika.
Strona główna
•	Wyszukiwarka Pokémonów – pozwala na wyszukiwanie po nazwie, aktualizowana na bieżąco (live search).
•	Lista Pokémonów – podzielona na strony (paginacja: po 15 Pokémonów).
o	Karta Pokémona:
	Zawiera imię, obrazek i 4 kluczowe cechy (np. waga, wzrost, bazowe doświadczenie, typ).
	Zareaguje lekkim powiększeniem po najechaniu kursorem.
	Kliknięcie przekierowuje do szczegółów Pokémona.
	Dla zalogowanych użytkowników dodatkowo wyświetla statystyki wygranych i przegranych walk.
Rejestracja
•	Formularz do tworzenia nowego konta zapisywany w JSON-server.
•	Pola formularza:
1.	Imię (min. 3 znaki, wymagane),
2.	Email (wymagane, poprawny format),
3.	Hasło (wymagane, min. 8 znaków, zawiera co najmniej 1 wielką literę, 1 cyfrę i 1 znak specjalny),
4.	Powtórz hasło (musi się pokrywać z hasłem).
•	Walidacja za pomocą React Hook Form i Zod.
•	Wyświetlenie powiadomienia (notistack) o sukcesie lub o błędzie (np. użytkownik istnieje).
Logowanie
•	Formularz logowania sprawdza dane w JSON-server.
•	W razie błędnych danych – powiadomienie (notistack).
•	Po zalogowaniu – przekierowanie na stronę główną i wyświetlenie komunikatu o sukcesie.
•	Dane o zalogowanym użytkowniku są widoczne w nawigacji.
Ulubione
•	Wyświetla listę Pokémonów oznaczonych jako ulubione (zapis w JSON-server).
•	Karty wyglądają i działają tak samo jak na stronie głównej (klikalne, z możliwością usunięcia z ulubionych).
Arena
•	Przedstawia 2 sloty na Pokémony 
•	Każdy slot zawiera:
o	Kartę Pokémona (jeśli jest dodany),
o	Przycisk usunięcia go z Areny.
•	Ikona na karcie szczegółów Pokémona pozwala dodać go do Areny (maks. 2 Pokémony).
•	Przycisk „WALCZ!”:
o	Aktywny tylko wtedy, gdy na Arenie są 2 Pokémony.
o	W momencie walki:
	Zwycięża Pokémon z wyższą wartością: base_experience * weight.
	Zwycięzca dostaje +10 do base_experience oraz statystyki (win: 1), przegrany (lose: 1).
	W przypadku remisu – brak zmian statystyk.
	Wyświetlane jest powiadomienie o wyniku i przycisk „Opuść arenę”, który usuwa obydwa Pokémony ze slotów.
Ranking
•	Lista wszystkich Pokémonów, posortowana domyślnie malejąco według wybranego kryterium (np. base_experience, waga, wzrost, liczba wygranych).
•	Możliwość zmiany kryterium sortowania 
•	Każdy element listy wyświetla podstawowe informacje, niewielką grafikę i statystyki.
Edycja
•	Wyświetla listę Pokémonów (tych pobranych i tych dodanych przez użytkownika).
•	Przycisk „Stwórz pokemona” prowadzi do formularza tworzenia:
o	Pola: nazwa, waga, wzrost, doświadczenie.
o	Możliwość wyboru grafiki z PokeAPI, 
o	Przyciski nawigujące między dostępnymi grafikami (lewo/prawo).
o	„Stwórz” – zapisuje nowego Pokémona w JSON-server (unikalne ID), wyświetla powiadomienie i przekierowuje na stronę główną.
•	Lista Pokémonów:
o	Numer porządkowy,
o	Nazwa,
o	Mała grafika,
o	Przycisk „Edytuj” – otwiera formularz edycji: modyfikacja wzrostu, wagi, doświadczenia.
o	Po zatwierdzeniu zmian przyciskiem „Zmień atrybuty”:
	Powiadomienie o sukcesie,
	Przekierowanie na stronę główną.
Technologie i narzędzia
W projekcie wykorzystano:
1.	React (Context API, useState, useEffect) – zarządzanie stanem i cyklem życia komponentów.
2.	react-router-dom – obsługa routingu (nawigacja między podstronami).
3.	Tailwind CSS + clsx – stylowanie komponentów i motywy (dark / light).
4.	Axios / Fetch – komunikacja z zewnętrznym API (PokeAPI).
5.	JSON-server – lokalne API do przechowywania danych użytkowników, statystyk i niestandardowych Pokémonów.
6.	LocalStorage – przechowywanie informacji (np. token sesji, dane zalogowanego użytkownika) po stronie przeglądarki.
7.	React Hook Form + Zod – walidacja formularzy rejestracji, logowania i edycji.
8.	notistack – wyświetlanie powiadomień o sukcesie / błędach / ostrzeżeniach.
Struktura projektu
•	components – mniejsze komponenty zwracające JSX (np. karty, panele).
•	shared – elementy wielokrotnego użytku (np. przyciski, layouty, mikrosekcje).
•	subpages – główne podstrony aplikacji (home, arena, favourites, edycja, ranking itp.)
•	context – konteksty (useContext) do globalnego stanu (np. uwierzytelnienie, dane Pokémonów).
•	icons – komponenty z ikonami 
•	services – wszelkie usługi, np. komunikacja z API, konfiguracje bibliotek zewnętrznych.
Sposób uruchomienia
1.	Klonowanie repozytorium
git clone https://github.com/lukas-sikora/Pokedex/tree/pokedex-project-lukasz-sikora
cd pokedex
2.	Instalacja zależności
npm install
lub
yarn install
3.	Uruchomienie JSON-server
W pliku package.json znajduje się konfiguracja dla JSON-server:
{ 
"scripts": 
{ "json-server": "json-server --watch db.json --port 5000" 
} 
}
4.	Uruchomienie aplikacji
W osobnym terminalu (z poziomu katalogu głównego projektu):
npm run dev

5.	Korzystanie z aplikacji
•	Przeglądaj dostępne podstrony (Home, Logowanie/Rejestracja, Ulubione, Arena, Ranking, Edycja).
•	Zarejestruj użytkownika lub zaloguj się, aby uzyskać dostęp do niektórych funkcji (ulubione, arena, edycja).
•	Dodawaj/edytuj Pokémony, walcz na arenie, sprawdzaj rankingi!

Konwencje i dobre praktyki
•	Struktura plików i katalogów jest podzielona według typu zasobów (komponenty, podstrony, konteksty itp.), co ułatwia utrzymanie czytelności i skalowalności projektu.
•	Nazewnictwo komponentów z wielkiej litery, np. Home, PokemonCard.
•	Walidacja (React Hook Form + Zod) – zapewnia bezpieczeństwo i wysoką jakość danych wprowadzanych przez użytkowników.
•	Obługa powiadomień (notistack) – każde zdarzenie ważne dla użytkownika (błąd, sukces, ostrzeżenie) jest sygnalizowane w przyjazny sposób.
•	Reużywalność stylów – w zależności od wybranej metody ( Tailwind + clsx), trzymaj się spójnego stylu i spójnych namingów klas czy zmiennych.
