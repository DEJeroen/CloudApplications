# Percipience is an application that can recognize certain symbols from an image
## CloudApplications
### Project Omschrijving
#### Aanleiding en context
Anno 2016 wordt er steeds meer gedacht over hoe technologie ons huidige educatiesysteem kan verbeteren of zelfs vervangen. Onze klant, dhr. Peeters, kreeg inspiratie bij zijn recente ouderbijeenkomst van zijn kind waar een leerkracht bovenmatig IT-minded bezig was. Hierom ontstond de opdracht voor ons hoe je augmented-reality technologie meer en vertrouwd krijgt binnen een schoolomgeving, zodat leerling en leraar zichzelf verder kunnen ontplooien met behulp van deze technologie. 
#### Probleemstelling
Een augmented reality applicatie ontwikkelen die zal bijdragen aan de interactiviteit in scholen.
#### Doel project
Doel van dit project is om erachter te komen hoe we een omgeving opzetten waarmee leerkrachten op een speelse manier quizjes kunnen bedenken voor hun leerlingen en hiermee direct visuele feedback kunnen krijgen hoe een klas tegenover een bepaald onderwerp of vraag staat.
#### Beschrijving
Het project zal opgesplitst worden in twee onderscheidende onderdelen. Ten eerste heb je de applicatie zelf, deze zal native ontwikkeld worden voor Android telefoons. De applicatie zal verschillende figuren leren herkennen. Op moment van schrijven weten we nog niet concreet welke figuren, maar kanshebbers zijn: horizontale lijn, verticale lijn, cirkel, driehoek en vierkant. De app krijgt een simpele interface waarmee de gebruiker vlot kan beginnen scannen, de resultaten kan zien of kan doorsturen naar de server. Voordat de scan begint zal er ingesteld worden naar welke figuren de scan zal moeten zoeken. Daarnaast wordt er meegestuurd welk leerjaar, klas of les wordt meegestuurd om beter onderscheid te kunnen maken tussen de data.
Het tweede deel van het project bestaat uit een web platform en databank waar de resultaten naartoe worden verstuurd en men de resultaten kan bekijken. De resultaten kunnen via ons web platform in een grafiek, pie-chart en dergelijke worden gezet voor visuele feedback over wat voor antwoorden er gekozen zijn. De interface zal hierbij tevens simpel zijn, de voorgaande resultaten kunnen per datum en tijd, leerjaar, klas of les worden bekeken. Een combinatie hiervan is tevens ook mogelijk.  
#### Taakverdeling
Respectievelijk zal Jeroen het grootste deel van de Android app op zich nemen en Boyd buigt zich over het web platform.
#### Methodologie project
Het project zal uitgevoerd worden met de scrum methode. We maken een back-log met alle features die in dit project moeten. Vervolgens worden er per sprint features toegewezen die gemaakt moeten worden tijdens die sprint. Per week dat we samenkomen zullen we een stand-up houden om alles door te nemen. We houden ook wekelijks een bespreking met de klant, dhr. Peeters. Hier stellen we de voortgang van het project voor, wat er behaald is, wat er mis is gegaan en wat er deze week verder op de planning zal staan. Hierdoor zal er dus constant feedback beschikbaar zijn over waaraan gewerkt moet worden. 
#### Verwachte problemen
Toen we de projectkeuze hadden gemaakt zijn we direct onderzoek gaan doen naar bestaande technologieën die al reeds op de markt zijn. Wat blijkt na het testen van een aantal apps die gefocust zijn rond image recognition, dit werkt niet altijd 100%. De apps hebben het vaak fout als ze een plaatje proberen herkennen, echter gaat dit om apps die de precieze origine van een object van een plaatje proberen te achterhalen. Zoals een bloempot, stoel of auto. We hopen daarom dat figuren herkennen iets gemakkelijker zal verlopen. 
#### Verwachte resultaten
De verwachting is dat we de applicatie simpele figuurtjes kunnen laten herkennen en vervolgens laten doorsturen naar de databank en het web platform.
#### Optionele features
Mochten de verwachte resultaten sneller dan verwacht verlopen, kunnen we gaan denken aan complexere figuren leren herkennen. Daarnaast kan er gedacht gaan worden om ook een leerling versie te maken, met voorgeprogrammeerde opdrachten zoals “Zoek of knutsel een object dat een cirkel is”. Op basis van snelheid en duidelijkheid van het object kunnen er bijvoorbeeld punten worden toegekend aan de leering. Op deze manier zal de applicatie breder inzetbaar zijn.

### Technologie
In het huidige stadium van het project is het gebruik van een bepaalde technologie nog niet zeker. Waar de technologie zoiezo aan moet voldoen is het herkennen van objecten, hierbij zal er getest moeten worden hoe goed de technologie werkt onder bepaalde licht omstandigheden en andere oorzaken van ruis. De diagram hieronder geeft een overzicht van de manier waar de gebruikte technologie thuishoort.
![alt tag](https://github.com/DEJeroen/CloudApplications/raw/master/Pictures/TechnologieDiagram.png)

#### Image Recognition
Image Recognition zorgt ervoor dat de antwoorden herkent zullen worden vanuit informatie verkregen van de camera. Hieronder staat een opsomming met beschrijving van beeld herkenning waar een uiteindelijke keuze uit gemaakt zal moeten worden.

##### Tensorflow
Tensorflow is een opensource software bibliotheek voor deeplearning en neural networks die objecten scoort doormiddel van flow graphs. Dit systeem van dingen scoren is bruikbaar voor een hele hoop verschillende doeleinden waaronder beeldherkenning.
##### Craftar Cloud Service
Craftar is op basis van AWS diagrammen
##### OpenCV/JavaCV
OpenCV is een library voor het detecteren van objecten in realtime camera beelden. JavaCV is een java interface voor OpenCV dit zou waarschijnlijk wat performance verlies hebben maar wel positieve effecten hebben voor het programmeren en de leesbaarheid van de code.
##### CloudSight
Cloudsight is een cloud api die erg precies objecten in afbeeldingen kan herkennen, deze service is erg precies maar doet er ook veel langer over om bij de resultaten te komen.

#### Question Cloud
De Question Cloud zal zal ervoor zorgen dat er vragen via de app gesteld kunnen worden

#### Firebase
Firebase is een NoSQL database en zou hierdoor sneller, schaalbaarder en beter uitbreidbaar moeten zijn.
#### MySQL
MySQL is een SQL database en zou hierdoor betere data integriteit moeten hebben en betere support.

### Uitkomst voor de maatschappij

### Stories/Actoren

### Mockups

### Links
