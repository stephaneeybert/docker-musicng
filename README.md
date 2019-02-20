- Installing the application  

Add the hostname in development  
Have the entry `127.0.1.1 dev.thalasoft.com` in the `/etc/hosts` file  

Add the hostname in production  
Have the entry `ngzero.thalasoft.com` as an A record redirecting to the domain name IP address

Create the volumes directories
```
volumes/
└── code
```

Deploy the source code  

Build the project
```
./build.sh
```

Build the archive
```
cd ~/dev/js/projects/angular/ng-zero
ng build
zip -r ng-zero-dist.zip dist

```

Build the archive for production
```
cd ~/dev/js/projects/angular/ng-zero
ng build --prod
zip -r ng-zero-dist.zip dist

```

Copy the archive into the `code` directory
```
cp -R ~/dev/js/projects/angular/ng-zero/ng-zero-dist.zip volumes/code/
unzip -d volumes/code/ volumes/code/ng-zero-dist.zip
```
```
scp ~/dev/js/projects/angular/ng-zero/ng-zero-dist.zip stephane@...:/home/stephane/dev/docker/projects/ngzero/volumes/code/
ssh stephane@...
cd ~/dev/docker/projects/ngzero
unzip -d volumes/code/ volumes/code/ng-zero-dist.zip
```

Create the secrets
```
./docker-secrets.sh
```

- Running the application  

Start the application
```
docker stack deploy --compose-file docker-compose-dev.yml ngzero
```

Open the browser
```
http://dev.thalasoft.com:82
```

Start the application in production
```
docker stack deploy --compose-file docker-compose.yml ngzero
```

Stop the application
```
docker stack rm ngzero
```

Open the browser
```
http://ngzero.thalasoft.com:82
```

