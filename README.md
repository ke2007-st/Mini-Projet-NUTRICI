# NutriCI

Boutique de complements alimentaires — L2 MIAGE Genie Logiciel.

## Stack

- Java 17 + Spring Boot 3 + Spring Data JPA
- H2 (memoire) pour la demo
- Front HTML/CSS/JS (`fetch`)
- Tests JUnit 5

## User stories

| US | Description | Branche / contribution |
|----|-------------|------------------------|
| US1 | Catalogue par categorie | Integre Spring (filtre + `/api/categories`) |
| US2 | Panier + paiement Mobile Money | `feature/us2-us4-panier-bon-livraison` |
| US3 | CRUD admin produit / stock | Integre Spring (`admin-produits.html`) |
| US4 | Bon de livraison | `feature/us2-us4-panier-bon-livraison` |

> Note : une branche Node `feature-catalogue-produits` existe (US1/US3 Express).  
> La stack retenue pour la fusion est **Spring Boot** (coherence du binome).

## Demarrage

```bash
mvn spring-boot:run
```

- Boutique : http://localhost:8080/
- Admin produits : http://localhost:8080/admin-produits.html
- Admin livraison : http://localhost:8080/admin-livraison.html
- Client demo : `client@nutrici.ci`

## Tests

```bash
mvn test
```
