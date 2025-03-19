# ExamsAssignments

#  Opgave 04b – MongoDB Tests

## **User1 - Admin (Fuld Adgang)**
### 🔹 Login som admin (User1)
Dette billede viser, hvordan admin (User1) logger ind på MongoDB via Docker.

![Login som admin](user1/login_som_user1.png)

### 🔹 Admin ser hele collection
Som administrator har User1 adgang til alle data i databasen.

![Admin ser hele collection](user1/user1HeleCollection.png)

### 🔹 Admin indsætter en ny bruger
Dette viser, hvordan User1 kan indsætte data i databasen.

![Admin indsætter data](user1/user1InsertOne.png)

### 🔹 Admin bekræfter indsættelse
Bekræfter, at dataen er blevet tilføjet.

![Admin insert bekræftelse](user1/user1InsertConfirmed.png)

### 🔹 Admin opdaterer en bruger
User1 ændrer en brugers email.

![Admin opdaterer email](user1/user1UpdateOne.png)

### 🔹 Admin sletter en bruger
Dette viser, hvordan User1 kan slette data.

![Admin sletter en bruger](user1/user1DeleteOne.png)

---

## **User2 - Read-Only Adgang**
### 🔹 Login som user2
User2 logger ind i MongoDB, men har **kun læseadgang**.

![Login som user2](user2/login_user2.png)

### 🔹 User2 kan se hele databasen
User2 har kun læseadgang, men kan stadig se alle data.

![User2 ser hele collection](user2/user2HeleCollection.png)

### 🔹 User2 forsøger at indsætte data (fejler)
User2 prøver at indsætte en ny bruger, men har **ikke adgang**.

![User2 fejler ved indsættelse](user2/user2InsertOne.png)

### 🔹 User2 forsøger at opdatere en bruger (fejler)
User2 prøver at ændre en brugers email, men har **kun læseadgang**.

![User2 fejler ved opdatering](user2/user2UpdateOne.png)

### 🔹 User2 forsøger at slette en bruger (fejler)
User2 kan **ikke slette data**, fordi adgangsniveauet er read-only.

![User2 fejler ved sletning](user2/user2DeleteOne.png)

---

## **User3 - Restricted Read/View**
### 🔹 Login som user3
User3 logger ind, men har **begrænset adgang** til databasen.

![Login som user3](user3/login_user3.png)

### 🔹 User3 ser kun begrænset collection
User3 har kun adgang til en lille del af databasen.

![User3 begrænset adgang](user3/user3BegrænsetCollection.png)

### 🔹 User3 forsøger at se hele databasen (fejler)
User3 **kan ikke få adgang** til hele databasen.

![User3 får adgang nægtet](user3/user3HeleCollection.png)

### 🔹 User3 forsøger at indsætte en ny bruger (fejler)
User3 kan **ikke indsætte nye brugere**.

![User3 fejler ved indsættelse](user3/user3InsertOne.png)

### 🔹 User3 forsøger at opdatere en bruger (fejler)
User3 har **ingen rettigheder til at ændre data**.

![User3 fejler ved opdatering](user3/user3UpdateOne.png)

### 🔹 User3 forsøger at slette en bruger (fejler)
User3 kan **ikke slette data**, da adgangen er begrænset.

![User3 fejler ved sletning](user3/user3DeleteOne.png)

---

## ** Konklusion**
- **User1 (Admin)** har **fuld adgang** og kan læse, skrive, opdatere og slette data.
- **User2 (Read-Only)** kan **kun læse data**, men ikke ændre eller slette noget.
- **User3 (Restricted Read/View)** har **meget begrænset adgang** og kan kun se visse dele af databasen.

**Billederne er dokumenteret i `4b/user1/`, `4b/user2/` og `4b/user3/` mapperne.**