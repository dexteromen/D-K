# install minikube

minikube start

# app-deployment.yaml

```
image: dexteromen/notejam-app:latest
```

khud ki image lagana abhi yeh use krle

# db-stateful.yaml

2 changes h --->

```
image: dexteromen/notejam-db:latest
```

issme me bhi baad me image lagana tere docker hub pr push krne k baad

```
env:
        - name: POSTGRES_USER
          value: "postgres"
        - name: POSTGRES_PASSWORD
          value: "password"
        - name: POSTGRES_DB
          value: "notejam"
```

issme tere according password daal dena

# notejam-secret.yaml

yeh jo password likhe inko generate krna teri value k according
steps to do generate open terminal type for every string

```
echo -n "password" | base64
```

```
data:
  DB_USER: cG9zdGdyZXM=          # Base64 encoded value of 'postgres'
  DB_PASSWORD: cGFzc3dvcmQ=      # Base64 encoded value of 'password'
  DB_NAME: bm90ZWphbQ==      # Base64 encoded value of 'notejam'
  DB_PORT: NTQzMg==          # Base64 encoded value of '5432'
```

# commands to run

go into the _k8s_ folder in terminal

type

```
kubectl apply -f .
```

dot(.) ya fir yaml file path dena

# check services pods

```
kubectl get pods
kubectl get deployements
kubectl get services
kubectl get ingress
```

for all

```
kubectl get all -A
```

# for running in browser

```
minikube service notejam-app
```
