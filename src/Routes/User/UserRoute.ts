import { UserRepository } from '../../Repositories/UserRepository';

export class UserRoute {
    constructor(private userRepository:UserRepository){}

    public registerUser(request, response){
        this.userRepository.registerUser(request.body)
        .then((resp) => {
            response.send(resp);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    public loginUser(request, response) {
        this.userRepository.loginUser(request.body)
            .then((resp) => {
                response.send(resp);
             })
            .catch((error) => {
                console.log(error);
            })
        }
    }