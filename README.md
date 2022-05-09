# foodgram t

## setup(macos)

make sure you have homebrew installed for macos
https://brew.sh/

use these commands to update and install nodejs and its packagemangaer
```
brew update
brew upgrade
brew install node
```

run these commands to make sure node is running on the right version
```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

install nodemon for node
```
sudo npm install -g nodemon
```

create and move into the foodgram directory
```
mkdir foodgram
cd foodgram
```

clone the repository
```
git clone https://github.com/COP4331-Large-Project/FoodGram.git
```

make sure you are inside the root directory of foodgram and run these 
```
sudo npm install
sudo npm install express --save
sudo npm install body-parser
sudo npm install mongodb
sudo npm install cors
sudo npm install react-scripts
```
move into frontend directory and make sure the install is working
```
cd frontend
sudo npm start
```
open a web browser and enter:
```
localhost:3000
```
there should be a default react page if everything went correctly


## setup(ubuntu linux)

use these commands to update and install nodejs and its packagemangaer
```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

run these commands to make sure node is running on the right version
```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

install nodemon for node
```
sudo npm install -g nodemon
```

create and move into the foodgram directory
```
mkdir foodgram
cd foodgram
```

clone the repository
```
git clone https://github.com/COP4331-Large-Project/FoodGram.git
```

make sure you are inside the root directory of foodgram and run these 
```
sudo npm install
sudo npm install express --save
sudo npm install body-parser
sudo npm install mongodb
sudo npm install cors
sudo npm install react-scripts
```
move into frontend directory and make sure the install is working
```
cd frontend
sudo npm start
```
open a web browser and enter:
```
localhost:3000
```
there should be a default react page if everything went correctly

