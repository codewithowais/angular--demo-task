import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { familyData } from 'src/app/constants/family/family.constant';
import { IUser } from 'src/app/interfaces/user/user';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  public members: Observable<IUser[]>;
  private members$: BehaviorSubject<IUser[]> = new BehaviorSubject(familyData);

  constructor() {
    this.members = this.members$.asObservable();
  }

  deleteMember(index: number): void {
    const members = this.members$.getValue();
    members.splice(index, 1);
    this.members$.next(members);
  }

  updateMember(index: number, payload: any): void {
    const members = this.members$.getValue();
    const selectedMember = members[index];
    payload = Object.assign(selectedMember, payload);
    members.splice(index, 1, payload);
    this.members$.next(members);
  }
}
