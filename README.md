##INFO6150 – FALL2022 – FINAL PROJECT

#HAIL MARY

###@Aravind Dasarathy | @Divya Shree | @Geetha Parthasarathy | @Dhruv Parthasarathy

##GitHub: https://github.com/neu-mis-info6150-fall-2022/final-project-final-project-hail_mary


About:
Imagine you are running a company, say, a mobile company, and there are millions of customers reaching out to you daily regarding several hardware and software mobile issues through email. How hard will it be to manage every concern through just a platform like an email? 
Hail Mary is a project that aims to provide convenient and frictionless customer-support domain. It consists of two parts - the customer’s side, where a customer logs the complaint regarding issues governing a product, and the customer support’s side, where the (support) agent handles the issues raised by the customer. The main aim is to provide a seamless experience between the customer and the company (customer support). 


Entities:
The basic entities that govern our application are: 
1.	CUSTOMER
2.	AGENT/RESOLVER
3.	TICKET
4.	CONTACT DETAILS
5.	NOTES
6.	TO-DO

Entity Relationship diagram: 

![ERDiagram](/images/ER-Diagram.png "ERDiagram") 



Value Objects:
All analytical data that we will be generating as an aggregate of entity parameters would be our Value Objects. A few of them are: 
1.	Number of tickets created/open in a period 
2.	Number of resolved unresolved, due, and unassigned tickets 
3.	Average time taken to resolve or respond on tickets 
4.	Communication between a customer and an agent
5.	Customer satisfaction


Use Case Diagram:

![UseCaseDiagram](/images/Use-CaseDiagram.png "UseCaseDiagram") 




The relationship among the actors and different entities are as follows: 
1.	Admin: Manage Profile Entity, Ticket Entity.
2.	Agent: Create and Update Profile Entity, Ticket Entity, Forum, Escalation, and To-do Entity.
3.	Customer: Create and Update Profile Entity, Ticket Entity, Escalation and Feedback Entity.








System breakdown into Sub Systems

Sub Systems  
•	Ticket Management sub system 
•	User sub system
•	User (agent/contact) management sub system 
•	Login /logout (authentication) sub system 
•	Analytics Subsystem 
•	Notification Subsystem 


Ticket Management sub system 
•	Allows users to open a new ticket  
•	Allows users to modify an existing ticket 
•	Allow users to access all tickets created by them 
•	Allow support team members to assign tickets to other support team members 

User sub system
•	Provides APIs for creating, updating, and deleting customers. 
•	Provides APIs for creating, updating, and deleting agents. 
•	User and agent field validations. 
•	User and customer role management and restrictions. 
•	Username and password management. 

User (agent/contact) management sub system 
•	Allows agents to view contact details of customers
•	Allows admin to delete an agent or a customer entity
•	Allows users to update their contact information


Login /logout (authentication) sub system
•	Allows users to log in to the system using their credentials 
•	Allows the users to log out of the system 
•	Allows users to register themselves as new users 
•	Provides users with the “forgot password” functionality 

Analytics Subsystem 
•	Allows agents to see metrics of tickets status e.g.: resolved, due, open, closed, etc. 
•	Allows agents to see their performance trends as a chart 
•	Allows agents to see their to-do list for tickets assigned 
•	Allows agents to see Customer Satisfaction 

Notification Subsystem 
•	Send escalation notification to agents and admin 


SITE MAP


![SiteMap](/images/SiteMap.png "SiteMap") 


