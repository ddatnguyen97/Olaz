/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { UserService } from '../user/user.service';
@Injectable()
export class RoomService {
    
    constructor(private UserService:UserService){}
    async checkToken(token:string){
      try {
        // console.log(token)
        const _isToken = token.split(" ")[1]
        // console.log(_isToken)
        const result = await firebase.auth().verifyIdToken(_isToken )
        // console.log(result)
        
        if(!result) return false;

        const user = await this.UserService.getUserById(result.uid);

        return user;
      } catch (error) {
        console.log(error.message)
      }
    }
}
