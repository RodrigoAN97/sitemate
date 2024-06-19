import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Issue, IssueService } from './issue.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly issueService: IssueService) {}
  sub1!: Subscription;
  sub2!: Subscription;
  sub3!: Subscription;
  issueSub = new BehaviorSubject<Issue | undefined>(undefined);

  createIssueForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  updateIssueForm = new FormGroup({
    id: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: Validators.required,
    }),
    title: new FormControl<string>('', {
      nonNullable: true,
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
    }),
  });

  issueIdControl = new FormControl<number | undefined>(undefined, {
    nonNullable: true,
    validators: Validators.required,
  });

  createIssue() {
    const issue = this.createIssueForm.value;
    this.sub1 = this.issueService.createIssue(issue).subscribe((issue) => {
      console.log(`Issue created: ${JSON.stringify(issue)}`);
    });
  }

  getIssueById() {
    const id = this.issueIdControl.value;
    if (!id) return;

    this.sub2 = this.issueService.getIssueById(id).subscribe((issue) => {
      this.issueSub.next(issue);
    });
  }

  updateIssue() {
    const issue = this.updateIssueForm.value;
    if (!issue.id) return;
    this.sub3 = this.issueService
      .updateIssue(issue.id, issue)
      .subscribe((issue) => {
        console.log(`Issue updated: ${JSON.stringify(issue)}`);
      });
  }
}
