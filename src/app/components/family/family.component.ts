import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounce, debounceTime, map, startWith } from 'rxjs/operators';
import { familyData } from 'src/app/constants/family/family.constant';
import { IUser } from 'src/app/interfaces/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FamilyService } from 'src/app/services/family/family.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
})
export class FamilyComponent implements OnInit {
  public loggedInUser = {} as IUser;
  public members: IUser[] = [];
  public filter = new FormControl('');
  public name = new FormControl('');
  public relation = new FormControl('');
  public filteredMembers: IUser[] = [];
  public isEditMode = false;
  public selectedIndex = -1;

  constructor(
    private auth: AuthService,
    private familyService: FamilyService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.auth.appLoggedInUser.subscribe((user) => {
      this.loggedInUser = user;
    });

    this.familyService.members.subscribe((members) => {
      this.members = members;
      this.filteredMembers = members;
    });

    this.filter.valueChanges.subscribe(
      (text) => {
        this.filteredMembers = this.search(text);
      });
  }

  search(text: string): IUser[] {
    return this.members.filter((member) => {
      const term = text.toLowerCase();
      return (
        member.name.toLowerCase().includes(term) ||
        member.relation.toLowerCase().includes(term)
      );
    });
  }

  editMember(index: number): void {
    this.isEditMode = true;
    this.selectedIndex = index;

    this.name.setValue(this.filteredMembers[index].name);
    this.relation.setValue(this.filteredMembers[index].relation);
  }

  deleteMember(index: number): void {
    this.familyService.deleteMember(index);
  }

  updateMember(): void {
    this.isEditMode = false;

    const payload = {
      name: this.name.value,
      relation: this.relation.value
    };

    this.familyService.updateMember(this.selectedIndex, payload);
  }

  cancel(): void {
    this.selectedIndex = -1;
    this.isEditMode = false;
  }

  generateRCA(): void {
    this.router.navigate(['rca']);
  }
}
