# Classify
Classify aims to assess the feasibility of storing classified documents on a Hyperledger Fabric blockchain platform by providing a simple and intuitive proof of concept web application. Hyperledger Fabric platform was selected due to its permissioned structure and channels feature, making it a suitable application for government use cases. The languages and framework(s) selected for this project include ReactJS & NestJS. Both are extremely popular and utilize JavaScript, the world's most popular programming language (according to Stack Overflow) at the time this was written. By selecting two very popular and modern frameworks, I hope it eases the burden of finding talent to maintain and develop a similar system. 

## Research Question
Is the Hyperledger Fabric platform a suitable blockchain platform for creating a web application to store and access classified information for the United States government?

## Problem Statement
With the increasing use of blockchain and public interest in the topic, I look to explore how blockchain technology can modernize government software and increase government data security. For governments, such as the United States, the blockchain can serve as verifiable application to store and verify access to classified information, or even the classified information itself. Additionally, a correct implementation of a blockchain will prevent modification of that data, ensuring its integrity. While blockchain isn’t necessarily in its infancy, it’s still a new technology and as such, its capabilities are still being explored. By investing in blockchain technologies, the US government can stay ahead of the curve when it comes to legacy systems and software, while also attracting the brightest minds to develop and maintain the systems due to the overwhelming interest in the technology. 

## Implementation
The primary focus of this app will be interacting with the Hpyerledger fabric platform itself, as well as providing a simple, intuitive, and modern user interface. For the blockchain platform, I have elected to utilize Kaleido. Kaleido is a cloud-based enterprise solution for deploying and managing various blockchain platforms, including the recent addition of Hyperledger Fabric. Beyond easing the process of creating and configuring the Hyperledger Fabric platform, they also provide a REST API to interact with our network via network requests rather than needing to integrate with Hyperledger's SDK. This greatly reduces the knowledge and experience needed to be involved with the network and allows developers to focus more on the presentation & functionality of the site, rather than the development of the blockchain network itself. While Kaleido is a great solution for this proof of concept, further exploration would be required for each respective government use case.

## Frontend
The frontend is comprised of two pages: Login and Dashboard. 

### Login 
While the Login page is not functional for this proof of concept, ideally it would be integrated with a central authentication service, such as LDAP or Active Directory, for the specific agency accessing the site. 

### Dashboard
The dashboard is the hub of the application and is where user’s will be able to upload and access previously uploaded documents. I opted to use Azure cloud storage for storing and retrieving uploaded documents, where only the document contents is retained and the rest of the information is hashed to increase the security of said documents. User’s can select an uploaded document to render a file preview directly in the browser and from there are able to see the transaction information of that particular upload. 

## Backend
The backend utilizes NestJS, a modern server-side framework for JavaScript. It mimics a Model-View-Controller structure. Additionally, MongoDB is used as the central database. Azure Cloud Storage is used for storing the document contents. Depending on the specific use case, document contents could likely be stored on the blockchain platform itself.

### Database
The MongoDB database is comprised of one collection, ClassifyDocs. Information about uploaded documents is stored here (see schema below).

![ClassifyDocSchema](https://user-images.githubusercontent.com/21129955/162629571-995cb131-a5ef-40bc-9844-76901460d113.png)

### Blockchain (Kaleido)
As mentioned earlier, the Hyperledger platform is hosted with Kaleido. Because of restrictions on my Kaleido account (student account), I was unable to truly replicate what a real-world implementation of the blockchain network would look like. As it stands, the network consists of two nodes: 1 peer node and 1 orderer node. This is acceptable for a proof of concept, however a production implementation would likely require at least 1 pair of orderer and peer nodes for each agency using the system. Additionally, each agency would have its own channel rather than sharing only sharing one channel in order to create a truly permissioned system. 

## Conclusion
Overall, the Hyperledger Fabric blockchain appears to be a suitable solution for this particular government use case. A large part of the success of this proof of concept relies on Kaleido, as without it I would not have been able to create a persistent blockchain network and instead would have had to rely on a local network. Additionally, the REST API they provide to interact with Hyperledger Fabric systems is incredibly convenient and powerful. I expect further development would be required for features on the site including document sharing, live editing, notifications, and more. Further research would be required for a production implementation as there is not enough publicly available information about the requirements for this specific application, however I am hopeful that this proof of concept will serve as a strong stepping stone. 
