# Percipience is an application that can recognize certain symbols from an image
## CloudApplications
### Project Omschrijving
#### Probleemstelling
De probleemstelling van dit project is: “Ontwikkel een applicatie die bepaalde vormen kan herkennen en de resultaten van deze vormen door kan sturen naar een web platform om ze op te slaan”. 
#### Beschrijving en wie doet wat
Het project zal opgesplitst worden in twee onderscheidende onderdelen. Ten eerste heb je de applicatie zelf, deze zal native ontwikkeld worden voor Android telefoons. De applicatie zal verschillende figuren leren herkennen. Op moment van schrijven weten we nog niet concreet welke figuren, maar kanshebbers zijn: horizontale lijn, verticale lijn, cirkel, driehoek en vierkant. Het tweede deel van het project bestaat uit een web platform en databank waar de resultaten naartoe worden verstuurd en men de resultaten kan bekijken. De resultaten kunnen via ons web platform in een grafiek, pie-chart en dergelijke worden gezet voor visuele feedback over wat voor antwoorden er gekozen zijn. Respectievelijk zal Jeroen het grootste deel van de Android app op zich nemen en Boyd buigt zich over het web platform.
#### Doel project
Het doel van dit project is om leerkrachten en leerlingen te ondersteunen op IT-gebied. Leraren kunnen met deze app op een speelse manier quizjes afnemen bij de kinderen door ze een figuurtje op te laten steken. Dit figuurtje staat voor het antwoord wat de desbetreffende leerling geeft. Vervolgens kan de leraar de omgeving scannen met zijn smartphone of tablet om de figuurtjes die op gestoken worden.
#### Methodologie project
Het project zal uitgevoerd worden met de scrum methode. We maken een back-log met alle features die in dit project moeten. Vervolgens worden er per sprint features toegewezen die gemaakt moeten worden tijdens die sprint. Per week dat we samenkomen zullen we een stand-up houden om alles door te nemen. We houden ook wekelijks een bespreking met de klant, dhr. Peeters. Hier stellen we de voortgang van het project voor, wat er behaald is, wat er mis is gegaan en wat er deze week verder op de planning zal staan. Hierdoor zal er dus constant feedback beschikbaar zijn over waaraan gewerkt moet worden. 

![alt tag](https://github.com/DEJeroen/CloudApplications/raw/master/Pictures/TechnologieDiagram.png)
### Technologie
In het huidige stadium van het project is het gebruik van een bepaalde technologie nog niet zeker. Waar de technologie zoiezo aan moet voldoen is het herkennen van objecten, hierbij zal er getest moeten worden hoe goed de technologie werkt onder bepaalde licht omstandigheden en andere oorzaken van ruis. Hieronder staat een opsomming met beschrijving van waar een uiteindelijke keuze uit gemaakt zal moeten worden. 

#### Image Recognition
Image Recognition zorgt ervoor dat de antwoorden herkent zullen worden vanuit informatie verkregen van de camera

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
