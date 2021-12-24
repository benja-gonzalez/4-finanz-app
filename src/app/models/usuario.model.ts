export class UserModel {

    static fromFirestore(firebaseUser: any) { 
        const { email, usename, uid } = firebaseUser;
        return new UserModel(uid, email, usename);
    } 

    constructor(
        public uid:string | undefined,
        public email: string,
        public username: string
    ){}
}