import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user/user';
import { FamilyService } from 'src/app/services/family/family.service';

@Component({
  selector: 'app-rca',
  templateUrl: './rca.component.html',
  styleUrls: ['./rca.component.scss'],
})
export class RCAComponent implements OnInit {
  public chartData = [];

  constructor(private familyService: FamilyService) {}

  ngOnInit(): void {
    this.familyService.members.subscribe((members) => {
      const currenMembers = JSON.parse(JSON.stringify(members));
      const baseNode = currenMembers.find((m: any) => m.relation === 'Base Node');
      const nestedChildrens = currenMembers.filter(
        (m: any) => m.relation === 'Mother-in-Law' || m.relation === 'father-in-Law'
      );
      const directChildrens = currenMembers.filter((m: any) => {
        return (
          m.relation !== 'Base Node' &&
          m.relation !== 'Mother-in-Law' &&
          m.relation !== 'father-in-Law'
        );
      });

      directChildrens.forEach((child: any) => {
        if (child.relation === 'Wife') {
          child.children = nestedChildrens as IUser[];
        }
      });

      baseNode.children = directChildrens as IUser[];
      this.chartData.push(baseNode as never);
    });
  }
}
