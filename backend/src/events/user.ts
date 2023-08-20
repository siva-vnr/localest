import registerEvents from ".";
import { resultInterface } from "../interface/result";
import admin from "../modules/user/admin";
class userEvents extends registerEvents {
  constructor(emitter: NodeJS.EventEmitter) {
    super(emitter);
  }

  registerEvent() {
      
    this.registerOnEvent("beforeGetUsersByIdEvent",()=>{this.beforeGetUsersByIdEvent();});
    this.registerOnEvent("afterGetUsersByIdEvent",(args)=>{this.afterGetUsersByIdEvent(args);});
    this.registerOnEvent("afterRegisterNewUser",(args)=>{this.afterRegisterNewUser(args);});

  }

  beforeGetUsersByIdEvent(){
    console.log("beforeGetUsersByIdEvent"); 
  }

  afterGetUsersByIdEvent(args: resultInterface){
    console.log("afterGetUsersByIdEvent"); 
    console.log(args); 
  }

  afterRegisterNewUser(args: resultInterface){
    admin.notify();

  }


}
export default userEvents;