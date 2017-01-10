# Percipience is an application that can recognize certain symbols from an image

Configuration to run web app:

 - Git clone 'Percipience' in een directory naar keuze
 - Installeer nodejs
 - Start node js
 - Navigeer naar de directory waarin je 'Percipience' hebt gecloned en ga naar het mapje src/Web
 - Geef het commando "npm install" in. Hierdoor installeert het alle nodige modules die nodig zijn voor het project
 - Geef het commando "node express.js" in, hierdoor word de server opgestart.
 - Ga via de browser van u keuze naar localhost:3000
# Table of Contents

  * [CloudApplications](#cloudapplications)
    + [Project Omschrijving](#project-omschrijving)
      - [Aanleiding en context](#aanleiding-en-context)
      - [Probleemstelling](#probleemstelling)
      - [Doel project](#doel-project)
      - [Beschrijving](#beschrijving)
      - [Methodologie project](#methodologie-project)
      - [Verwachte problemen](#verwachte-problemen)
      - [Verwachte resultaten](#verwachte-resultaten)
      - [Optionele features](#optionele-features)
    + [Technologie](#technologie)
      - [Android](#Android)
      - [Angular & Bootstrap](#Angular & Bootstrap)
      - [OpenCV/JavaCV](#OpenCV/JavaCV)
      - [Firebase](#firebase)
    + [Uitkomst voor de maatschappij](#uitkomst-voor-de-maatschappij)
    + [Stories/Actoren](#stories-actoren)
    + [Mockups](#mockups)
    + [Links](#links)


## CloudApplications
### Project Omschrijving
#### Aanleiding en context
Anno 2016 wordt er steeds meer gedacht over hoe technologie ons huidige educatiesysteem kan verbeteren of zelfs vervangen. Onze klant, dhr. Peeters, kreeg inspiratie bij zijn recente ouderbijeenkomst van zijn kind waar een leerkracht bovenmatig IT-minded bezig was. Hieruit kwam het idee hoe augmented-reality technologie meer en vertrouwd krijgt binnen een schoolomgeving, zodat leerling en leraar een interactievere les kunnen beleven. 
#### Probleemstelling
Een beeldherkenningsapplicatie ontwikkelen die zal bijdragen aan de interactiviteit en technologisch integrering in scholen. De leraar kan via een webapplicatie vragen voorbereiden voor de les. Deze lessen en respectievelijk de vragen worden dan via een projector getoond. De leerlingen hebben A4tjes met QR-codes of figuren met felle kleuren ter beschikking, deze stellen de antwoorden voor van de studenten. Aan de hand van testen zullen we besluiten welke figuren dit zijn. Op dit moment zijn deze nog niet bekend. Zodra het signaal gegeven word, steken de leerlingen hun antwoorden (QR-codes of figuren) de lucht in.

De QR-codes bevatten een antwoord wat overeenkomt met de antwoordmogelijkheden die te zien zijn op het scherm. De leraar scant alle QR-codes met onze Androidapplicatie. Deze telt de resultaten bij elkaar op. De figuren zijn gekleurd met felle kleuren. De app kan met behulp van kleur en figuurherkenning zien of de figuur al eens omhoog is gehouden. De app telt alle gegevens bij elkaar op en stuurt deze vervolgens naar onze webapplicatie. Daarna wordt er via de webapp een grafiek gemaakt om de resultaten visueel te tonen.
#### Doel project
Het doel is om een applicatie met clouddienst te ontwikkelen voor leerkrachten om hun lessen levendiger te maken. Leraren kunnen vragen voorbereiden om tijdens de lessen aan de kinderen te stellen. De kinderen houden QR-codes of felgekleurde figuurtjes omhoog. Deze QR-codes of figuurtjes stellen het antwoord van de leerlingen voor. De leraar scant deze met de mobiele applicatie en stuurt de gescande resultaten vervolgens naar de Cloud server. Vervolgens worden de resultaten op het scherm getoond en kan de leraar zien hoe goed de leerlingen zijn stof opnemen. Leerlingen krijgen vervolgens feedback over welk antwoord het juiste was en zien op deze manier zelf hoe goed ze de stof opnemen.
#### Beschrijving
Het project zal opgesplitst worden in twee onderscheidende onderdelen. 

Ten eerste heb je de applicatie zelf, dit wordt native ontwikkeld voor Android. De applicatie leert verschillende figuren of QR-codes herkennen. De app krijgt een simpele interface waarmee de gebruiker vlot kan beginnen scannen, de resultaten kan zien of kan doorsturen naar de server. Voordat de scan begint zal er besloten worden wat hij scant, figuren of QR-codes. Daarnaast wordt er meegestuurd welk leerjaar, klas of les wordt meegestuurd om beter onderscheid te kunnen maken tussen de data.

Het tweede deel van het project bestaat uit een web platform en databank waar de resultaten naartoe worden verstuurd en men de resultaten kan bekijken. De resultaten kunnen via ons web platform in een grafiek, pie-chart en dergelijke worden gezet voor visuele feedback over wat voor antwoorden er gekozen zijn. De interface zal hierbij tevens simpel zijn, de voorgaande resultaten kunnen per datum en tijd, leerjaar, klas of les worden bekeken. Een combinatie hiervan is tevens ook mogelijk.  
#### Methodologie project
Het project wordt uitgevoerd met behulp van de scrum en agile methode. We maken een back-log met alle features die in dit project moeten. Vervolgens worden er per sprint features toegewezen die gemaakt moeten worden tijdens die sprint. Per week dat we samenkomen zullen we een stand-up houden om alles door te nemen. We houden ook wekelijks een bespreking met de klant, dhr. Peeters. Hier stellen we de voortgang van het project voor, wat er behaald is, wat er mis is gegaan en wat er deze week verder op de planning zal staan. Hierdoor zal er dus constant feedback beschikbaar zijn over waaraan gewerkt moet worden. Daarbij zullen er aan het eind van module 1 een presentatie worden gehouden en demo’s worden voorzien. Aan het eind van module 2 wordt het eindproduct gepresenteerd en de finale applicatie getoond. Hierbij is telkens ruimte voor vragen en constructieve kritiek van onze product owner en van onze leerkracht. 

https://github.com/DEJeroen/CloudApplications#boards?repos=68715146
#### Verwachte problemen
Toen we de projectkeuze hadden gemaakt zijn we direct onderzoek gaan doen naar bestaande technologieën die al reeds op de markt zijn. Wat blijkt na het testen van een aantal apps die gefocust zijn rond image recognition, dit werkt niet altijd 100%. De apps hebben het vaak fout als ze een plaatje proberen herkennen, echter gaat dit om apps die de precieze origine van een object van een plaatje proberen te achterhalen. Zoals een bloempot, stoel of auto. We hopen daarom dat figuren herkennen iets gemakkelijker zal verlopen. 
#### Verwachte resultaten
De verwachting is dat we de applicatie simpele figuurtjes kunnen laten herkennen en vervolgens laten doorsturen naar de databank en het web platform Vervolgens komt het resultaat op het scherm te zien in al dan niet een grafiek.

Indien er gekozen wordt om met QR-codes te werken, is de verwachting dat we de QR-codes succesvol kunnen scannen en kunnen doorsturen. 
#### Optionele features
Mochten de verwachte resultaten sneller dan verwacht verlopen, kunnen we gaan denken aan complexere figuren leren herkennen. Daarnaast kan er gedacht gaan worden om ook een leerling versie te maken, met voorgeprogrammeerde opdrachten zoals “Zoek of knutsel een object dat een cirkel is”. Op basis van snelheid en duidelijkheid van het object kunnen er bijvoorbeeld punten worden toegekend aan de leering. Op deze manier zal de applicatie breder inzetbaar zijn.

### Technologie
#### Android
Android zal de basis worden van het herkenningsplatform, dit is het meest gebruikte besturingssysteem waardoor het het grootste publiek heeft en het legt relatief weinig limitaties op. 

#### Angular & Bootstrap
De logica van de webapplicatie wordt geschreven in Angular, dit laat ons onder andere toe om met weinig code veranderingen in de database direct op het scherm te laten zien. De opmaak zal grotendeels worden voorzien door bootstrap, dit zorgt dat we snel een omgeving kunnen ontwikkelen die er goed uitziet en functioneerd.

##### OpenCV/JavaCV
OpenCV is een library voor het detecteren van objecten in realtime camera beelden. JavaCV is een java interface voor OpenCV dit zou waarschijnlijk wat performance verlies hebben maar wel positieve effecten hebben voor het programmeren en de leesbaarheid van de code. 

#### Firebase
Firebase is een NoSQL database en zou hierdoor snel, schaalbaar en uitbreidbaar zijn. De keus is gevallen op Firebase, omdat het gemakkelijk te integreren is met de Android en web applicatie.

Hieronder een plaatje die laat zien hoe de applicatie zal werken. De app (camera in het plaatje) scant de omgeving naar figuurtjes die de leerlingen (de stickfigures in het plaatje) omhooghouden. Na het scannen worden deze resultaten verstuurd naar de webapp en komen de resultaten op het scherm. 

![alt tag](https://github.com/DEJeroen/CloudApplications/raw/master/doc/Pictures/TechnologieDiagram.png)

### Uitkomst voor de maatschappij
Deze app richt zich op het onderwijsvlak van de maatschappij. Met name het lager onderwijs. Het zal zich aanbieden als een simpel te besturen app met een even simpel online platform om resultaten te kunnen bekijken. Het biedt een mogelijkheid om technologie al vroeg in een jong persoons educatieve leven te integreren. Bovendien is het voor de leerkracht een goede manier om zijn lessen interactieves en levendiger te maken. Het zou voor hele kleine kinderen een goede manier zijn om figuren te leren herkennen en voor oudere kinderen kan het gebruikt worden voor ja/nee vragen en multiple choice vragen te toetsen.

### Stories/Actoren
As teacher I want a page where I can make graphs for past results.

As a teacher I want a to check realtime results

As a teacher I need to create lessons//differentiate my questionnaires between grades.

As a teacher I need to assign questions to lessons//differentiate my questionnaires between subjects.

As a teacher I want to choose which figures the scan needs to recognize to correspond with the questionnaires.

As a teacher I want the same login credentials for both the app and web platform.

As a teacher I need to register my account

As a teacher I need to start a lesson

As a teacher I need the ability to start the scan.

As a student I need to hold up figures to scan

As a student I need visual feedback for my choice

As a student I need to understand what my figure means.

As a student I need to know when to hold up my figure.

### Mockups
![alt tag](https://github.com/DEJeroen/CloudApplications/raw/master/doc/Pictures/Android/login.png)
![alt tag](https://github.com/DEJeroen/CloudApplications/raw/master/doc/Pictures/Android/camera.png)
![alt tag](https://github.com/DEJeroen/CloudApplications/raw/master/doc/Pictures/Android/settings.png)


![alt tag](https://github.com/DEJeroen/CloudApplications/raw/master/doc/Pictures/Web/login.png)
![alt tag](https://github.com/DEJeroen/CloudApplications/raw/master/doc/Pictures/Web/resultaten.png)
![alt tag](https://github.com/DEJeroen/CloudApplications/raw/master/doc/Pictures/Web/vragenlijst.png)

### Links
https://github.com/DEJeroen/CloudApplications
