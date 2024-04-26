# Dandelion

A social media app where users can chat with others, upload 
posts, call, comment and reply each other, using microservice architecture.

> <a href="https://github.com/lancer2672/DandelionServer" target="_blank">Dandelion Server</a>
> 
> <a href="http://dandelionsever.live" target="_blank">dandelionsever.live</a>

- MainService: Responsible for implementing authentication, chat features, 
post and user management, using Redis to cache post data and user messages.
Apply some desgin patterns.
- <a href="https://github.com/lancer2672/Dandelion_Gateway" target="_blank">API Gateway</a> (replaced by AWS EKS): Authentication, dynamic routing, request limitter.
- <a href="https://github.com/lancer2672/DandelionServer_Noti" target="_blank">Notification Server</a>: Implement RabbitMQ to subscribe and handle Dead 
Letter Exchange messages, send notifications using FCM.
- <a href="https://github.com/lancer2672/DandelionServer_Go" target="_blank">Movie Server</a>: Implemented gRPC (unary and server-side streaming) to 
handle both HTTP and gRPC requests.

Technology:
+ Frontend: React-native, Redux-Toolkit, 
+ Backend: ExpressJs, SocketIO, RabbitMQ, GRPC, Gin, Docker
+ Database: Postgres, MongoDB, Redis. 
+ Service: AWS ECR, EKS, CDR, S3, Firebase.

## Project Status

This project is currently in development. 

>
> Implement functionality to display position of users on Google Maps and track it in real-time is in progress


## Project Screen Shots
### Frontend
<img src="https://github.com/lancer2672/Dandelion/assets/90507570/24c02733-7f18-44a0-af23-1701a8baff59" width="300">
<img src="https://github.com/lancer2672/Dandelion/assets/90507570/909ffdab-a2b3-4967-aa3c-95a64404a145" width="300">
<img src="https://github.com/lancer2672/Dandelion/assets/90507570/b00270b8-aaf4-4bd8-bfac-5077dd6cbd7f" width="300">
<img src="https://github.com/lancer2672/Dandelion/assets/90507570/4a0b4acc-d9a9-477c-a3b3-2bfd85fc5967" width="300">
<img src="https://github.com/lancer2672/Dandelion/assets/90507570/5004f845-10de-4a3f-a608-809e8db9bcd8" width="300">
<img src="https://github.com/lancer2672/Dandelion/assets/90507570/2574aae6-3992-4fdc-982c-8ec23ef7c51e" width="300">

#### Backend

<img src="https://github.com/lancer2672/Dandelion/assets/90507570/2f344dc4-4e49-484e-9474-5c86d365c0e6" width="300">
<img src="https://github.com/lancer2672/Dandelion/assets/90507570/7c2355ce-b06f-4ad4-b4b0-5370900e2fdb" width="300">
<img src="https://github.com/lancer2672/Dandelion/assets/90507570/acd7a099-58f4-45f8-b379-b41fa701bdf9" width="300">
<img src="https://github.com/lancer2672/Dandelion/assets/90507570/3f669ec5-c90a-4f74-892e-18f5f9dc65dd" width="300">
<img src="https://github.com/lancer2672/Dandelion/assets/90507570/407f33d0-a99e-4fa0-9d88-ca317b23949d" width="300">







