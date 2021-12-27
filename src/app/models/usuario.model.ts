export class UserModel {

    static fromFirestore(firebaseUser: any) { 
        const { email, username, uid } = firebaseUser;
        return new UserModel(uid, email, username);
    } 

    constructor(
        public uid:string | undefined,
        public email: string,
        public username: string
    ){}
}