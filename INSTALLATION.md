Installation

On the local

Add the hostname in development  
Have the entry `127.0.1.1 dev.thalasoft.com` in the `/etc/hosts` file  

Build the images
```
cd ~/dev/docker/projects/ngzero
./build.sh
```

On the remote

Create the project directory
```
mkdir -p ~/dev/docker/projects/ngzero
```

On the local

Copy some files
```
scp ~/dev/docker/projects/ngzero/docker-compose.yml stephane@thalasoft.com:~/dev/docker/projects/ngzero
```

Build the archive
```
cd ~/dev/js/projects/angular/ng-zero
ng build
zip -r ngzero-dist.zip dist
```

Build the archive for production
```
cd ~/dev/js/projects/angular/ngzero
ng build --prod
zip -r ngzero-dist.zip dist
scp ngzero-dist.zip stephane@thalasoft.com:~/dev/docker/projects/ngzero/volumes/code
```

On the remote

Open some ports on the firewall

Add the hostname in production  
Have the entry `ngzero.thalasoft.com` as an A record redirecting to the domain name IP address

Create the volume directories
```
mkdir -p ~/dev/docker/projects/ngzero/volumes/code;
```

Pull the images
```  
docker pull thalasoft.com:5000/ngzero;
```

Unpack the archive file
```
cd ~/dev/docker/projects/ngzero
unzip -d ~/dev/docker/projects/ngzero/volumes/code/ ~/dev/docker/projects/ngzero/volumes/code/ngzero-dist.zip
```

Start the application in dev
```
cd ~/dev/docker/projects/ngzero
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
https://ngzero.thalasoft.com
```

Stopping the application
```
docker stack rm ngzero
```

