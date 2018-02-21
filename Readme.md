# 360 VR Image viewer based on WebVR with headtracking
360 VR Image viewer based on WebVR with headtracking movement, tested with Google Cardboard and Oculus Samsung Gear VR. This tool is fixed to keep the center viewport stable for test.
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installing

A step by step series of examples that tell you have to get a development env running

* Install nodejs and npm:

```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install nodejs-legacy
sudo apt-get install npm
```

* Install http-server:

```
sudo npm install http-server -g
```

* Clone this repository:

```
git clone https://github.com/phunm211/WebVR_image.git
```

## Running the tests

Explain how to run the automated tests

* Edit variable and run file bash run.sh in this repository:

```
bash Run.sh
```
* Follow the variable of Server IP and WebVR Port in file ***run.sh***, access this address via a browser such as Google Chrome for Android or Samsung Internet VR, choose image and select **Enter VR** to watch.
* Note that if you use Samsung Internet VR, the first time you use WebVR, you have to enable this function by naviagate to ***internet://flags***, select **Enable** for WebVR.

## Built With

* [Threejs](https://threejs.org/) - Javascript 3D library.
* [Webvr Polyfill](https://github.com/googlevr/webvr-polyfill/) - From Google.

## Versioning

* v1.0: Publish Project
## Authors

* **Phu Nguyen Minh** - *ESRC Lab - Hanoi University of Science and Technology* - [Facebook](https://facebook.com/ketromdeptrai)
* Many thanks to my teammates: **Cuong Pham The** for the ideal of Euler Angles Order, and specially, **Nguyen Phung Dinh** who is the idol in my eyes.


## License

