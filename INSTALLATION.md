Installation

On the local

Add the hostname in development  
Have the entry `127.0.1.1 dev.thalasoft.com` in the `/etc/hosts` file  

Build the images
```
cd ~/dev/docker/projects/ng-zero;
./build.sh
```

Copy some files
```
scp ~/dev/docker/projects/ng-zero/docker-compose.yml stephane@thalasoft.com:~/dev/docker/projects/ng-zero
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

On the remote

Open some ports on the firewall

Add the hostname in production  
Have the entry `ngzero.thalasoft.com` as an A record redirecting to the domain name IP address

Create the volume directories
```
mkdir -p ~/dev/docker/projects/ng-zero/volumes/code;
```

Pull the images
```  
docker pull thalasoft.com:5000/ng-zero;
```

Unpack the archive file
```
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
http://dev.thalasoft.com:84
```

Start the application in production
```
cd ~/dev/docker/projects/ngzero
docker stack deploy --compose-file docker-compose.yml ngzero
```

Open the browser
```
http://ngzero.thalasoft.com
```

Stopping the application
```
docker stack rm ngzero
```

