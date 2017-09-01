import {Component} from '@angular/core';
import {NavController, Platform, AlertController} from 'ionic-angular';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {File} from '@ionic-native/file';
declare var window:any;
declare var cordova: any;
declare var zip:any;
declare var dir:any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Transfer, TransferObject, File]
})

export class HomePage {

  storageDirectory: string = '';

  constructor(public navCtrl: NavController, public platform: Platform, private transfer: Transfer, private file: File, public alertCtrl: AlertController) {
    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if(!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if(this.platform.is('android')) {
        this.storageDirectory = cordova.file.externalDataDirectory;
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
    });
  }

    
  
    
    
  downloadImage(image) {

    this.platform.ready().then(() => {

      const fileTransfer: TransferObject = this.transfer.create();

    //  const imageLocation = `${cordova.file.applicationDirectory}www/assets/img/${image}`;

      fileTransfer.download("http://webdevp.net/test.zip", this.storageDirectory+"test.zip").then((entry) => {

        const alertSuccess = this.alertCtrl.create({
          title: `Download Succeeded!`,
          subTitle: `${image} was successfully downloaded to: ${this.storageDirectory}`,
          buttons: ['Ok']
        });

        alertSuccess.present();
        zip.unzip(this.storageDirectory+"test.zip", this.storageDirectory, function(){
          
         // alert("sucess");


        }, null);

      }, (error) => {

        const alertFailure = this.alertCtrl.create({
          title: `Download Failed!`,
          subTitle: `${image} was not successfully downloaded. Error code: ${error.code}`,
          buttons: ['Ok']
        });

        alertFailure.present();

      });

    });

      
      
         

  }
  del(){
    console.log("entered");
    window.resolveLocalFileSystemURL(this.storageDirectory, function (dir) {
      
              dir.getFile("test.zip", {create: false}, function (fileEntry) {
                  fileEntry.remove(function (file) {
                      console.log("removed");
                  }, function (error) {
                    console.log("erreur suppression " + error.code);
                  }, function () {
                    console.log("success");
                  });
              });
      
      
          });
  }



}
