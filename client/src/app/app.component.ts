import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Issue, IssueService } from './issue.service';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly issueService: IssueService) {
    this.issues$ = this.getAll();
  }
  sub1!: Subscription;
  sub2!: Subscription;
  sub3!: Subscription;
  sub4!: Subscription;
  createdIssueSub = new BehaviorSubject<Issue | undefined>(undefined);
  getIssueSub = new BehaviorSubject<Issue | undefined>(undefined);
  updateIssueSub = new BehaviorSubject<Issue | undefined>(undefined);
  deleteIssueSub = new BehaviorSubject<number | undefined>(undefined);
  reloadSub = new BehaviorSubject<boolean>(false);
  issues$!: Observable<Issue[]>;

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

  deleteIssueControl = new FormControl<number | undefined>(undefined, {
    nonNullable: true,
    validators: Validators.required,
  });

  createIssue() {
    const issue = this.createIssueForm.value;
    this.sub1 = this.issueService.createIssue(issue).subscribe((issue) => {
      this.reloadSub.next(true);
      this.createdIssueSub.next(issue);
      console.log(`Issue created: ${JSON.stringify(issue)}`);
    });
  }

  getIssueById() {
    const id = this.issueIdControl.value;
    if (!id) return;

    this.sub2 = this.issueService.getIssueById(id).subscribe((issue) => {
      this.getIssueSub.next(issue);
    });
  }

  updateIssue() {
    const issue = this.updateIssueForm.value;
    if (!issue.id) return;
    this.sub3 = this.issueService
      .updateIssue(issue.id, issue)
      .subscribe((issue) => {
        this.reloadSub.next(true);
        this.updateIssueSub.next(issue);
        console.log(`Issue updated: ${JSON.stringify(issue)}`);
      });
  }

  deleteIssue() {
    const id = this.deleteIssueControl.value;
    if (!id) return;

    this.sub4 = this.issueService.deleteIssue(id).subscribe(res => {
      if(!!res) {
        this.reloadSub.next(true);
        this.deleteIssueSub.next(res);
        console.log(`Issue with id ${id} is deleted`);
      } else {
        console.log(`Issue with id ${id} not found`);
      }
    })
  }

  getAll() {
    return this.reloadSub.pipe(
      switchMap(() => this.issueService.getAll())
    )
  }
}
