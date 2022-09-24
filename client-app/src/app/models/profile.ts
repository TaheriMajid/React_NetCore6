import { User } from "./user";

export interface Profile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
}

export class Profile implements Profile {
  constructor(user: User) {
    this.displayName = user.displayName;
    this.image = user.image;
    this.username = user.username;
  }
}
