Installation

On the local

Build the images
```
cd ~/dev/docker/projects/musicng
./build.sh
```

Add the hostname in development  
Have the entry `127.0.1.1 dev.musicng.thalasoft.com` in the `/etc/hosts` file

Create the project directory
```
mkdir -p ~/dev/docker/projects/musicng/volumes/code;
```

Copy some files
```
scp ~/dev/docker/projects/musicng/docker-compose.yml stephane@thalasoft.com:~/dev/docker/projects/musicng
```

Build the archive for dev
```
cd ~/dev/js/projects/angular/musicng
ng build
zip -r musicng-dist.zip dist
cp musicng-dist.zip ~/dev/docker/projects/musicng/volumes/code
```

Build the archive for production
```
cd ~/dev/js/projects/angular/musicng
ng build --prod
zip -r musicng-dist.zip dist
scp musicng-dist.zip stephane@thalasoft.com:~/dev/docker/projects/musicng/volumes/code
```

Unpack the archive file
```
unzip -o -d ~/dev/docker/projects/musicng/volumes/code/ ~/dev/docker/projects/musicng/volumes/code/musicng-dist.zip
```

Start the application in dev
```
cd ~/dev/docker/projects/musicng
docker stack deploy --compose-file docker-compose-dev.yml musicng
```

Open the browser
```
http://dev.musicng.thalasoft.com:84
```

On the remote

Open some ports on the firewall

Add the hostname in production  
Have the entry `musicng.thalasoft.com` as an A record redirecting to the domain name IP address

Create the project directory
```
mkdir -p ~/dev/docker/projects/musicng/volumes/code;
```

Pull the images
```  
docker pull thalasoft.com:5000/musicng;
```

Unpack the archive file
```
unzip -o -d ~/dev/docker/projects/musicng/volumes/code/ ~/dev/docker/projects/musicng/volumes/code/musicng-dist.zip
```

Start the application in production
```
cd ~/dev/docker/projects/musicng
docker stack deploy --compose-file docker-compose.yml musicng
```

Open the browser
```
https://musicng.thalasoft.com
```

Stopping the application
```
docker stack rm musicng
```

