import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

    healthCheck() {
        return 'Healthy';
    }

    welcomeMessage() {
        return "Looks like you are wandering where you shouldn't xD. I have created a pretty decent UI for you but you are welcome to hang around here as well."
    }
}
