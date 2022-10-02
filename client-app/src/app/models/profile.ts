import { User } from "./user";

export interface Profile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  following: boolean;
  photos?: Photo[];
}

export class Profile implements Profile {
  constructor(user: User) {
    this.displayName = user.displayName;
    this.image = user.image;
    this.username = user.username;
  }
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}
